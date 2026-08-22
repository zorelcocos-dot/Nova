import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Pricing from "@/components/site/Pricing";
import Accordion from "@/components/ui/Accordion";
import { IconCheck } from "@/components/icons";
import { plans, comparisonGroups } from "@/lib/data";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing. Start free, pay for outcomes as you scale. Pro from $29/month, save 20% yearly.",
};

const pricingFaqs = [
  {
    q: "What counts as one AI task?",
    a: "One unit of completed work — a research brief, a drafted reply, an enriched record, a summarized thread. We count outcomes, not tokens or API calls, so your bill maps to value.",
  },
  {
    q: "What happens if I go over my monthly tasks?",
    a: "Nothing breaks. Agents keep working and we notify you at 80% and 100%. You can set a hard cap, enable per-task overflow pricing, or upgrade — whichever fits.",
  },
  {
    q: "Is the 14-day Pro trial really free?",
    a: "Yes — no credit card required. The full Pro feature set, 2,000 trial tasks, and our team's help getting your first workflow live. It downgrades gracefully to Starter if you decide not to continue.",
  },
  {
    q: "Can I switch between monthly and yearly?",
    a: "Anytime, from billing settings. Changes are prorated automatically, and yearly plans carry a 20% discount on every seat.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes — 50% for registered nonprofits and educational institutions, and free Pro for open-source maintainers. Write to us from the contact page.",
  },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className={s.cellYes}>
        <IconCheck size={15} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  if (v === false)
    return (
      <span className={s.cellNo}>
        <span aria-hidden>—</span>
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <section className={`${s.pageHero} ${s.pageHeroCenter}`}>
        <div className="container">
          <div className={s.pageHeroInner}>
                        <p className="eyebrow">Pricing</p>
            <h1 className="h-1">Pricing that stays out of the way.</h1>
            <p className="lead">
              Start free. Pay for outcomes as you scale. No seat traps, no
              surprise invoices, no call required to find out the price.
            </p>
          
          </div>
        </div>
      </section>

      <div className="container">
        <Reveal>
          <Pricing />
        </Reveal>
      </div>

      {/* Comparison table */}
      <section className="section-s" style={{ paddingTop: 80 }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <Reveal>
            <h2 className="h-2" style={{ textAlign: "center", marginBottom: 44 }}>
              Compare plans in detail
            </h2>
          </Reveal>
          <Reveal>
            <div className={s.tableWrap}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "34%" }}>Feature</th>
                    {plans.map((p) => (
                      <th key={p.id} className={s.planHead}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonGroups.map((g) => (
                    <Fragment key={g.title}>
                      <tr className={s.tableGroupRow}>
                        <td colSpan={4}>{g.title}</td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr key={r.feature}>
                          <td style={{ color: "var(--ink-2)" }}>{r.feature}</td>
                          <td><Cell v={r.starter} /></td>
                          <td style={{ fontWeight: 500 }}><Cell v={r.pro} /></td>
                          <td><Cell v={r.scale} /></td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="caption" style={{ textAlign: "center", marginTop: 18 }}>
            All prices in USD. Tasks count completed work, not API calls.
          </p>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className={`section-s ${s.band}`}>
        <div className="container" style={{ maxWidth: 780 }}>
          <Reveal>
            <h2 className="h-2" style={{ textAlign: "center", marginBottom: 40 }}>
              Pricing questions
            </h2>
          </Reveal>
          <Reveal>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xl)",
                padding: "6px 28px",
              }}
            >
              <Accordion items={pricingFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaBand}>
        <div className="container">
          <Reveal>
            <h2 className="h-1">Start free. Upgrade when it&rsquo;s obvious.</h2>
            <p className="lead">
              Your first 1,000 tasks every month are on us — forever.
            </p>
            <div className={s.heroCtas}>
              <Link href="/signup" className="btn btn-primary btn-lg">
                Start building free
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                Talk to sales
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
