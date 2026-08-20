import Link from "next/link";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/ui/Accordion";
import Pricing from "@/components/site/Pricing";
import ProductApp from "@/components/mock/ProductApp";
import WorkflowCanvas from "@/components/mock/WorkflowCanvas";
import AutomationRule from "@/components/mock/AutomationRule";
import AgentCards from "@/components/mock/AgentCards";
import ConsolePanel from "@/components/mock/ConsolePanel";
import { AreaChart, Donut } from "@/components/charts";
import CountUp from "@/components/CountUp";
import {
  IconChevronRight,
  IconAgent,
  IconSpark,
  IconShield,
  IconUsers,
  IconBolt,
  IconCheck,
  brandIcons,
} from "@/components/icons";
import { trustedCompanies, testimonials, integrations, faqs, agents } from "@/lib/data";
import h from "./home.module.css";
import m from "@/components/mock/mock.module.css";

const logoStyleKey: Record<string, string> = {
  w600: h.lw600,
  w500: h.lw500,
  caps: h.lcaps,
  serif: h.lserif,
  mono: h.lmono,
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className={h.hero}>
        <div className="container">
          <div className={h.heroInner}>
            <Reveal>
              <Link href="/blog/introducing-nova-ai-2" className={h.heroLabel}>
                <span className={`dot ${h.heroDot}`} />
                Introducing NOVA AI 2.0
                <IconChevronRight size={14} />
              </Link>
            </Reveal>
            <Reveal delay={70} blur>
              <h1 className={`h-display ${h.heroTitle}`}>
                Your work, automated&nbsp;by&nbsp;AI.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className={`lead ${h.heroSub}`}>
                NOVA is the AI productivity platform that plans, executes, and
                ships your team&rsquo;s busywork — so you can focus on the work
                that matters.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className={h.heroCtas}>
                <Link href="/signup" className="btn btn-primary btn-lg">
                  Start building free
                </Link>
                <Link href="/features" className="link-arrow" style={{ fontSize: 16 }}>
                  See how it works <IconChevronRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={280}>
            <div className={h.heroVisual}>
              <div className={h.heroMat} aria-hidden />
              <div className={h.heroVisualInner}>
                <ProductApp />
              </div>
            </div>
          </Reveal>
          <div className={h.heroCaption}>
            The NOVA command center — every agent, workflow, and result in one view.
          </div>
        </div>
      </section>

      {/* 2 — Trusted companies */}
      <section className={h.trusted}>
        <div className="container">
          <Reveal>
            <p className={h.trustedLabel}>
              Trusted by operations teams at 4,000+ companies
            </p>
          </Reveal>
          <div className={h.logoRow}>
            {trustedCompanies.map((c, i) => (
              <Reveal key={c.name} delay={120 + i * 45} as="span">
                <span className={`${h.logoWord} ${logoStyleKey[c.style]}`}>
                  {c.name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Large product showcase */}
      <section className={`section ${h.band}`}>
        <div className="container">
          <div className={h.splitHead}>
            <Reveal>
              <p className="eyebrow">The command center</p>
              <h2 className="h-1">One workspace. Every outcome.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Agents, workflows, approvals, and results — designed as one
                coherent surface, not five tools stapled together.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className={h.showGrid}>
              <div className={m.card}>
                <div className={m.cardHead}>
                  <div>
                    <div className={m.cardTitle}>Productivity</div>
                    <div className={m.cardSub}>Hours saved · last 30 days</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className="chip">7d</span>
                    <span className="chip" style={{ background: "var(--ink)", color: "var(--bg)" }}>30d</span>
                    <span className="chip">90d</span>
                  </div>
                </div>
                <div className={m.cardBody}>
                  <AreaChart
                    data={[182, 204, 196, 221, 238, 244, 262, 251, 274, 289, 301, 328]}
                    labels={["May 14", "May 28", "Jun 13"]}
                    height={232}
                  />
                </div>
              </div>

              <div className={h.showCol}>
                <div className={m.card}>
                  <div className={m.cardHead}>
                    <div>
                      <div className={m.cardTitle}>Agents</div>
                      <div className={m.cardSub}>4 active · 2 waiting on approval</div>
                    </div>
                  </div>
                  <div className={`${m.cardBody}`}>
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
                      </div>
                    ))}
                  </div>
                </div>

                <div className={m.card}>
                  <div className={m.cardHead}>
                    <div>
                      <div className={m.cardTitle}>Waiting for approval</div>
                      <div className={m.cardSub}>Human in the loop, always</div>
                    </div>
                  </div>
                  <div className={m.cardBody}>
                    {[
                      { who: "Sales Agent", what: "Send outreach sequence to 42 leads" },
                      { who: "Support Agent", what: "Issue refund for Halcyon — $1,240" },
                    ].map((r) => (
                      <div key={r.what} className={m.agentRow}>
                        <div className={m.agentMeta}>
                          <div className={m.agentName}>{r.who}</div>
                          <div className={m.agentTask}>{r.what}</div>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <span className="chip" style={{ background: "var(--ink)", color: "var(--bg)" }}>Approve</span>
                          <span className="chip">Review</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — AI automation feature */}
      <section className="section">
        <div className={`container ${h.split}`}>
          <Reveal className={h.splitCopy}>
            <p className="eyebrow">Workflow automation</p>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Describe the outcome. NOVA handles the rest.
            </h2>
            <p className="lead">
              Write automations the way you&rsquo;d explain them to a colleague.
              NOVA compiles your intent into precise, observable workflows.
            </p>
            <div className={h.featList}>
              <div className={h.feat}>
                <div className={h.featIcon}>
                  <IconSpark size={17} />
                </div>
                <div>
                  <div className={h.featTitle}>Plain-language rules</div>
                  <div className={h.featSub}>
                    Conditions and actions written in English, compiled into
                    deterministic steps you can inspect.
                  </div>
                </div>
              </div>
              <div className={h.feat}>
                <div className={h.featIcon}>
                  <IconBolt size={17} />
                </div>
                <div>
                  <div className={h.featTitle}>Preview on live data</div>
                  <div className={h.featSub}>
                    Test every step against real events before a workflow ever
                    goes live.
                  </div>
                </div>
              </div>
              <div className={h.feat}>
                <div className={h.featIcon}>
                  <IconCheck size={17} />
                </div>
                <div>
                  <div className={h.featTitle}>Approvals where it matters</div>
                  <div className={h.featSub}>
                    High-impact actions pause for a human call — reversible and
                    logged, every time.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className={h.splitMedia}>
            <AutomationRule />
          </Reveal>
        </div>
      </section>

      {/* 5 — The automation engine (dark) */}
      <section className="section dark">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: 56 }}>
            <Reveal>
              <p className="eyebrow" style={{ color: "var(--ink-3)" }}>The engine</p>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                Reliable enough to run the company on.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead" style={{ marginTop: 18 }}>
                Every run is observable, every action is logged, and every
                decision is replayable — down to the millisecond.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <ConsolePanel />
            </div>
          </Reveal>

          <div className={h.darkFeats}>
            {[
              {
                icon: IconBolt,
                t: "Sub-second triggers",
                s: "Events reach your workflows in 1.4s median — queues, workers, and meticulous bookkeeping, no magic.",
              },
              {
                icon: IconShield,
                t: "Everything audited",
                s: "Immutable, sealed audit events for every run. Replay any decision, export the full trail, anytime.",
              },
              {
                icon: IconUsers,
                t: "Human in the loop",
                s: "Impact thresholds route sensitive actions to the right person, with the context to decide fast.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className={h.darkFeat}>
                  <div className={h.darkFeatIcon}>
                    <f.icon size={16} />
                  </div>
                  <div className={h.darkFeatTitle}>{f.t}</div>
                  <div className={h.darkFeatSub}>{f.s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Workflow builder */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <Reveal>
              <p className="eyebrow">Workflow builder</p>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                Logic you can see at a glance.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Branching, approvals, and handoffs — drawn on a canvas calm
                enough to actually reason about.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <WorkflowCanvas />
          </Reveal>
        </div>
      </section>

      {/* 7 — AI agents */}
      <section className={`section ${h.band}`}>
        <div className="container">
          <div className={h.splitHead}>
            <Reveal>
              <p className="eyebrow">AI agents</p>
              <h2 className="h-1">Four colleagues who never sleep.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Deploy specialists for research, sales, support, and data. They
                report back with receipts — and ask before they act.
              </p>
            </Reveal>
          </div>
          <AgentCards />
        </div>
      </section>

      {/* 8 — Integrations */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <Reveal>
              <p className="eyebrow">Integrations</p>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                Plays well with everything you use.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                NOVA reads and writes through 80+ native integrations, with
                permissions inherited from the tools themselves.
              </p>
            </Reveal>
          </div>

          <div className={h.intGrid}>
            {integrations.map((tool, i) => {
              const BrandIcon = brandIcons[tool.id];
              return (
                <Reveal key={tool.id} delay={(i % 4) * 60}>
                  <div className={m.intTile}>
                    <div className={m.intIcon}>
                      <BrandIcon size={19} />
                    </div>
                    <div>
                      <div className={m.intName}>{tool.name}</div>
                      <div className={m.intCat}>{tool.category}</div>
                    </div>
                    <p className={m.intDesc}>{tool.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className={h.intFoot}>
              <span className="body-s">Plus 72 more, and a full API.</span>
              <Link href="/integrations" className="link-arrow">
                Browse all integrations <IconChevronRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 — Analytics */}
      <section className={`section ${h.band}`}>
        <div className={`container ${h.split} ${h.splitReverse}`}>
          <Reveal className={h.splitMedia}>
            <div className={h.analyticsPanel}>
              <div className={h.analyticsHead}>
                <div className={h.analyticsTitle}>Smart Analytics</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--bg)" }}>30d</span>
                  <span className="chip">90d</span>
                </div>
              </div>
              <div className={h.analyticsBody}>
                <div className={h.analyticsKpis}>
                  <div className={h.aKpi}>
                    <b><CountUp value="341" /></b>
                    <span>Hours saved</span>
                  </div>
                  <div className={h.aKpi}>
                    <b><CountUp value="3,621" /></b>
                    <span>Tasks automated</span>
                  </div>
                  <div className={h.aKpi}>
                    <b><CountUp value="96.2%" /></b>
                    <span>Approval rate</span>
                  </div>
                </div>
                <AreaChart
                  data={[188, 212, 204, 236, 252, 244, 272, 289, 281, 305, 319, 341]}
                  labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                  height={170}
                />
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 18, marginTop: 6 }}>
                  <Donut
                    data={[
                      { label: "Support resolution", value: 42 },
                      { label: "Research briefs", value: 21 },
                      { label: "CRM hygiene", value: 18 },
                      { label: "Reporting", value: 12 },
                      { label: "Other", value: 7 },
                    ]}
                    centerValue="42%"
                    centerLabel="Support"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className={h.splitCopy}>
            <p className="eyebrow">Smart analytics</p>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Prove the value. Don&rsquo;t assert it.
            </h2>
            <p className="lead">
              Every hour an agent saves is measured against real baselines —
              and every number is one click from the runs behind it.
            </p>
            <div className={h.statRows}>
              <div className={h.statRow}>
                <span className={h.statBig}><CountUp value="41" /> hrs</span>
                <span className={h.statDesc}>Average saved per seat, per month</span>
              </div>
              <div className={h.statRow}>
                <span className={h.statBig}><CountUp value="98.2%" /></span>
                <span className={h.statDesc}>Tasks completed without intervention</span>
              </div>
              <div className={h.statRow}>
                <span className={h.statBig}><CountUp value="4.1M" /></span>
                <span className={h.statDesc}>Tasks automated by NOVA teams each month</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal blur>
            <div className={h.quoteHero}>
              <p className="eyebrow" style={{ marginBottom: 28 }}>What teams say</p>
              <blockquote className={h.bigQuote}>
                &ldquo;NOVA quietly removed about a third of our operational
                workload in the first quarter. The team noticed the silence
                more than the software.&rdquo;
              </blockquote>
              <div className={h.quoteAttribution}>
                <div className={h.av}>EM</div>
                <div className={h.quoteWho}>
                  <div className={h.quoteName}>Elena Marsh</div>
                  <div className={h.quoteRole}>VP of Operations, Vantage</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className={h.quoteGrid}>
            <div className={h.quoteGapCol}>
              {testimonials.slice(1, 3).map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <figure className={h.quoteCard}>
                    <blockquote className={h.quoteText}>&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className={h.quoteFoot}>
                      <div className={`${h.av} ${h.avSm} ${h.avSoft}`}>{t.initials}</div>
                      <div>
                        <div className={h.quoteName}>{t.name}</div>
                        <div className={h.quoteRole}>{t.role}, {t.company}</div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className={h.quoteGapCol}>
              {testimonials.slice(3, 5).map((t, i) => (
                <Reveal key={t.name} delay={i * 80 + 60}>
                  <figure className={h.quoteCard}>
                    <blockquote className={h.quoteText}>&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className={h.quoteFoot}>
                      <div className={`${h.av} ${h.avSm} ${h.avSoft}`}>{t.initials}</div>
                      <div>
                        <div className={h.quoteName}>{t.name}</div>
                        <div className={h.quoteRole}>{t.role}, {t.company}</div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11 — Pricing */}
      <section className={`section ${h.band}`} id="pricing">
        <div className="container">
          <div className="section-header center">
            <Reveal>
              <p className="eyebrow">Pricing</p>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                Starts free. Scales honestly.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Pay for outcomes, not seats you don&rsquo;t use. Every plan
                ships with the full agent roster.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <Pricing />
          </Reveal>
        </div>
      </section>

      {/* 12 — FAQ */}
      <section className="section" id="faq">
        <div className={`container ${h.faqSplit}`}>
          <Reveal className={h.faqSide}>
            <p className="eyebrow">FAQ</p>
            <h2 className="h-2" style={{ marginTop: 16 }}>
              Answers, without the runaround.
            </h2>
            <p className="lead" style={{ fontSize: "1.06rem" }}>
              Everything teams usually ask before they trust agents with real
              work. Something else on your mind?
            </p>
            <Link href="/contact" className={`link-arrow ${h.splitCta}`}>
              Talk to our team <IconChevronRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* 13 — Final CTA */}
      <section className={h.ctaSection}>
        <div className="container">
          <Reveal>
            <div className={h.ctaPanel}>
              <p className={`eyebrow ${h.ctaEyebrow}`}>Start today</p>
              <h2 className={`h-1 ${h.ctaTitle}`}>
                Automate the work that slows you down.
              </h2>
              <p className={h.ctaSub}>
                Deploy your first agent in minutes. Free up the hours your team
                didn&rsquo;t realize it was losing.
              </p>
              <div className={h.ctaBtns}>
                <Link href="/signup" className={`btn btn-lg ${h.ctaBtnLight}`}>
                  Start building free
                </Link>
                <Link href="/pricing" className={`btn btn-lg ${h.ctaBtnGhost}`}>
                  Compare plans
                </Link>
              </div>
              <p className={h.ctaNote}>Free plan &middot; No credit card required &middot; Cancel anytime</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
