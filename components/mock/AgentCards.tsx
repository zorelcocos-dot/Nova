"use client";

import { useEffect, useState } from "react";
import m from "./mock.module.css";
import { IconAgent } from "@/components/icons";
import { usePrefersReducedMotion } from "@/components/hooks";
import { agents, type Agent } from "@/lib/data";

/**
 * Marketing agent cards. Working agents feel gently alive —
 * progress drifts, activity rotates on hover, the status dot
 * pulses. Scheduled / paused agents stay completely calm.
 */
function AgentCard({ agent }: { agent: Agent }) {
  const reduced = usePrefersReducedMotion();
  const active = agent.status === "Working";
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(Math.max(agent.progress, 8));
  const [activityIdx, setActivityIdx] = useState(0);

  // Working agents: progress inches forward while the section is on screen.
  useEffect(() => {
    if (!active || reduced) return;
    const t = window.setInterval(() => {
      if (document.hidden) return;
      setProgress((p) => (p >= 96 ? 34 : p + 1));
    }, 2800);
    return () => window.clearInterval(t);
  }, [active, reduced]);

  // On hover, the activity list quietly rotates to the next entry.
  useEffect(() => {
    if (!hovered || reduced) return;
    const t = window.setInterval(() => {
      setActivityIdx((i) => (i + 1) % agent.recent.length);
    }, 2400);
    return () => window.clearInterval(t);
  }, [hovered, reduced, agent.recent.length]);

  const orderedRecent = active
    ? Array.from({ length: agent.recent.length }, (_, i) => {
        const idx = (activityIdx + i) % agent.recent.length;
        return { ...agent.recent[idx], key: `${activityIdx}-${i}` };
      })
    : agent.recent.map((r, i) => ({ ...r, key: `static-${i}` }));

  return (
    <article
      className={`${m.agentCard} ${hovered ? m.agentCardHover : ""} ${
        active ? m.agentCardActive : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={m.agentCardHead}>
        <div className={m.agentCardTile}>
          <IconAgent size={17} />
        </div>
        <div>
          <div className={m.agentCardName}>{agent.name}</div>
          <div className={m.agentCardRole}>{agent.description}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          className={`${m.statusChip} ${
            agent.status === "Working" ? "" : m.statusChipPaused
          }`}
        >
          <span
            className={`dot ${agent.status === "Working" ? "dot-pulse" : ""}`}
            style={
              agent.status !== "Working" ? { background: "var(--ink-3)" } : undefined
            }
          />
          {agent.status}
        </span>
        {agent.status === "Working" && (
          <span className="caption" style={{ fontVariantNumeric: "tabular-nums" }}>
            {progress}% complete
          </span>
        )}
      </div>

      <div className={m.currentTask}>
        <div className={m.currentTaskLabel}>
          <span>Current task</span>
        </div>
        <div className={m.currentTaskText}>{agent.currentTask}</div>
        {agent.status === "Working" && (
          <div className={m.taskProgress}>
            <i style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className={m.actionList}>
        {orderedRecent.map((r, i) => (
          <div
            key={r.key}
            className={`${m.actionRow} ${
              hovered && active && i === 0 && !reduced ? m.actionRowNew : ""
            }`}
          >
            <span className={m.actionTime}>{r.time}</span>
            <span>{r.text}</span>
          </div>
        ))}
      </div>

      <div className={m.agentCardFoot}>
        <div className={m.agentStat}>
          <b>{agent.tasksPerWeek}</b>
          <span>Tasks / week</span>
        </div>
        <div className={m.agentStat}>
          <b>{agent.avgTime}</b>
          <span>Avg. time</span>
        </div>
        <div className={m.agentStat}>
          <b>{agent.accuracy}</b>
          <span>Approval rate</span>
        </div>
      </div>
    </article>
  );
}

export default function AgentCards() {
  return (
    <div className={m.agentCards}>
      {agents.map((a) => (
        <AgentCard key={a.id} agent={a} />
      ))}
    </div>
  );
}
