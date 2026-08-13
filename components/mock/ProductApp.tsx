import m from "./mock.module.css";
import { AreaChart, Sparkline } from "@/components/charts";
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

const feed = [
  { who: "Support Agent", what: "resolved ticket #5841 — billing question", when: "12:41" },
  { who: "Triage automation", what: "completed 42 tickets in 44s", when: "12:38" },
  { who: "Maya Chen", what: "approved 3 agent actions", when: "12:31" },
];

export default function ProductApp() {
  return (
    <div className={m.frame}>
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
                <div className={m.kpiValue}>{k.value}</div>
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
                      <i style={{ width: `${Math.max(a.progress, 8)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={m.card}>
            <div className={m.cardBody} style={{ paddingTop: 14 }}>
              {feed.map((f) => (
                <div key={f.when} className={m.feedRow}>
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
