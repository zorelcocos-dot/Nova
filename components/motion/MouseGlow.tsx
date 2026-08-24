"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";

/**
 * Soft light pool that follows the pointer inside its positioned parent
 * (parent must be `position: relative` + `overflow: hidden`, e.g. the hero
 * section or the final CTA panel). Rendered as a radial-gradient div,
 * lerp-smoothed, transform only. `light` renders a white pool for dark
 * surfaces.
 */
export default function MouseGlow({
  className = "",
  size = 620,
  light = false,
}: {
  className?: string;
  size?: number;
  light?: boolean;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const host = glow.parentElement;
    if (!host) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let inside = false;

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      glow.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = inside ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!inside) {
        inside = true;
        cx = tx;
        cy = ty;
        glow.style.opacity = "1";
        raf = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      inside = false;
      glow.style.opacity = "0";
    };

    host.addEventListener("mousemove", onMove, { passive: true });
    host.addEventListener("mouseleave", onLeave);
    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={glowRef}
      className={`glow ${light ? "glow-light" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity: 0,
      }}
      aria-hidden="true"
    />
  );
}
