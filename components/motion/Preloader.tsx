"use client";

import { useEffect, useState } from "react";
import styles from "./preloader.module.css";

/** Keep in sync with preloader.module.css (.pre.exit). */
const COUNT_MS = 1150;
const HOLD_MS = 260;
const EXIT_MS = 720;

const WORD = "NOVA";

type Phase = "boot" | "run" | "exit" | "done";

/**
 * One-shot brand curtain: letters rise in a stagger while a mono counter
 * runs 0→100, then the panel lifts away and the hero sequence takes over.
 *
 * Plays once per session (sessionStorage flag, pre-painted by an inline
 * script in the root layout so repeat visits never flash the curtain).
 * Skipped entirely for reduced-motion users. A hard 3s safety timeout
 * guarantees the curtain can never hold the page.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    const finish = (skipCurtain: boolean) => {
      try {
        sessionStorage.setItem("nova-preload", "1");
      } catch {
        /* private mode */
      }
      root.dataset.preload = "done";
      root.dataset.ready = "1";
      document.body.style.overflow = "";
      if (skipCurtain) {
        setPhase("done");
      } else {
        setPhase("exit");
        window.setTimeout(() => setPhase("done"), EXIT_MS);
      }
    };

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      root.dataset.motion === "reduce";
    if (root.dataset.preload === "done" || reduced) {
      finish(true);
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("run");

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      window.setTimeout(() => finish(false), HOLD_MS);
    };
    raf = requestAnimationFrame(tick);

    // Safety: never hold the page behind the curtain for more than 3s.
    const safety = window.setTimeout(() => finish(false), 3000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`nova-preloader ${styles.pre} ${phase === "exit" ? styles.exit : ""}`}
      role="status"
      aria-label="Loading NOVA"
    >
      <div className={styles.word} aria-hidden="true">
        {WORD.split("").map((c, i) => (
          <span key={i} className={styles.mask}>
            <span
              className={styles.letter}
              style={{ animationDelay: `${140 + i * 85}ms` }}
            >
              {c}
            </span>
          </span>
        ))}
      </div>
      <div className={styles.bar} aria-hidden="true">
        <div
          className={styles.barFill}
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
      <div className={styles.meta} aria-hidden="true">
        <span>AI productivity platform</span>
        <span className={styles.pct}>{String(pct).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
