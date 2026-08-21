import type { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of NOVA — written to be read, not to hide behind. Effective August 22, 2026.",
};

const nav = [
  {
    title: "Terms",
    links: [
      { label: "1. Acceptance", href: "#acceptance" },
      { label: "2. The service", href: "#service" },
      { label: "3. Your content", href: "#content" },
      { label: "4. Acceptable use", href: "#use" },
      { label: "5. Fair use & limits", href: "#fair-use" },
      { label: "6. Fees & billing", href: "#fees" },
      { label: "7. Reliability & SLA", href: "#sla" },
      { label: "8. Term & termination", href: "#termination" },
      { label: "9. Disclaimers", href: "#disclaimers" },
      { label: "10. Liability", href: "#liability" },
      { label: "11. Changes", href: "#changes" },
      { label: "12. Contact", href: "#contact" },
    ],
  },
];

export default function TermsPage() {
  return (
    <section className={s.pageHero} style={{ paddingBottom: 96 }}>
      <div className="container">
        <div className={s.docLayout}>
          <nav className={s.docNav} aria-label="Terms of Service">
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
            <h1 className="h-1">Terms of Service</h1>
            <p className={`lead ${s.docLead}`}>
              Plain-English terms, effective August 22, 2026. They cover the
              basics everyone expects — who owns what, what we each promise,
              and what happens when things go wrong — without a single
              &ldquo;notwithstanding the foregoing&rdquo;.
            </p>

            <div className={s.docSection} id="acceptance">
              <h2 className="h-2">1. Acceptance</h2>
              <p>
                These terms are a contract between you and NOVA Labs, Inc.
                (&ldquo;NOVA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
                creating a workspace, clicking a button labeled
                &ldquo;agree&rdquo;, or simply using the service, you accept
                them. If you sign up on behalf of a company, you confirm you
                have the authority to bind that company, and
                &ldquo;you&rdquo; means the company from then on.
              </p>
            </div>

            <div className={s.docSection} id="service">
              <h2 className="h-2">2. The service</h2>
              <p>
                NOVA is a hosted platform that plans, executes, and reports on
                work using AI agents, workflow automation, and integrations
                with tools you connect. We provide the platform as it exists
                and evolve it continuously — features may change, and the{" "}
                <Link href="/changelog" className={s.docLink}>
                  changelog
                </Link>{" "}
                always says what shipped and when. You need an account and a
                workspace to use it; you are responsible for activity under
                your credentials and for keeping them secure.
              </p>
            </div>

            <div className={s.docSection} id="content">
              <h2 className="h-2">3. Your content</h2>
              <p>
                You own your workspace data — inputs, files, configurations,
                and the outputs your agents produce for you. Fully, plainly,
                and without royalties from our side. We claim no license to
                use your content except to operate the service for you:
                processing instructions, running automations, and displaying
                results.
              </p>
              <ul className={s.docList}>
                <li>Your content is never used to train our models or anyone else&rsquo;s.</li>
                <li>You can export everything, in open formats, at any time.</li>
                <li>Deleting data deletes it — subject only to backups that age out within 30 days and records we must keep for security or legal reasons.</li>
                <li>We may add a generic integration you request; we will never impersonate your workspace outside it.</li>
              </ul>
              <p>
                You give us the rights needed to store and process your
                content, and you confirm you have the rights to send it to us
                in the first place.
              </p>
            </div>

            <div className={s.docSection} id="use">
              <h2 className="h-2">4. Acceptable use</h2>
              <p>
                The short version: use NOVA for work you have the right to
                automate, and don&rsquo;t ruin it for everyone else. More
                specifically, don&rsquo;t:
              </p>
              <ul className={s.docList}>
                <li>Break laws, or infringe patents, copyrights, trademarks, or trade secrets.</li>
                <li>Deliver spam, malware, phishing, or harassment through the platform.</li>
                <li>Connect tools or data you don&rsquo;t have permission to connect.</li>
                <li>Scrape, reverse-engineer, or resell the platform itself, or probe other customers&rsquo; workspaces.</li>
                <li>Circumvent rate limits, seat requirements, or safety controls.</li>
              </ul>
              <p>
                We may suspend conduct that risks the platform or other
                customers, with notice whenever practical. Disputes about
                suspensions can always reach a human — see{" "}
                <Link href="#contact" className={s.docLink}>
                  §12
                </Link>
                .
              </p>
            </div>

            <div className={s.docSection} id="fair-use">
              <h2 className="h-2">5. Fair use &amp; limits</h2>
              <p>
                Paid plans include generous task, run, and API quotas — your
                dashboard shows exactly where you stand. Sustained automated
                abuse of the free tier (farming seats, scripted re-signups,
                load that degrades shared infrastructure) may be throttled or
                capped. We&rsquo;ll tell you before we do, except in
                emergencies.
              </p>
            </div>

            <div className={s.docSection} id="fees">
              <h2 className="h-2">6. Fees &amp; billing</h2>
              <ul className={s.docList}>
                <li>Prices are in USD, per seat, billed monthly or yearly as you choose. Yearly billing is discounted — what you see on the pricing page is what you pay.</li>
                <li>Fees are charged in advance, are non-refundable for the current period, and renew automatically until cancelled.</li>
                <li>You can cancel anytime; the workspace stays available until the end of the paid period.</li>
                <li>Usage beyond plan quotas (tasks, runs, API calls) is metered and billed in arrears at the published rates.</li>
                <li>Taxes are calculated at checkout where applicable. If a charge looks wrong, tell us within 60 days and we&rsquo;ll work it out.</li>
              </ul>
            </div>

            <div className={s.docSection} id="sla">
              <h2 className="h-2">7. Reliability &amp; SLA</h2>
              <p>
                We target 99.9% monthly availability for the Scale plan, with
                service credits as the remedy when we miss it — the exact
                mechanics live in the Scale service-level agreement appended
                to your order form. Planned maintenance is announced at least
                72 hours ahead. Status incidents are published in real time on
                the status page linked from the footer.
              </p>
            </div>

            <div className={s.docSection} id="termination">
              <h2 className="h-2">8. Term &amp; termination</h2>
              <p>
                Either side can end this agreement at any time, for any
                reason: you by cancelling or deleting the workspace, we by
                30 days&rsquo; notice (or immediately for unpaid fees or
                serious violations of §4). On termination, your data stays
                exportable for 30 days, then it is deleted as described in
                the{" "}
                <Link href="/privacy" className={s.docLink}>
                  Privacy Policy
                </Link>
                . Sections that should survive termination — ownership,
                disclaimers, liability, governing law — do.
              </p>
            </div>

            <div className={s.docSection} id="disclaimers">
              <h2 className="h-2">9. Disclaimers</h2>
              <p>
                The service is provided &ldquo;as is&rdquo; during previews and
                betas, and with reasonable skill and care in production. AI
                output can be wrong, and agents can surprise you — review
                high-stakes actions, use approvals where they matter, and
                treat generated content as a draft until a human has checked
                it. Nothing in these terms is advice, and integrations carry
                the third parties&rsquo; own terms alongside ours.
              </p>
            </div>

            <div className={s.docSection} id="liability">
              <h2 className="h-2">10. Liability</h2>
              <p>
                To the maximum extent the law allows: (a) neither side is
                liable for indirect, incidental, or consequential damages; and
                (b) each side&rsquo;s total liability is capped at the greater
                of $100 or the fees you paid us in the 12 months before the
                claim. The cap doesn&rsquo;t apply to your infringement of our
                intellectual property, to amounts you owe us, or to
                liabilities the law says can&rsquo;t be capped (like gross
                negligence or willful misconduct).
              </p>
            </div>

            <div className={s.docSection} id="changes">
              <h2 className="h-2">11. Changes</h2>
              <p>
                We may update these terms as the product changes. Material
                changes get 30 days&rsquo; notice by email and in-product
                banner before they take effect; continuing to use NOVA after
                that means you accept the update. The current version always
                lives here, with its effective date up top.
              </p>
            </div>

            <div className={s.docSection} id="contact" style={{ borderBottom: "none" }}>
              <h2 className="h-2">12. Contact</h2>
              <p>
                NOVA Labs, Inc., 2150 Shattuck Ave, Berkeley, CA 94704, USA.
                Legal questions, notices, and DPA requests:{" "}
                <Link href="mailto:legal@nova.build" className={s.docLink}>
                  legal@nova.build
                </Link>
                . Everything else: the{" "}
                <Link href="/contact" className={s.docLink}>
                  contact page
                </Link>{" "}
                — a real person replies within one business day.
              </p>
              <p className={s.docNext}>
                <Link href="/privacy" className="link-arrow">
                  Read the Privacy Policy <IconChevronRight size={15} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
