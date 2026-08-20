"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Sparkline } from "@/components/charts";
import { IconAgent, IconPlus, IconCheck } from "@/components/icons";
import { agents } from "@/lib/data";
import d from "../dash.module.css";
import m from "@/components/mock/mock.module.css";

const sparks: Record<string, number[]> = {
  research: [22, 31, 28, 44, 39, 52, 61],
  sales: [48, 55, 51, 63, 71, 66, 78],
  support: [64, 71, 69, 82, 91, 88, 96],
  data: [18, 22, 20, 26, 31, 29, 34],
};

export default function AgentsClient() {
  const [paused, setPaused] = useState<Record<string, boolean>>({});

  const { toast: notice } = useToast();

  return (
    <>
      <div className={d.pageHead}>
        <div>
          <h1 className={d.pageTitle}>Agents</h1>
          <p className={d.pageSub}>
            Four specialists on duty. They ask before high-impact actions.
          </p>
        </div>
        <div className={d.headActions}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => notice("Connect a tool first — agents inherit its permissions.")}
          >
            <IconPlus size={14} /> Deploy agent
          </button>
        </div>
      </div>

      <div className={d.gridHalf} style={{ alignItems: "start" }}>
        {agents.map((a) => {
          const isPaused = paused[a.id] ?? false;
          const status = isPaused ? "Paused" : a.status;
          return (
            <article key={a.id} className={m.agentCard}>
              <div className={m.agentCardHead}>
                <div className={m.agentCardTile}>
                  <IconAgent size={17} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className={m.agentCardName}>{a.name}</div>
                  <div className={m.agentCardRole}>{a.description}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`${m.statusChip} ${status === "Working" ? "" : m.statusChipPaused}`}>
                  <span
                    className={`dot ${status === "Working" ? "dot-pulse" : ""}`}
                    style={status !== "Working" ? { background: "var(--ink-3)" } : undefined}
                  />
                  {status}
                </span>
                {status === "Working" && <span className="caption">{a.progress}% complete</span>}
              </div>

              <div className={m.currentTask}>
                <div className={m.currentTaskLabel}><span>Current task</span></div>
                <div className={m.currentTaskText}>
                  {isPaused ? "On pause — work resumes the moment you say so." : a.currentTask}
                </div>
                {!isPaused && a.status === "Working" && (
                  <div className={m.taskProgress}>
                    <i style={{ width: `${a.progress}%` }} />
                  </div>
                )}
              </div>

              <div>
                <div className="caption" style={{ marginBottom: 6 }}>Output · this week</div>
                <Sparkline data={sparks[a.id]} width={520} height={44} />
              </div>

              <div className={m.agentCardFoot}>
                <div className={m.agentStat}><b>{a.tasksPerWeek}</b><span>Tasks / week</span></div>
                <div className={m.agentStat}><b>{a.avgTime}</b><span>Avg. time</span></div>
                <div className={m.agentStat}><b>{a.accuracy}</b><span>Approval rate</span></div>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginLeft: "auto" }}
                  onClick={() => {
                    setPaused((p) => ({ ...p, [a.id]: !p[a.id] }));
                    notice(isPaused ? `${a.role} agent resumed.` : `${a.role} agent paused. No actions will run.`);
                  }}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Recent actions */}
      <div className={m.card}>
        <div className={m.cardHead}>
          <div>
            <div className={m.cardTitle}>Recent agent actions</div>
            <div className={m.cardSub}>Everything, with receipts</div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Action</th>
                <th>Confidence</th>
                <th>When</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {[
                { agent: "Support", action: "Resolved ticket #5841 — billing question", conf: "0.94", when: "1 min ago", result: "Auto-approved" },
                { agent: "Sales", action: "Drafted outreach sequence — 42 leads", conf: "0.87", when: "9 min ago", result: "Needs approval" },
                { agent: "Research", action: "Competitive brief: Castello pricing", conf: "0.96", when: "26 min ago", result: "Auto-approved" },
                { agent: "Data", action: "Reconciled 214 duplicate records", conf: "0.97", when: "3 hours ago", result: "Auto-approved" },
                { agent: "Support", action: "Escalated refund request to Maya", conf: "0.61", when: "Yesterday", result: "Escalated" },
              ].map((r) => (
                <tr key={r.action}>
                  <td style={{ fontWeight: 500 }}>{r.agent}</td>
                  <td style={{ color: "var(--ink-2)" }}>{r.action}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{r.conf}</td>
                  <td style={{ color: "var(--ink-3)" }}>{r.when}</td>
                  <td>
                    <span className={`chip ${r.result === "Auto-approved" ? "" : "chip-accent"}`} style={{ fontSize: 11 }}>
                      {r.result === "Auto-approved" && <IconCheck size={11} />}
                      {r.result}
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
