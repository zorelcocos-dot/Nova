"use client";

import { useEffect, useRef, useState } from "react";
import m from "./mock.module.css";
import { AreaChart, Sparkline } from "@/components/charts";
import { useCountUp, useInView, usePrefersReducedMotion } from "@/components/hooks";
import {
  IconGrid,
  IconAgent,
  IconWorkflow,
  IconChart,
  IconInbox,
  IconGear,
  IconBell,
  IconLock,
  IconSearch,
} from "@/components/icons";
import { agents } from "@/lib/data";

const navItems = [
  { icon: IconGrid, label: "Overview", active: true },
  { icon: IconAgent, label: "Agents", count: "4" },
  { icon: IconWorkflow, label: "Workflows", count: "12" },
  { icon: IconChart, label: "Analytics" },
  { icon: IconInbox, label: "Inbox", count: "9" },
];

const kpis = [
  { label: "Hours saved", value: "128", delta: "+12.4%", spark: [12, 18, 15, 22, 27, 34, 41] },
  { label: "Tasks automated", value: "2,847", delta: "+8.1%", spark: [22, 25, 21, 28, 26, 31, 36] },
  { label: "Approval rate", value: "96.2%", delta: "+1.9%", spark: [31, 28, 32, 35, 33, 36, 38] },
];

type FeedItem = { id: number; who: string; what: string; when: string };

const feedPool: Omit<FeedItem, "id">[] = [
  { who: "Support Agent", what: "resolved ticket #5841 — billing question", when: "12:41" },
  { who: "Triage automation", what: "completed 42 tickets in 44s", when: "12:38" },
  { who: "Maya Chen", what: "approved 3 agent actions", when: "12:31" },
  { who: "Research Agent", what: "delivered competitive brief to Growth", when: "12:29" },
  { who: "Sales Agent", what: "enriched 26 contacts from call notes", when: "12:24" },
  { who: "Data Agent", what: "flagged a null-rate spike in events", when: "12:18" },
  { who: "Support Agent", what: "escalated refund request to Maya", when: "12:12" },
  { who: "PR summary automation", what: "posted release notes to #eng-updates", when: "12:07" },
];

function KpiValue({ value, start }: { value: string; start: boolean }) {
  const text = useCountUp(value, start, 1400);
  return <div className={m.kpiValue}>{text}</div>;
}

