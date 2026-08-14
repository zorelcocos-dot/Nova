import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkflowCanvas from "@/components/mock/WorkflowCanvas";
import { Donut, BarChart, Sparkline } from "@/components/charts";
import {
  IconAgent,
  IconWorkflow,
  IconChart,
  IconUsers,
  IconLayers,
  IconShield,
  IconCheck,
  IconClock,
  brandIcons,
} from "@/components/icons";
import { agents, integrations } from "@/lib/data";
import s from "../sub.module.css";
import m from "@/components/mock/mock.module.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "AI agents, workflow automation, smart analytics, team collaboration, integrations, and enterprise security — the complete NOVA platform.",
};

const research = agents[0];

export default function FeaturesPage() {
  return (
    <>
      <section className={`${s.pageHero} ${s.pageHeroCenter}`}>
        <div className="container">
          <div className={s.pageHeroInner}>
            <Reveal>
              <p className="eyebrow">Product</p>
              <h1 className="h-1">
                Everything a team needs to automate real work.
              </h1>
              <p className="lead">
                Agents that take ownership, workflows you can reason about, and
                analytics that prove the value — one coherent platform.
              </p>
              <div className={s.heroCtas}>
                <Link href="/signup" className="btn btn-primary">
                  Start building free
                </Link>
                <Link href="/pricing" className="btn btn-secondary">
                  See pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container">
        {/* 1 — AI Agents */}
        <div className={s.featRow} id="agents">
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconAgent size={16} /></span>
              <span className="eyebrow">AI Agents</span>
            </div>
            <h2 className="h-2">Colleagues that never drop the thread.</h2>
            <p className="body">
              Each agent owns a category of work with explicit permissions,
              a job description, and a track record. Onboard them once — then
              they brief, draft, resolve, and reconcile on their own.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> Scoped permissions per tool: read-only, draft-only, or act</li>
              <li><IconCheck size={15} /> Escalates with context and a recommendation when unsure</li>
              <li><IconCheck size={15} /> Learns your voice, playbooks, and exceptions quietly</li>
            </ul>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <div className={m.agentCard}>
              <div className={m.agentCardHead}>
                <div className={m.agentCardTile}><IconAgent size={17} /></div>
                <div>
                  <div className={m.agentCardName}>{research.name}</div>
                  <div className={m.agentCardRole}>{research.description}</div>
                </div>
              </div>
              <div className={m.currentTask}>
                <div className={m.currentTaskLabel}><span>Permissions</span></div>
                <div className="table" style={{ marginTop: 8 }}>
                  {[
                    ["Slack", "Draft only"],
                    ["HubSpot", "Act"],
                    ["Google Drive", "Read only"],
                  ].map(([tool, perm]) => (
                    <div
                      key={tool}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid var(--line)",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{tool}</span>
                      <span className="chip chip-bordered">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="caption" style={{ marginBottom: 8 }}>Activity · this week</div>
                <Sparkline data={[22, 31, 28, 44, 39, 52, 61]} width={560} height={60} />
              </div>
              <div className={m.agentCardFoot}>
                <div className={m.agentStat}><b>{research.tasksPerWeek}</b><span>Tasks / week</span></div>
                <div className={m.agentStat}><b>{research.avgTime}</b><span>Avg. time</span></div>
                <div className={m.agentStat}><b>{research.accuracy}</b><span>Approval rate</span></div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2 — Workflow automation */}
        <div className={`${s.featRow} ${s.featRowFlip}`}>
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconWorkflow size={16} /></span>
              <span className="eyebrow">Workflow automation</span>
            </div>
            <h2 className="h-2">Logic drawn the way you think it.</h2>
            <p className="body">
              Start with a sentence — &ldquo;when a ticket&rsquo;s urgent, draft a
              reply and brief Maya&rdquo; — and NOVA lays out the flow. Branch,
              loop, and hand off on a canvas that stays calm under pressure.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> 42 trigger sources across every integration</li>
              <li><IconCheck size={15} /> Guaranteed-termination loops and live data previews</li>
              <li><IconCheck size={15} /> Version history with diffs and one-click rollback</li>
            </ul>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <WorkflowCanvas />
          </Reveal>
        </div>

        {/* 3 — Smart analytics */}
        <div className={s.featRow}>
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconChart size={16} /></span>
              <span className="eyebrow">Smart analytics</span>
            </div>
            <h2 className="h-2">Numbers your CFO will accept.</h2>
            <p className="body">
              Hours saved measured against real baselines, approval rates per
              agent, cost per automated task — with confidence intervals, not
              vibes. Every chart drills down to the runs behind it.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> Ask Analytics — type a question, get a chart</li>
              <li><IconCheck size={15} /> Per-workflow ROI with exportable methodology</li>
              <li><IconCheck size={15} /> Weekly digests to Slack or email, automatically</li>
            </ul>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <div className={s.mediaPanel}>
              <div style={{ padding: "20px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Where the hours come back</div>
                <span className="chip chip-bordered">30 days</span>
              </div>
              <div style={{ padding: "16px 22px 22px" }}>
                <Donut
                  data={[
                    { label: "Support resolution", value: 42 },
                    { label: "Research briefs", value: 21 },
                    { label: "CRM hygiene", value: 18 },
                    { label: "Reporting", value: 12 },
                    { label: "Other", value: 7 },
                  ]}
                  centerValue="341"
                  centerLabel="Hours"
                />
                <div style={{ borderTop: "1px solid var(--line)", marginTop: 16, paddingTop: 16 }}>
                  <BarChart
                    data={[
                      { label: "Support", value: 2047 },
                      { label: "Sales", value: 1219 },
                      { label: "Research", value: 384 },
                      { label: "Data", value: 693 },
                    ]}
                    comma
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4 — Team collaboration */}
        <div className={`${s.featRow} ${s.featRowFlip}`}>
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconUsers size={16} /></span>
              <span className="eyebrow">Team collaboration</span>
            </div>
            <h2 className="h-2">Agents report. Humans decide.</h2>
            <p className="body">
              Approvals land where your team already is — Slack, email, or the
              shared inbox — with the full context to say yes or no in seconds.
              Comments, ownership, and handoffs included.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> Batch approvals with per-item diffs</li>
              <li><IconCheck size={15} /> Role-based routing for high-impact actions</li>
              <li><IconCheck size={15} /> Threaded comments on any agent decision</li>
            </ul>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <div className={m.card}>
              <div className={m.cardHead}>
                <div>
                  <div className={m.cardTitle}>Approval request</div>
                  <div className={m.cardSub}>Sales Agent · 9 min ago</div>
                </div>
                <span className="chip chip-accent">Decision needed</span>
              </div>
              <div className={m.cardBody}>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6 }}>
                  Send the Q4 expansion sequence to <b style={{ color: "var(--ink)", fontWeight: 500 }}>42 leads</b> at
                  Meridian. Drafts reference last quarter&rsquo;s call notes and
                  the new pricing page. Estimated send time 45 minutes.
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--bg)", height: 28, padding: "0 13px" }}>Approve</span>
                  <span className="chip chip-bordered" style={{ height: 28, padding: "0 13px" }}>Edit drafts</span>
                  <span className="chip chip-bordered" style={{ height: 28, padding: "0 13px" }}>Reject</span>
                </div>
                <div style={{ borderTop: "1px solid var(--line)", marginTop: 18, paddingTop: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div className={m.avatarCircle}>MC</div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>Maya Chen <span style={{ color: "var(--ink-3)", fontWeight: 400 }}>commented</span></div>
                    <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 3, lineHeight: 1.5 }}>
                      Approved for all leads except the three in legal review — nice catch flagging those.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 5 — Integrations */}
        <div className={s.featRow}>
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconLayers size={16} /></span>
              <span className="eyebrow">Integrations</span>
            </div>
            <h2 className="h-2">Your stack, minus the swivel chair.</h2>
            <p className="body">
              80+ two-way integrations with scoped OAuth and permissions
              inherited from the source tool. Connect once — every agent and
              workflow can use it, with your rules.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> Real-time sync: median event latency 1.4 seconds</li>
              <li><IconCheck size={15} /> Scoped tokens, revocable per action class</li>
              <li><IconCheck size={15} /> Full REST API + webhooks for anything else</li>
            </ul>
            <Link href="/integrations" className="link-arrow" style={{ marginTop: 24, display: "inline-flex" }}>
              Browse integrations
            </Link>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {integrations.map((tool) => {
                const BrandIcon = brandIcons[tool.id];
                return (
                  <div key={tool.id} className={m.intTile} style={{ alignItems: "center", textAlign: "center", gap: 10, padding: 18 }}>
                    <div className={m.intIcon}><BrandIcon size={18} /></div>
                    <div className={m.intName} style={{ fontSize: 12.5 }}>{tool.name}</div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* 6 — Enterprise security */}
        <div className={`${s.featRow} ${s.featRowFlip}`} id="security">
          <Reveal className={s.featRowCopy}>
            <div className={s.kicker}>
              <span className={s.kickerIcon}><IconShield size={16} /></span>
              <span className="eyebrow">Enterprise security</span>
            </div>
            <h2 className="h-2">Boring, on purpose.</h2>
            <p className="body">
              Scoped permissions, immutable audit logs, and data that never
              trains models. Security at NOVA is an architecture, not a
              brochure.
            </p>
            <ul className={s.checkList}>
              <li><IconCheck size={15} /> Data encrypted in transit and at rest, per-workspace keys</li>
              <li><IconCheck size={15} /> Contractually excluded from model training. Always.</li>
              <li><IconCheck size={15} /> Export or delete everything, anytime, no ticket required</li>
            </ul>
          </Reveal>
          <Reveal delay={110} className={s.featRowMedia}>
            <div className={s.mediaPanel} style={{ padding: "8px 0" }}>
              {[
                { t: "SOC 2 Type II", d: "Continuously monitored controls, not an annual snapshot." },
                { t: "SSO / SAML & SCIM", d: "Okta, Entra, Google Workspace — provision and deprovision in minutes." },
                { t: "Immutable audit log", d: "Every agent decision sealed, queryable, and exportable." },
                { t: "Data residency", d: "EU, US, and APAC storage with workspace-level routing." },
                { t: "Role-based access", d: "Permissions down to individual workflows and agents." },
              ].map((row) => (
                <div key={row.t} style={{ display: "flex", gap: 14, padding: "16px 24px", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }}>
                  <IconShield size={17} style={{ flex: "none", marginTop: 2, color: "var(--ok)" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.012em" }}>{row.t}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 3, lineHeight: 1.5 }}>{row.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Solutions */}
      <section className={`section ${s.band}`} id="solutions">
        <div className="container">
          <div className="section-header center">
            <Reveal>
              <p className="eyebrow">Solutions</p>
              <h2 className="h-1" style={{ marginTop: 16 }}>Sized for your stage.</h2>
              <p className="lead">
                The same platform, opinionated about what matters at each
                stage of a company&rsquo;s life.
              </p>
            </Reveal>
          </div>
          <div className={s.grid3}>
            {[
              {
                t: "Startups",
                d: "Two people doing the work of twenty. Agents handle ops, support, and reporting while you ship the thing only you can build.",
                f: ["Deploy an agent before lunch", "Free until you're ready to scale", "Zero ops headcount required"],
              },
              {
                t: "Growth",
                d: "Process debt is compounding. NOVA clears the coordination layer — handoffs, hygiene, status — so growth doesn't mean bloat.",
                f: ["Approval flows for every risk level", "Per-team analytics and budgets", "Priority support that answers fast"],
              },
              {
                t: "Enterprise",
                d: "Governance without handcuffs. Auditable autonomy across thousands of workflows, with the controls your board expects.",
                f: ["SSO/SAML, SCIM, audit logs", "Dedicated success architect", "99.99% SLA and data residency"],
              },
            ].map((tile, i) => (
              <Reveal key={tile.t} delay={i * 80}>
                <div className={s.tileCard} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em" }}>{tile.t}</div>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 10 }}>{tile.d}</p>
                  <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                    {tile.f.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 9, fontSize: 13, color: "var(--ink-2)" }}>
                        <IconCheck size={13} style={{ color: "var(--ok)", flex: "none", marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <span className="body-s" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <IconClock size={14} /> Median time from signup to first automated task: 9 minutes.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaBand}>
        <div className="container">
          <Reveal>
            <h2 className="h-1">See it running on your own stack.</h2>
            <p className="lead">
              Connect one tool. Watch a workflow finish itself. That&rsquo;s the
              demo.
            </p>
            <div className={s.heroCtas}>
              <Link href="/signup" className="btn btn-primary btn-lg">Start building free</Link>
              <Link href="/docs" className="btn btn-secondary btn-lg">Read the docs</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
