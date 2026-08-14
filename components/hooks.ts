"use client";

import { useEffect, useRef, useState } from "react";

/** True when the user prefers reduced motion. SSR-safe. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Observe an element and report when it enters the viewport (once).
 * Returns [ref, inView].
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once !== false;

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          }
        }
        if (!once) setInView(entries.some((e) => e.isIntersecting));
      },
      {
        threshold: options?.threshold ?? 0.18,
        rootMargin: options?.rootMargin ?? "0px 0px -4% 0px",
      }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

/**
 * Animated counter. Parses a formatted target ("3,621", "96.2%", "4.1M")
 * and eases a number toward it once `start` is true. Returns a formatted
 * string that matches the target's shape at every frame.
 */
export function useCountUp(target: string, start: boolean, duration = 1300): string {
  const [display, setDisplay] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!start) return;
    // Parse: keep prefix/suffix/punctuation, animate the first numeric part.
    const match = target.match(/-?[\d,]*(?:\.\d+)?/);
    if (!match || match[0] === "") {
      setDisplay(target);
      return;
    }
    const numStr = match[0];
    const end = parseFloat(numStr.replace(/,/g, ""));
    if (Number.isNaN(end)) {
      setDisplay(target);
      return;
    }
    if (reduced) {
      setDisplay(target);
      return;
    }
    const prefix = target.slice(0, match.index);
    const suffix = target.slice((match.index ?? 0) + numStr.length);
    const hasComma = numStr.includes(",");
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    let raf = 0;
    const t0 = performance.now();
    const from = end * 0.42; // start partway — feels like a meter settling, not a slot machine
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const val = from + (end - from) * easeOut(t);
      let out = val.toFixed(decimals);
      if (hasComma) out = Number(out).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisplay(prefix + out + suffix);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target, reduced]);

  return start ? (display ?? target) : target;
}
