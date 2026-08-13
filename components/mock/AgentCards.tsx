import m from "./mock.module.css";
import { IconAgent } from "@/components/icons";
import { agents } from "@/lib/data";

export default function AgentCards() {
  return (
    <div className={m.agentCards}>
      {agents.map((a) => (
        <article key={a.id} className={m.agentCard}>
          <div className={m.agentCardHead}>
            <div className={m.agentCardTile}>
              <IconAgent size={17} />
            </div>
            <div>
              <div className={m.agentCardName}>{a.name}</div>
              <div className={m.agentCardRole}>{a.description}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className={`${m.statusChip} ${
                a.status === "Working" ? "" : m.statusChipPaused
              }`}
            >
              <span
                className={`dot ${a.status === "Working" ? "dot-pulse" : ""}`}
                style={
                  a.status !== "Working" ? { background: "var(--ink-3)" } : undefined
                }
              />
              {a.status}
            </span>
            {a.status === "Working" && (
              <span className="caption">{a.progress}% complete</span>
            )}
          </div>

          <div className={m.currentTask}>
            <div className={m.currentTaskLabel}>
              <span>Current task</span>
            </div>
            <div className={m.currentTaskText}>{a.currentTask}</div>
            {a.status === "Working" && (
              <div className={m.taskProgress}>
                <i style={{ width: `${a.progress}%` }} />
              </div>
            )}
          </div>

          <div className={m.actionList}>
            {a.recent.map((r) => (
              <div key={r.time} className={m.actionRow}>
                <span className={m.actionTime}>{r.time}</span>
                <span>{r.text}</span>
              </div>
            ))}
          </div>

          <div className={m.agentCardFoot}>
            <div className={m.agentStat}>
              <b>{a.tasksPerWeek}</b>
              <span>Tasks / week</span>
            </div>
            <div className={m.agentStat}>
              <b>{a.avgTime}</b>
              <span>Avg. time</span>
            </div>
            <div className={m.agentStat}>
              <b>{a.accuracy}</b>
              <span>Approval rate</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
