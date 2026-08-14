import d from "./dash.module.css";

/**
 * Quiet skeleton shown while dashboard routes stream in.
 * Mirrors the overview's layout so the swap feels seamless.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className={d.pageHead}>
        <div>
          <div className="skeleton" style={{ width: 230, height: 22 }} />
          <div className="skeleton" style={{ width: 320, height: 12, marginTop: 10 }} />
        </div>
      </div>

      <div className={d.statGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={d.statCard}>
            <div className="skeleton" style={{ width: "62%", height: 11 }} />
            <div className="skeleton" style={{ width: "44%", height: 26, marginTop: 14 }} />
            <div className="skeleton" style={{ width: "80%", height: 10, marginTop: 12 }} />
          </div>
        ))}
      </div>

      <div className={d.gridMain}>
        <div className={d.statCard} style={{ padding: 18 }}>
          <div className="skeleton" style={{ width: 140, height: 13 }} />
          <div className="skeleton" style={{ height: 210, marginTop: 16 }} />
        </div>
        <div className={d.statCard} style={{ padding: 18 }}>
          <div className="skeleton" style={{ width: 110, height: 13 }} />
          <div className="skeleton" style={{ height: 210, marginTop: 16 }} />
        </div>
      </div>

      <div className={d.statCard} style={{ padding: 18 }}>
        <div className="skeleton" style={{ width: 150, height: 13 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 30, marginTop: 14 }} />
        ))}
      </div>
    </div>
  );
}
