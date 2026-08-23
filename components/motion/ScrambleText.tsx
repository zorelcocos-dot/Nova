"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/=";

type Props = {
  text: string;
  as?: "span" | "div" | "p" | "a";
  className?: string;
  /** Delay before the decode starts, ms. */
  delay?: number;
  /** Duration of the decode sweep, ms. */
  duration?: number;
  /** Wait for the preloader to flip data-ready (above-the-fold text). */
  waitReady?: boolean;
};

/**
 * Scramble/decode text effect: characters cycle through a glyph set and
 * settle left-to-right. SSR-safe — the real text paints first, and the
 * decode runs client-side once armed (on view, or when the preloader is
 * done for hero copy). Renders the plain string for reduced motion.
 */
export default function ScrambleText({
  text,
  as = "span",
  className = "",
  delay = 0,
  duration = 850,
  waitReady = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(text);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let started = false;
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let disposed = false;

    const run = () => {
      if (started || disposed) return;
      started = true;
      const t0 = performance.now() + delay;
      const step = (now: number) => {
        const t = (now - t0) / duration;
        if (t >= 1) {
          setDisplay(text);
          return;
        }
        const p = t < 0 ? 0 : t;
        const settle = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (i < settle || c === " ") out += c;
          else out += CHARSET[(Math.random() * CHARSET.length) | 0];
        }
        setDisplay(out);
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const arm = () => {
      if (io || disposed) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              io?.disconnect();
              io = null;
              run();
            }
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    };

    if (waitReady && !document.documentElement.dataset.ready) {
      mo = new MutationObserver(() => {
        if (document.documentElement.dataset.ready) {
          mo?.disconnect();
          mo = null;
          run();
        }
      });
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-ready"],
      });
    } else {
      arm();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      mo?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const Tag = as as "span";
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}
