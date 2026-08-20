"use client";

import styles from "./charts.module.css";
import { useInView, usePrefersReducedMotion } from "./hooks";

/* ============================================================
   Minimal, hand-rolled SVG charts. No dependencies.
   Each chart draws itself in the first time it enters the
   viewport; reduced-motion users see the final state at once.
   ============================================================ */

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

let gradId = 0;

export function AreaChart({
  data,
  labels = [],
  height = 200,
  showGrid = true,
  accent = false,
}: {
  data: number[];
  labels?: string[];
  height?: number;
  showGrid?: boolean;
  accent?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const animate = inView && !reduced; // draw when scrolled into view
  const shown = inView || reduced; // reduced-motion: visible, no draw

  const W = 720;
  const H = height;
  const padX = 8;
  const padTop = 14;
  const padBottom = labels.length ? 26 : 8;
  const max = Math.max(...data) * 1.12;
  const pts = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * (W - padX * 2),
    y: padTop + (1 - v / max) * (H - padTop - padBottom),
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x},${H - padBottom} L ${pts[0].x},${H - padBottom} Z`;
  const gid = `ag${(gradId += 1)}`;
  const last = pts[pts.length - 1];
  const stroke = accent ? "var(--accent)" : "var(--ink)";

  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        role="img"
        aria-label="Trend chart"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.14" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showGrid &&
          [0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={padX}
              x2={W - padX}
              y1={padTop + t * (H - padTop - padBottom)}
              y2={padTop + t * (H - padTop - padBottom)}
              className={styles.grid}
            />
          ))}
        <path
          d={area}
          fill={`url(#${gid})`}
          className={animate ? styles.areaIn : shown ? "" : styles.wait}
        />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          className={animate ? styles.draw : shown ? "" : styles.waitLine}
        />
        <g className={animate ? styles.dotIn : shown ? "" : styles.wait}>
          <circle cx={last.x} cy={last.y} r="3.5" fill={stroke} />
          <circle
            cx={last.x}
            cy={last.y}
            r="7"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.25"
          />
        </g>
        {labels.length > 0 &&
          labels.map((l, i) => (
            <text
              key={i}
              x={padX + (i / (labels.length - 1)) * (W - padX * 2)}
              y={H - 8}
              textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
              className={`${styles.label} ${animate ? styles.labelIn : shown ? "" : styles.wait}`}
            >
              {l}
            </text>
          ))}
      </svg>
    </div>
  );
}

export function Sparkline({
  data,
  width = 96,
  height = 30,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => ({
    x: 2 + (i / (data.length - 1)) * (width - 4),
    y: 3 + (1 - (v - min) / Math.max(1, max - min)) * (height - 6),
  }));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BarChart({
  data,
  comma = false,
}: {
  data: { label: string; value: number }[];
  /** Format values with thousands separators */
  comma?: boolean;
}) {
  const format = (v: number) => (comma ? v.toLocaleString("en-US") : String(v));
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const animate = inView && !reduced;
  const shown = inView || reduced;
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div ref={ref} className={styles.bars} role="img" aria-label="Bar chart">
      {data.map((d, i) => (
        <div key={d.label} className={styles.barRow}>
          <span className={styles.barLabel}>{d.label}</span>
          <div className={styles.barTrack}>
            <div
              className={
                animate
                  ? styles.barFill
                  : shown
                    ? styles.barFillStatic
                    : styles.barFillWait
              }
              style={
                {
                  width: `${(d.value / max) * 100}%`,
                  "--bar-delay": `${i * 70}ms`,
                } as React.CSSProperties
              }
            />
          </div>
          <span className={styles.barValue}>{format(d.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({
  data,
  size = 168,
  centerLabel,
  centerValue,
}: {
  data: { label: string; value: number }[];
  size?: number;
  centerLabel: string;
  centerValue: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const ready = inView || reduced; // segments visible once in view
  const sweep = inView && !reduced; // animated sweep only when motion is fine

  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 34;
  const circ = 2 * Math.PI * r;
  // Derived from --ink so the ramp inverts correctly with the theme.
  const grays = [
    "color-mix(in srgb, var(--ink) 92%, transparent)",
    "color-mix(in srgb, var(--ink) 62%, transparent)",
    "color-mix(in srgb, var(--ink) 42%, transparent)",
    "color-mix(in srgb, var(--ink) 26%, transparent)",
    "color-mix(in srgb, var(--ink) 15%, transparent)",
    "color-mix(in srgb, var(--ink) 9%, transparent)",
  ];
  let offset = 0;
  return (
    <div ref={ref} className={styles.donutWrap}>
      <svg viewBox="0 0 84 84" width={size} height={size} role="img" aria-label="Distribution chart">
        <g transform="rotate(-90 42 42)">
          {data.map((d, i) => {
            const frac = d.value / total;
            const dash = frac * circ;
            const el = (
              <circle
                key={d.label}
                cx="42"
                cy="42"
                r={r}
                fill="none"
                stroke={grays[i % grays.length]}
                strokeWidth="9"
                strokeDasharray={
                  ready ? `${dash - 1.5} ${circ - dash + 1.5}` : `0 ${circ}`
                }
                strokeDashoffset={ready ? -offset : 0}
                strokeLinecap="butt"
                className={styles.donutSeg}
                style={{ transitionDelay: sweep ? `${i * 55}ms` : "0ms" }}
              />
            );
            offset += dash;
            return el;
          })}
        </g>
        <text x="42" y="40" textAnchor="middle" className={styles.donutValue}>
          {centerValue}
        </text>
        <text x="42" y="50" textAnchor="middle" className={styles.donutLabel}>
          {centerLabel}
        </text>
      </svg>
      <div className={styles.legend}>
        {data.map((d, i) => (
          <div key={d.label} className={styles.legendRow}>
            <span
              className={styles.legendSwatch}
              style={{ background: grays[i % grays.length] }}
            />
            <span className={styles.legendLabel}>{d.label}</span>
            <span className={styles.legendValue}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
