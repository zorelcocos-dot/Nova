import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "NOVA was founded on a simple idea: knowledge work should be spent on judgment, not logistics. Meet the team building the calm, capable alternative.",
};

const team = [
  { initials: "MS", name: "Mira Solberg", role: "Co-founder & CEO" },
  { initials: "PR", name: "Priya Raghavan", role: "VP of Engineering" },
  { initials: "IH", name: "Ingrid Halvorsen", role: "Design Lead" },
  { initials: "TF", name: "Tomás Ferreira", role: "Head of Research" },
  { initials: "KA", name: "Kenji Aoyama", role: "Head of Product" },
  { initials: "LN", name: "Laura Nwosu", role: "Head of Security" },
  { initials: "MB", name: "Marc Beaulieu", role: "Head of Sales" },
  { initials: "YW", name: "Yuki Watanabe", role: "Head of Customer Success" },
];

const values = [
  {
    t: "Craft over churn",
    d: "We ship slowly enough to be proud of everything we ship. A product you can feel was made by people who cared.",
  },
  {
    t: "Automation is a service",
    d: "Agents work for your team — visible, accountable, and interruptible. Never the other way around.",
  },
  {
    t: "Clarity is kindness",
    d: "In the product, in pricing, in incident reports. If a sentence needs a second read, we rewrite it.",
  },
  {
    t: "Calm by default",
    d: "Software should lower the room's blood pressure. We measure ourselves on what our users stop noticing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={`${s.pageHero} ${s.pageHeroCenter}`}>
        <div className="container">
          <div className={s.pageHeroInner} style={{ maxWidth: 860 }}>
                        <p className="eyebrow">About NOVA</p>
            <h1 className="h-1">
              Work is for judgment. Logistics are for machines.
            </h1>
            <p className="lead">
              We started NOVA because the average knowledge worker spends
              60% of the week on work about work. That felt less like a
              business opportunity and more like a bug.
            </p>
          
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container">
        <Reveal>
          <div className={s.statsGrid} style={{ paddingBottom: 72 }}>
            {[
              ["2022", "Founded in San Francisco", false],
              ["127", "People, 14 countries, one timezone bias (UTC±3)", true],
              ["4,000+", "Teams run their operations on NOVA", true],
              ["4.1M", "Tasks automated every month", true],
            ].map(([v, l, count]) => (
              <div key={l as string} className={s.statCell}>
                <b>{count ? <CountUp value={v as string} /> : v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Story */}
      <section className={`section-s ${s.band}`}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="h-2" style={{ marginTop: 16, marginBottom: 20 }}>
              From a support-queue hack to a platform.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-2)", letterSpacing: "-0.01em" }}>
              <p>
                NOVA began in 2022 as a script Mira wrote to survive her own
                support queue at a previous company — draft the answer, flag
                what she&rsquo;d hate it doing, log everything. The queue went
                from four days to four minutes. Colleagues noticed; the script
                accreted into a product.
              </p>
              <p>
                The lesson we kept: people didn&rsquo;t want an oracle, they
                wanted a junior colleague with perfect memory and no ego —
                one that asked before acting on anything that mattered. That
                principle, <b style={{ color: "var(--ink)", fontWeight: 500 }}>autonomy with an audit trail</b>, is
                still the spine of every feature we build.
              </p>
              <p>
                Today, NOVA runs the operational core of more than 4,000
                teams, from two-person studios to public companies. We&rsquo;re
                backed by investors who mostly told us to slow down, and we
                intend to keep taking that advice.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-s">
        <div className="container">
          <div className="section-header">
            <Reveal>
              <p className="eyebrow">How we work</p>
              <h2 className="h-2" style={{ marginTop: 16 }}>Four values, kept short.</h2>
            </Reveal>
          </div>
          <div className={s.grid4}>
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className={s.tileCard} style={{ height: "100%" }}>
                  <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.04em", color: "var(--ink-3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={s.tileTitle} style={{ marginTop: 14 }}>{v.t}</div>
                  <p className={s.tileSub}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section-s ${s.band}`}>
        <div className="container">
          <div className="section-header">
            <Reveal>
              <p className="eyebrow">The team</p>
              <h2 className="h-2" style={{ marginTop: 16 }}>
                Small, senior, and absurdly picky.
              </h2>
              <p className="lead">
                127 people. No growth-at-all-costs hiring sprees. Everyone here
                could work anywhere — they chose the queue.
              </p>
            </Reveal>
          </div>
          <div className={s.grid4}>
            {team.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 60}>
                <div className={s.personTile}>
                  <div className={s.personAv}>{p.initials}</div>
                  <div>
                    <div className={s.personName}>{p.name}</div>
                    <div className={s.personRole}>{p.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="caption" style={{ marginTop: 28, textAlign: "center" }}>
            Offices in San Francisco, Lisbon, and Tokyo — and 11 home offices we visit on off-sites.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaBand}>
        <div className="container">
          <Reveal>
            <h2 className="h-1">Come build the calm.</h2>
            <p className="lead">
              We hire slowly and deliberately. If this website&rsquo;s typography
              bothered or delighted you, we should talk.
            </p>
            <div className={s.heroCtas}>
              <Link href="/contact" className="btn btn-primary btn-lg">Get in touch</Link>
              <Link href="/blog" className="btn btn-secondary btn-lg">Read the journal</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
