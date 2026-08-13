import styles from "./charts.module.css";

/* ============================================================
   Minimal, hand-rolled SVG charts. No dependencies.
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

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={styles.chart}
      role="img"
      aria-label="Trend chart"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={accent ? "var(--accent)" : "var(--ink)"}
            stopOpacity="0.14"
          />
          <stop
            offset="100%"
            stopColor={accent ? "var(--accent)" : "var(--ink)"}
            stopOpacity="0"
          />
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
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={accent ? "var(--accent)" : "var(--ink)"}
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.draw}
      />
      <circle cx={last.x} cy={last.y} r="3.5" fill={accent ? "var(--accent)" : "var(--ink)"} />
      <circle cx={last.x} cy={last.y} r="7" fill="none" stroke={accent ? "var(--accent)" : "var(--ink)"} strokeOpacity="0.25" />
      {labels.length > 0 &&
        labels.map((l, i) => (
          <text
            key={i}
            x={padX + (i / (labels.length - 1)) * (W - padX * 2)}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
            className={styles.label}
          >
            {l}
          </text>
        ))}
    </svg>
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
  format = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  format?: (v: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className={styles.bars} role="img" aria-label="Bar chart">
      {data.map((d) => (
        <div key={d.label} className={styles.barRow}>
          <span className={styles.barLabel}>{d.label}</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${(d.value / max) * 100}%` }}
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
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 34;
  const circ = 2 * Math.PI * r;
  const grays = [
    "rgba(29,29,31,0.92)",
    "rgba(29,29,31,0.62)",
    "rgba(29,29,31,0.42)",
    "rgba(29,29,31,0.26)",
    "rgba(29,29,31,0.14)",
    "rgba(29,29,31,0.08)",
  ];
  let offset = 0;
  return (
    <div className={styles.donutWrap}>
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
                strokeDasharray={`${dash - 1.5} ${circ - dash + 1.5}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
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
