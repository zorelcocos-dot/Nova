"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — a snappy dot plus a lagging ring, difference-blended so it
 * inverts over any surface (the signature look). Fine pointers only, and it
 * steps aside for reduced-motion users. Interactive targets (links, buttons,
 * inputs, anything tagged [data-cursor]) grow the ring; mousedown squeezes it.
 *
 * The native cursor is hidden while the custom one is active.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dotRef = useRef<HTMLDivElement>(null) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ringRef = useRef<HTMLDivElement>(null) as any;

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
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    root.classList.add("nova-cursor");

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let dx = cx;
    let dy = cy;
    let rx = cx;
    let ry = cy;
    let shown = false;
    let raf = 0;

    const paint = (v: boolean) => {
      shown = v;
      dot.style.opacity = v ? "1" : "0";
      ring.style.opacity = v ? "1" : "0";
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) paint(true);
    };
    const onDown = () => root.classList.add("cur-down");
    const onUp = () => root.classList.remove("cur-down");
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const hit =
        t &&
        typeof t.closest === "function" &&
        t.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor]"
        );
      root.classList.toggle("cur-hover", !!hit);
    };

    const tick = () => {
      dx += (tx - dx) * 0.6;
      dy += (ty - dy) * 0.6;
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("nova-cursor", "cur-down", "cur-hover");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
}
