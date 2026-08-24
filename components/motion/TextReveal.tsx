"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks";
import styles from "./motion.module.css";

type TagName = "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p" | "blockquote";

/**
 * Split-text masked reveal. Splits `text` into words (or chars), wraps each
 * in an overflow-hidden mask, and slides them up in a stagger once the
 * element scrolls into view.
 *
 * `waitReady` defers arming until the preloader flips
 * `data-ready` on <html> — use for above-the-fold text so the reveal
 * lands as the curtain lifts, not under it.
 *
 * Honors prefers-reduced-motion and the in-app "reduce motion" toggle.
 */
export default function TextReveal({
  text,
  as = "span",
  by = "word",
  delay = 0,
  stagger = 45,
  waitReady = false,
  className = "",
}: {
  text: string;
  as?: TagName;
  by?: "word" | "char";
  /** Base delay before the first item, ms. */
  delay?: number;
  /** Delay between items, ms. */
  stagger?: number;
  waitReady?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setInView(true);
      return;
    }

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let disposed = false;

    const arm = () => {
      if (io || disposed) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setInView(true);
              io?.disconnect();
              io = null;
            }
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(el);
    };

    if (waitReady && !document.documentElement.dataset.ready) {
      mo = new MutationObserver(() => {
        if (document.documentElement.dataset.ready) {
          mo?.disconnect();
          mo = null;
          arm();
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
      io?.disconnect();
      mo?.disconnect();
    };
  }, [reduced, waitReady]);

  const shown = reduced || inView;
  const items = by === "char" ? Array.from(text) : text.split(" ");
  let idx = 0;
  const Tag = as as "span";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${styles.tr} ${shown ? styles.trIn : ""} ${className}`}
    >
      {items.map((item, i) => {
        const d = `${delay + idx * stagger}ms`;
        idx += 1;
        if (by === "char") {
          return (
            <span key={i} className={styles.trMask}>
              <span className={styles.trItem} style={{ transitionDelay: d }}>
                {item === " " ? "\u00A0" : item}
              </span>
            </span>
          );
        }
        return (
          <span key={i} className={styles.trMask}>
            <span className={styles.trItem} style={{ transitionDelay: d }}>
              {item}
            </span>
            {i < items.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </Tag>
  );
}
