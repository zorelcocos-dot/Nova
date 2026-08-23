"use client";

import styles from "./motion.module.css";

/**
 * Seamless infinite marquee. `children` render twice (the second copy is
 * aria-hidden) and the track loops on translateX(-50%). Spacing belongs on
 * the items, never on the track, so the loop point stays invisible.
 * Pauses on hover. `speed` is seconds per full loop.
 */
export default function Marquee({
  children,
  speed = 40,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div
      className={`${styles.marquee} ${className}`}
      style={{ ["--mq" as string]: `${speed}s` }}
    >
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeGroup}>{children}</div>
        <div className={styles.marqueeGroup} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
