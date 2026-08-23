"use client";

import { useEffect, useState } from "react";

const LERP = 0.1;
const MIN_DELTA = 0.35;
/** Distance (px) at which a native scroll event is treated as external
 *  (scrollbar drag, keyboard, touch) rather than our own scrollTo. */
const EXTERNAL_THRESHOLD = 1.5;
/** Offset kept above anchored sections (nav height + breathing room). */
const ANCHOR_OFFSET = 84;

/**
 * Lenis-style smooth scroll, hand-rolled on the native scrollbar.
 *
 * - Intercepts wheel events on the root scroller and eases toward the new
 *   target with requestAnimationFrame lerp — the real scroll position is
 *   always the source of truth, so nothing can desync or get stuck.
 * - Touch, keyboard, scrollbar drags and anchor jumps fall back to native
 *   (or are adopted) so accessibility and power-user behavior stay intact.
 * - Wheel events inside inner overflow containers (dashboards, tables,
 *   the command palette) are left completely native.
 * - Ctrl+wheel (pinch zoom) is untouched.
 * - Fine pointers only, and fully disabled for reduced-motion users or the
 *   in-app "reduce motion" toggle.
 */
export default function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isOff = () =>
      !fine.matches || reduced.matches || root.dataset.motion === "reduce";
    const sync = () => setEnabled(!isOff());
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("smooth-scroll");

    let target = window.scrollY;
    let current = window.scrollY;
    let lastCmd = -1;
    let raf = 0;

    const maxScroll = () =>
      Math.max(0, root.scrollHeight - window.innerHeight);

    const clampTarget = (y: number) => Math.min(maxScroll(), Math.max(0, y));

    /** True while the page can't actually scroll (preloader curtain or an
     *  open overlay locks body overflow). */
    const isLocked = () =>
      maxScroll() <= 0 ||
      getComputedStyle(document.body).overflowY === "hidden" ||
      getComputedStyle(root).overflowY === "hidden";

    /** True when the event belongs to the root scroller, not to an inner
     *  overflow:auto/scroll element (tables, palette lists, …). */
    const isRootScroll = (e: Event) => {
      let el = (e.target as Element | null)?.parentElement ?? null;
      while (el && el !== document.body && el !== root) {
        const st = getComputedStyle(el);
        if (
          /(auto|scroll|overlay)/.test(st.overflowY) &&
          el.scrollHeight > el.clientHeight + 1
        ) {
          return false;
        }
        el = el.parentElement;
      }
      return true;
    };

    const tick = () => {
      current += (target - current) * LERP;
      if (Math.abs(target - current) < MIN_DELTA) {
        current = target;
        window.scrollTo(0, current);
        lastCmd = current;
        raf = 0;
        return;
      }
      window.scrollTo(0, current);
      lastCmd = current;
      raf = requestAnimationFrame(tick);
    };
    const ensureRunning = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || !isRootScroll(e)) return; // pinch zoom / inner scroller
      // Page locked (preloader curtain / open menu): leave it to native.
      if (isLocked()) return;
      e.preventDefault();
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 32; // line mode
      else if (e.deltaMode === 2) d *= window.innerHeight; // page mode
      target = clampTarget(target + d);
      ensureRunning();
    };

    const onScroll = () => {
      const y = window.scrollY;
      // Page got locked/unlocked (preloader, menu): re-sync to the
      // clamped reality so the lerp can't chase a ghost target.
      if (maxScroll() <= 0) {
        current = target = lastCmd = 0;
        return;
      }
      // A native scroll we didn't command: scrollbar drag, keys, touch, or
      // an anchor jump. Adopt it so the lerp never fights the user.
      if (Math.abs(y - lastCmd) > EXTERNAL_THRESHOLD) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        current = y;
        target = y;
        lastCmd = y;
      }
    };

    /** Smoothly glide to same-page #anchors instead of hard-jumping. */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || !isRootScroll(e)) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const id = href.slice(1);
      const el =
        document.getElementById(id) ||
        (typeof CSS !== "undefined" && CSS.escape
          ? document.querySelector(`[name="${CSS.escape(id)}"]`)
          : null);
      if (!el) return;
      e.preventDefault();
      const y = clampTarget(
        el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET
      );
      target = y;
      try {
        history.pushState(null, "", href);
      } catch {
        /* sandboxed */
      }
      ensureRunning();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { passive: true });

    return () => {
      root.classList.remove("smooth-scroll");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return null;
}
