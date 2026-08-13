"use client";

import { useState } from "react";
import { AreaChart, Donut, BarChart, Sparkline } from "@/components/charts";
import { IconClock, IconBolt, IconCheck, IconAgent } from "@/components/icons";
import { chartRanges, donutData, tasksByType } from "@/lib/data";
import d from "../dash.module.css";
import m from "@/components/mock/mock.module.css";

type Range = keyof typeof chartRanges;

export default function AnalyticsClient() {
  const [range, setRange] = useState<Range>("30d");
  const data = chartRanges[range];
  const hours = data.hoursSaved.reduce((a, b) => a + b, 0);
  const tasks = data.tasksAutomated.reduce((a, b) => a + b, 0);

  const stats = [
    { icon: IconClock, label: "Hours saved", value: hours.toLocaleString(), delta: "+12.4%", spark: data.hoursSaved },
    { icon: IconBolt, label: "Tasks automated", value: tasks.toLocaleString(), delta: "+8.1%", spark: data.tasksAutomated },
    { icon: IconCheck, label: "Approval rate", value: "96.2%", delta: "+1.1%", spark: [31, 28, 32, 35, 33, 36, 38] },
    { icon: IconAgent, label: "Escalation rate", value: "1.8%", delta: "-0.4%", spark: [12, 11, 10, 9, 9, 8, 8] },
  ];

  return (
    <>
      <div className={d.pageHead}>
        <div>
          <h1 className={d.pageTitle}>Analytics</h1>
          <p className={d.pageSub}>
            Measured against real baselines — exportable, defensible numbers.
          </p>
        </div>
        <div className={d.segRow} role="tablist" aria-label="Date range">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={range === r}
              className={`${d.seg} ${range === r ? d.segOn : ""}`}
              onClick={() => setRange(r)}
            >
              {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
      </div>

      <div className={d.statGrid}>
        {stats.map((st) => (
          <div key={st.label} className={d.statCard}>
            <div className={d.statLabel}>
              <st.icon size={14} />
              {st.label}
            </div>
            <div className={d.statValue}>{st.value}</div>
            <div className={d.statFoot}>
              <span className={d.statDelta}>↑ {st.delta} vs prior</span>
              <span style={{ color: "var(--ink-3)" }}>
                <Sparkline data={[...st.spark]} width={64} height={22} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={d.gridMain}>
        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Hours saved</div>
              <div className={m.cardSub}>
                {range === "7d" ? "Per day" : range === "30d" ? "Per week" : "Per month"} ·
                with rolling baseline
              </div>
            </div>
            <span className="chip chip-bordered">{range}</span>
          </div>
          <div className={m.cardBody}>
            <AreaChart
              key={range}
              data={[...data.hoursSaved]}
              labels={[...data.labels]}
              height={236}
            />
          </div>
        </div>

        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Automation usage</div>
              <div className={m.cardSub}>Share of automated tasks</div>
            </div>
          </div>
          <div className={m.cardBody} style={{ paddingTop: 18 }}>
            <Donut
              data={donutData.map((x) => ({ ...x }))}
              centerValue={range === "7d" ? "2.9k" : range === "30d" ? "12k" : "46.7k"}
              centerLabel="Tasks"
            />
          </div>
        </div>
      </div>

      <div className={d.gridHalf}>
        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Tasks by category</div>
              <div className={m.cardSub}>Last 30 days</div>
            </div>
          </div>
          <div className={m.cardBody} style={{ paddingTop: 16 }}>
            <BarChart data={tasksByType} format={(v) => v.toLocaleString()} />
          </div>
        </div>

        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Agent performance</div>
              <div className={m.cardSub}>Output, speed, and trust</div>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Tasks / wk</th>
                  <th>Avg. time</th>
                  <th>Approval</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { a: "Support", t: "2,047", avg: "1m 12s", ap: "99.5%", s: [64, 71, 69, 82, 91, 88, 96] },
                  { a: "Sales", t: "1,219", avg: "48s", ap: "98.7%", s: [48, 55, 51, 63, 71, 66, 78] },
                  { a: "Research", t: "384", avg: "3m 40s", ap: "99.2%", s: [22, 31, 28, 44, 39, 52, 61] },
                  { a: "Data", t: "693", avg: "2m 05s", ap: "99.8%", s: [18, 22, 20, 26, 31, 29, 34] },
                ].map((r) => (
                  <tr key={r.a}>
                    <td style={{ fontWeight: 500 }}>{r.a}</td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>{r.t}</td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>{r.avg}</td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>{r.ap}</td>
                    <td>
                      <span style={{ color: "var(--ink-3)" }}>
                        <Sparkline data={r.s} width={72} height={20} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="caption">
        Methodology: hours saved = automated task time − human review time,
        measured against each workflow&rsquo;s pre-automation baseline with 95%
        confidence intervals. Export the raw data from Settings → API.
      </p>
    </>
  );
}
