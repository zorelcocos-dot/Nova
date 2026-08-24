"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";

/**
 * Cursor spotlight for cards. One delegated pointermove listener on
 * document updates two CSS custom properties (--spot-x / --spot-y) on
 * whichever [data-spotlight] element the pointer is over, plus --spot-on
 * for a soft fade in/out. Mount once (marketing layout); style the halo
 * in globals.css. No re-renders — pure style writes.
 */
export default function Spotlight() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let el: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = 0;
      if (!el) return;
      el.style.setProperty("--spot-x", `${x.toFixed(1)}px`);
      el.style.setProperty("--spot-y", `${y.toFixed(1)}px`);
      el.style.setProperty("--spot-on", "1");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const next = (e.target as Element | null)?.closest?.(
        "[data-spotlight]"
      ) as HTMLElement | null;
      if (next !== el) {
        if (el) el.style.setProperty("--spot-on", "0");
        el = next;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onOut = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!el) return;
      const rt = e.relatedTarget as Node | null;
      if (!rt || !el.contains(rt)) {
        el.style.setProperty("--spot-on", "0");
        el = null;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return null;
}
