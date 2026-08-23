"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";

/**
 * Scroll parallax. Translates children along Y based on how far the element
 * has progressed through the viewport. `speed` 0.06 ≈ 6% of the element's
 * height of travel, lerp-smoothed, transform only. Only runs while the
 * element is near the viewport (IntersectionObserver-gated rAF loop).
 */
export default function Parallax({
  children,
  speed = 0.06,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let running = false;
    let cur = 0;

    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // `cur` is our own current translate, so subtract it to measure the
      // untransformed position — keeps the loop from feeding back on itself.
      const top = r.top + window.scrollY - cur;
      const p = (vh - top) / (vh + r.height); // 0 → just entering, 1 → just leaving
      const target = (p - 0.5) * 2 * speed * r.height;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.05) cur = target;
      el.style.transform = `translate3d(0, ${cur.toFixed(2)}px, 0)`;
      raf = running ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { rootMargin: "25% 0px 25% 0px" }
    );
    io.observe(el);
    window.addEventListener("resize", start, { passive: true });

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", start);
      el.style.transform = "";
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
