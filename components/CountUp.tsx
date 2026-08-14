"use client";

import { useCountUp, useInView } from "./hooks";

/**
 * A number that eases into place when scrolled into view.
 * Accepts pre-formatted targets — "128", "2,847", "96.2%", "4.1M" —
 * and preserves their shape while counting.
 */
export default function CountUp({
  value,
  duration = 1300,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const text = useCountUp(value, inView, duration);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
