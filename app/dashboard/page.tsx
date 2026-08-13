import Link from "next/link";
import { AreaChart, Sparkline } from "@/components/charts";
import {
  IconClock,
  IconBolt,
  IconAgent,
  IconCheck,
  IconPlus,
} from "@/components/icons";
import { agents, automations, activityFeed } from "@/lib/data";
import d from "./dash.module.css";
import m from "@/components/mock/mock.module.css";

const stats = [
  { icon: IconClock, label: "Hours saved", value: "341", delta: "+12.4%", spark: [12, 18, 15, 22, 27, 34, 41] },
  { icon: IconBolt, label: "Tasks automated", value: "3,621", delta: "+8.1%", spark: [22, 25, 21, 28, 26, 31, 36] },
  { icon: IconAgent, label: "Agent actions", value: "8,412", delta: "+14.9%", spark: [18, 22, 28, 24, 31, 36, 44] },
  { icon: IconCheck, label: "Approval rate", value: "96.2%", delta: "+1.1%", spark: [31, 28, 32, 35, 33, 36, 38] },
];

const approvals = [
  { who: "Sales Agent", what: "Send outreach sequence to 42 leads at Meridian", risk: "High impact" },
  { who: "Support Agent", what: "Issue pro-rated refund for Halcyon — $1,240", risk: "Financial" },
];

export default function DashboardOverview() {
  return (
    <>
      <div className={d.pageHead}>
        <div>
          <h1 className={d.pageTitle}>Good morning, Maya</h1>
          <p className={d.pageSub}>
            Tuesday, August 11 · Your agents completed 486 tasks overnight.
          </p>
        </div>
        <div className={d.headActions}>
          <span className="chip chip-bordered" style={{ height: 32, padding: "0 12px" }}>
            Last 7 days
          </span>
          <Link href="/dashboard/automations" className="btn btn-primary btn-sm">
            <IconPlus size={14} /> New automation
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className={d.statGrid}>
        {stats.map((s) => (
          <div key={s.label} className={d.statCard}>
            <div className={d.statLabel}>
              <s.icon size={14} />
              {s.label}
            </div>
            <div className={d.statValue}>{s.value}</div>
            <div className={d.statFoot}>
              <span className={d.statDelta}>↑ {s.delta} vs last week</span>
              <span style={{ color: "var(--ink-3)" }}>
                <Sparkline data={s.spark} width={64} height={22} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + agents */}
      <div className={d.gridMain}>
        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Productivity</div>
              <div className={m.cardSub}>Hours saved · this week</div>
            </div>
            <span className="chip chip-bordered">Weekly</span>
          </div>
          <div className={m.cardBody}>
            <AreaChart
              data={[38, 52, 47, 61, 74, 28, 31]}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              height={220}
            />
          </div>
        </div>

        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Agents at work</div>
              <div className={m.cardSub}>Live status</div>
            </div>
            <Link href="/dashboard/agents" className="chip" style={{ textDecoration: "none" }}>
              View all
            </Link>
          </div>
          <div className={m.cardBody}>
            {agents.map((a) => (
              <div key={a.id} className={m.agentRow}>
                <div className={m.agentTile}>
                  <IconAgent size={15} />
                </div>
                <div className={m.agentMeta}>
                  <div className={m.agentName}>
                    {a.role}
                    {a.status === "Working" && <span className="dot dot-pulse" />}
                  </div>
                  <div className={m.agentTask}>{a.currentTask}</div>
                </div>
                <div className={m.progress}>
                  <i style={{ width: `${Math.max(a.progress, 8)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approvals + activity */}
      <div className={d.gridHalf}>
        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Waiting for approval</div>
              <div className={m.cardSub}>Agents pause here — you decide</div>
            </div>
            <span className="chip chip-accent">2 pending</span>
          </div>
          <div className={m.cardBody}>
            {approvals.map((a) => (
              <div key={a.what} className={d.approvalRow}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>{a.who}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}>{a.what}</div>
                  <div className="caption" style={{ marginTop: 4 }}>{a.risk}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flex: "none" }}>
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--bg)", cursor: "default" }}>Approve</span>
                  <span className="chip chip-bordered">Review</span>
                </div>
              </div>
            ))}
            <p className="caption" style={{ paddingTop: 12 }}>
              Auto-approved below high-impact thresholds: 1,204 actions this week.
            </p>
          </div>
        </div>

        <div className={m.card}>
          <div className={m.cardHead}>
            <div>
              <div className={m.cardTitle}>Recent activity</div>
              <div className={m.cardSub}>Across agents, automations, and people</div>
            </div>
          </div>
          <div className={m.cardBody}>
            {activityFeed.slice(0, 5).map((f) => (
              <div key={f.what} className={m.feedRow}>
                <span className="dot dot-ok" style={{ alignSelf: "center" }} />
                <span>
                  <b className={m.feedWho}>{f.who}</b>{" "}
                  <span style={{ color: "var(--ink-2)" }}>{f.what}</span>
                </span>
                <span className={m.feedTime}>{f.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top automations */}
      <div className={m.card}>
        <div className={m.cardHead}>
          <div>
            <div className={m.cardTitle}>Top automations</div>
            <div className={m.cardSub}>By runs · last 7 days</div>
          </div>
          <Link href="/dashboard/automations" className="chip">Manage</Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Automation</th>
                <th>Trigger</th>
                <th>Runs</th>
                <th>Success</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {automations.slice(0, 5).map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td style={{ color: "var(--ink-2)" }}>{a.trigger}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{a.runs}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{a.success}</td>
                  <td>
                    <span className="chip" style={{ fontSize: 11 }}>
                      <span className={`dot ${a.active ? "dot-ok" : ""}`} />
                      {a.active ? "Active" : "Paused"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
