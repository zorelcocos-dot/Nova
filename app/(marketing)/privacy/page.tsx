import type { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What NOVA collects, why, how long we keep it, and the controls you have. Written in plain English — effective August 22, 2026.",
};

const nav = [
  {
    title: "Privacy",
    links: [
      { label: "1. The pledge", href: "#pledge" },
      { label: "2. Data we process", href: "#data" },
      { label: "3. Why we process it", href: "#purposes" },
      { label: "4. AI & your data", href: "#ai" },
      { label: "5. Sharing", href: "#sharing" },
      { label: "6. Subprocessors", href: "#subprocessors" },
      { label: "7. Retention & deletion", href: "#retention" },
      { label: "8. Security", href: "#security" },
      { label: "9. Transfers", href: "#transfers" },
      { label: "10. Your rights", href: "#rights" },
      { label: "11. Cookies", href: "#cookies" },
      { label: "12. Changes", href: "#changes" },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className={s.pageHero} style={{ paddingBottom: 96 }}>
      <div className="container">
        <div className={s.docLayout}>
          <nav className={s.docNav} aria-label="Privacy Policy">
            {nav.map((group) => (
              <div key={group.title}>
                <div className={s.docNavTitle}>{group.title}</div>
                {group.links.map((l) => (
                  <Link key={l.href} href={l.href} className={s.docNavLink}>
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className={s.docContent}>
            <p className="eyebrow">Legal</p>
            <h1 className="h-1">Privacy Policy</h1>
            <p className={`lead ${s.docLead}`}>
              What we collect, why we collect it, how long we keep it, and the
              controls you have. Effective August 22, 2026. If anything here
              is unclear, that&rsquo;s our fault — tell us and we&rsquo;ll fix
              the wording.
            </p>

            <div className={s.docSection} id="pledge">
              <h2 className="h-2">1. The pledge</h2>
              <ul className={s.docList}>
                <li>Your workspace data is never used to train AI models — ours or anyone else&rsquo;s. Contractually, technically, and architecturally.</li>
                <li>We sell subscriptions, not data. No advertising, no data brokers, no &ldquo;analytics partners&rdquo; getting your content.</li>
                <li>Everything is exportable and deletable, on demand, by you.</li>
                <li>Our subprocessor list is public, short, and shrinking.</li>
              </ul>
            </div>

            <div className={s.docSection} id="data">
              <h2 className="h-2">2. Data we process</h2>
              <p>
                <strong>Account data</strong> — name, work email, workspace
                name, role, and authentication details. If you sign up with
                Google or GitHub SSO, we receive your profile identifier and
                email from that provider.
              </p>
              <p>
                <strong>Workspace data</strong> — everything you and your team
                put into NOVA: connected-tool content, instructions to agents,
                workflow configurations, files, and the outputs agents
                produce. This is processed to run the service for you and for
                no other purpose.
              </p>
              <p>
                <strong>Usage data</strong> — pages viewed, features used,
                task and run counts, latency, crash reports, and device and
                browser basics. This tells us what&rsquo;s broken and what to
                build next.
              </p>
              <p>
                <strong>Billing data</strong> — plan, invoices, and payment
                status. Card numbers never touch our servers; our payment
                processor handles them.
              </p>
              <p>
                We don&rsquo;t collect special-category data, and we
                don&rsquo;t want it — please don&rsquo;t put sensitive
                personal information into agent instructions.
              </p>
            </div>

            <div className={s.docSection} id="purposes">
              <h2 className="h-2">3. Why we process it</h2>
              <ul className={s.docList}>
                <li><strong>To provide the service</strong> — running agents, automations, integrations, and the dashboard. (Contract)</li>
                <li><strong>To keep it working</strong> — debugging, abuse and fraud prevention, uptime monitoring. (Legitimate interests)</li>
                <li><strong>To improve it</strong> — aggregated, de-identified product analytics. (Legitimate interests)</li>
                <li><strong>To bill for it</strong> — subscriptions, metered usage, tax. (Contract, legal obligation)</li>
                <li><strong>To tell you about it</strong> — service notices you need; product news you can switch off in one click. (Contract, legitimate interests)</li>
                <li><strong>To comply with the law</strong> — where we&rsquo;re legally required. (Legal obligation)</li>
              </ul>
            </div>

            <div className={s.docSection} id="ai">
              <h2 className="h-2">4. AI &amp; your data</h2>
              <p>
                NOVA uses large language models to plan and execute work.
                Prompts and workspace content are sent to model providers
                strictly to complete your request, under zero-retention or
                no-training agreements, and results come back to your
                workspace only. Prompts and outputs are logged in your
                workspace audit trail — visible to you, not used by us for
                anything else. Model providers are listed as subprocessors
                below.
              </p>
            </div>

            <div className={s.docSection} id="sharing">
              <h2 className="h-2">5. Sharing</h2>
              <p>
                We share data only with: subprocessors who run the platform
                for us (below); authorities, when the law requires it; and a
                successor in an acquisition or merger — bound by this policy
                until you&rsquo;re notified and given a choice. We receive
                requests for your data, we check them carefully, and we push
                back on fishing expeditions, notifying you when we legally
                can.
              </p>
            </div>

            <div className={s.docSection} id="subprocessors">
              <h2 className="h-2">6. Subprocessors</h2>
              <ul className={s.docList}>
                <li><strong>Cloud &amp; storage</strong> — Amazon Web Services (US, EU regions)</li>
                <li><strong>AI models</strong> — Anthropic and OpenAI (zero-retention endpoints)</li>
                <li><strong>Payments</strong> — Stripe</li>
                <li><strong>Transactional email</strong> — Resend</li>
                <li><strong>Product analytics</strong> — PostHog (self-hostable, EU instance)</li>
              </ul>
              <p>
                The current list with locations and purposes is maintained at{" "}
                <Link href="/docs#security" className={s.docLink}>
                  docs &rarr; security
                </Link>
                , and changes are announced 30 days ahead on the changelog.
              </p>
            </div>

            <div className={s.docSection} id="retention">
              <h2 className="h-2">7. Retention &amp; deletion</h2>
              <p>
                Workspace data lives while your account does. Delete an item
                and it&rsquo;s removed from production immediately and from
                backups within 30 days. Delete your workspace and everything
                follows the same path, except records we must keep for
                billing, security, or legal defense — those are minimal and
                age out on statutory schedules. Free-tier accounts with no
                activity for 12 months are archived, then deleted, with email
                notice first.
              </p>
            </div>

            <div className={s.docSection} id="security">
              <h2 className="h-2">8. Security</h2>
              <ul className={s.docList}>
                <li>SOC 2 Type II, continuously monitored controls.</li>
                <li>AES-256 at rest, TLS 1.3 in transit, per-workspace envelope encryption keys.</li>
                <li>SSO/SAML and SCIM on Scale; TOTP two-factor everywhere.</li>
                <li>Least-privilege access for staff, fully audited; nobody browses customer workspaces.</li>
                <li>Immutable, sealed audit events for every agent decision and administrative action.</li>
              </ul>
              <p>
                If we ever breach these commitments in a way that risks your
                data, we&rsquo;ll tell you within 72 hours — what happened,
                what it means, what we&rsquo;re doing.
              </p>
            </div>

            <div className={s.docSection} id="transfers">
              <h2 className="h-2">9. Transfers</h2>
              <p>
                NOVA is operated from the United States with EU data
                residency available on Scale. Where data crosses borders, it
                travels under EU Standard Contractual Clauses and the UK Addendum,
                together with the technical measures described in §8. EU
                customers also receive our DPA with the SCCs annexed — ask{" "}
                <Link href="mailto:legal@nova.build" className={s.docLink}>
                  legal@nova.build
                </Link>
                .
              </p>
            </div>

            <div className={s.docSection} id="rights">
              <h2 className="h-2">10. Your rights</h2>
              <p>
                Wherever you are, you can: access your data (it&rsquo;s
                exportable in-app); correct it; delete it; object to
                processing; get a machine-readable copy; and withdraw consent
                for optional processing. EU/UK users get the full GDPR and UK
                GDPR rights, and Californians get CCPA/CPRA rights including
                knowing what categories we process (see §2) and that we never
                &ldquo;sell&rdquo; or &ldquo;share&rdquo; personal information
                as those terms are defined.
              </p>
              <p>
                Exercise any right from Settings, or write to{" "}
                <Link href="mailto:privacy@nova.build" className={s.docLink}>
                  privacy@nova.build
                </Link>{" "}
                — we answer within 30 days, usually in a day or two. You also
                have the right to complain to your local supervisory
                authority; we&rsquo;d rather you told us first so we can fix
                it.
              </p>
            </div>

            <div className={s.docSection} id="cookies">
              <h2 className="h-2">11. Cookies</h2>
              <p>
                Strictly necessary cookies keep you signed in and your theme
                choice saved. That&rsquo;s the default. Optional analytics
                cookies (PostHog, de-identified) are off until you enable
                them in Settings &rarr; Appearance, and toggling them off
                deletes their cookies on the spot. No advertising cookies,
                ever.
              </p>
            </div>

            <div className={s.docSection} id="changes" style={{ borderBottom: "none" }}>
              <h2 className="h-2">12. Changes</h2>
              <p>
                If this policy changes materially, we&rsquo;ll email account
                owners and banner the dashboard 30 days before it takes
                effect. The live version always lives here. Controller: NOVA
                Labs, Inc. Privacy questions and requests:{" "}
                <Link href="mailto:privacy@nova.build" className={s.docLink}>
                  privacy@nova.build
                </Link>
                .
              </p>
              <p className={s.docNext}>
                <Link href="/terms" className="link-arrow">
                  Read the Terms of Service <IconChevronRight size={15} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