export default function ProductApp() {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  // Live agent progress — drifts forward slowly, wraps like a fresh task.
  const [progress, setProgress] = useState<Record<string, number>>(() =>
    Object.fromEntries(agents.map((a) => [a.id, Math.max(a.progress, 8)]))
  );

  // Activity feed — new items glide in at the top every few seconds.
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    feedPool.slice(0, 3).map((f, i) => ({ ...f, id: i }))
  );
  const nextId = useRef(3);
  const poolIdx = useRef(3);

  useEffect(() => {
    if (reduced || !inView) return;

    const progressTimer = window.setInterval(() => {
      if (document.hidden) return;
      setProgress((prev) => {
        const next = { ...prev };
        for (const a of agents) {
          if (a.status !== "Working") continue;
          const cur = next[a.id];
          next[a.id] = cur >= 96 ? 30 + Math.round(Math.random() * 14) : cur + 1 + Math.round(Math.random() * 2);
        }
        return next;
      });
    }, 2600);

    const feedTimer = window.setInterval(() => {
      if (document.hidden) return;
      setFeed((prev) => {
        const item = feedPool[poolIdx.current % feedPool.length];
        poolIdx.current += 1;
        const now = new Date();
        const when = `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;
        const withId = { ...item, when, id: nextId.current };
        nextId.current += 1;
        return [withId, ...prev].slice(0, 3);
      });
    }, 6400);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(feedTimer);
    };
  }, [reduced, inView]);

  return (
    <div className={m.frame} ref={ref}>
      <div className={m.frameChrome}>
        <div className={m.lights}>
          <span />
          <span />
          <span />
        </div>
        <div className={m.address}>
          <IconLock size={11} />
          nova.build/overview
        </div>
        <div className={m.chromeGhost} />
      </div>

      <div className={m.frameBody}>
        {/* Sidebar */}
        <aside className={m.sidebar}>
          <div className={m.workspace}>
            <div className={m.workspaceTile}>A</div>
            <span className={m.workspaceName}>Arcadia</span>
            <span className={m.workspacePlan}>Pro</span>
          </div>

          <div className={m.sideSection}>
            <div className={m.sideLabel}>Workspace</div>
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`${m.sideItem} ${item.active ? m.sideItemActive : ""}`}
              >
                <item.icon />
                <span>{item.label}</span>
                {item.count && <span className={m.sideCount}>{item.count}</span>}
              </div>
            ))}
          </div>

          <div className={m.sideSection}>
            <div className={m.sideLabel}>Agents</div>
            {agents.map((a) => (
              <div key={a.id} className={m.sideItem}>
                <span className={`dot ${a.status === "Working" ? "dot-ok" : ""}`} />
                <span>{a.role}</span>
              </div>
            ))}
          </div>

          <div className={m.sideUser}>
            <div className={m.avatarCircle}>MC</div>
            <div className={m.sideUserText}>
              <div className={m.sideUserName}>Maya Chen</div>
              <div className={m.sideUserRole}>Admin</div>
            </div>
            <IconGear size={15} style={{ marginLeft: "auto", color: "var(--ink-3)" }} />
          </div>
        </aside>

        {/* Main pane */}
        <div className={m.main}>
          <div className={m.topbar}>
            <div className={m.pageTitle}>Overview</div>
            <div className={m.searchPill}>
              <IconSearch size={13} />
              <span>Search or ask…</span>
              <span className="kbd">⌘K</span>
            </div>
            <div className={m.iconBtn}>
              <IconBell size={16} />
              <span className={m.badgedot} />
            </div>
          </div>

          <div className={m.kpis}>
            {kpis.map((k) => (
              <div key={k.label} className={m.kpi}>
                <div className={m.kpiTop}>
                  <span className={m.kpiLabel}>{k.label}</span>
                  <span className={m.delta}>↑ {k.delta}</span>
                </div>
                <KpiValue value={k.value} start={inView} />
                <div className={m.kpiSpark}>
                  <Sparkline data={k.spark} width={92} height={26} />
                </div>
              </div>
            ))}
          </div>

          <div className={m.midGrid}>
            <div className={m.card}>
              <div className={m.cardHead}>
                <div>
                  <div className={m.cardTitle}>Productivity</div>
                  <div className={m.cardSub}>Hours saved · last 7 days</div>
                </div>
                <span className="chip chip-bordered">Weekly</span>
              </div>
              <div className={m.cardBody}>
                <AreaChart
                  data={[38, 52, 47, 61, 74, 58, 81]}
                  labels={["Mon", "Wed", "Fri", "Sun"]}
                  height={150}
                />
              </div>
            </div>

            <div className={m.card}>
              <div className={m.cardHead}>
                <div>
                  <div className={m.cardTitle}>Agents</div>
                  <div className={m.cardSub}>Live status</div>
                </div>
                <span className="chip">
                  <span className="dot dot-pulse" /> Live
                </span>
              </div>
              <div className={m.cardBody}>
                {agents.slice(0, 3).map((a) => (
                  <div key={a.id} className={m.agentRow}>
                    <div className={m.agentTile}>
                      <IconAgent size={16} />
                    </div>
                    <div className={m.agentMeta}>
                      <div className={m.agentName}>{a.role}</div>
                      <div className={m.agentTask}>{a.currentTask}</div>
                    </div>
                    <div className={m.progress}>
                      <i style={{ width: `${progress[a.id]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={m.card}>
            <div className={m.cardBody} style={{ paddingTop: 14 }}>
              {feed.map((f, i) => (
                <div key={f.id} className={`${m.feedRow} ${i === 0 && !reduced ? m.feedRowNew : ""}`}>
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
      </div>
    </div>
  );
}
