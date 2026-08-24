"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";

/**
 * Pointer-follow 3D tilt for hero product visuals. Rotation is clamped to
 * `max` degrees, lerp-smoothed, and eases back to flat on leave.
 * Fine pointers and motion-safe users only.
 */
export default function Tilt({
  children,
  max = 4,
  scale = 1.012,
  className = "",
}: {
  children: React.ReactNode;
  /** Max rotation in degrees on either axis. */
  max?: number;
  /** Scale while the pointer is over the element. */
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cs = 1;
    let cx = 0;
    let cy = 0;
    let ss = 1;

    const tick = () => {
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;
      ss += (cs - ss) * 0.11;
      el.style.transform = `perspective(1100px) rotateX(${cx.toFixed(3)}deg) rotateY(${cy.toFixed(3)}deg) scale3d(${ss.toFixed(4)}, ${ss.toFixed(4)}, 1)`;
      const moving =
        Math.abs(tx - cx) > 0.002 ||
        Math.abs(ty - cy) > 0.002 ||
        Math.abs(cs - ss) > 0.0002;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = -py * max;
      ty = px * max;
      cs = scale;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      cs = 1;
      kick();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [reduced, max, scale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
