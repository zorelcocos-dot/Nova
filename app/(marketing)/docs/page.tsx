import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Getting started, core concepts, API reference, and security — everything you need to run NOVA in production.",
};

const nav = [
  {
    title: "Start",
    links: [
      { label: "Introduction", href: "#introduction" },
      { label: "Quickstart", href: "#quickstart" },
      { label: "Core concepts", href: "#concepts" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Agents", href: "#agents" },
      { label: "Automations", href: "#automations" },
      { label: "Analytics", href: "#analytics" },
    ],
  },
  {
    title: "Reference",
    links: [
      { label: "API reference", href: "#api" },
      { label: "Event model", href: "#events" },
      { label: "Security", href: "#security" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

export default function DocsPage() {
  return (
    <section className={s.pageHero} style={{ paddingBottom: 96 }}>
      <div className="container">
        <div className={s.docLayout}>
          {/* Sidebar */}
          <nav className={s.docNav} aria-label="Documentation">
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

          {/* Content */}
          <div className={s.docContent}>
            <Reveal>
              <div className={s.docSection} id="introduction">
                <p className="eyebrow">Documentation</p>
                <h1 className="h-1" style={{ marginTop: 14 }}>Getting started with NOVA</h1>
                <p>
                  NOVA is the AI productivity platform for teams: agents that
                  own categories of work, automations that run them, and
                  analytics that prove the result. This guide takes you from
                  signup to a running production setup in about ten minutes.
                </p>
              </div>
            </Reveal>

            <div className={s.docSection} id="quickstart">
              <h2 className="h-2">Quickstart</h2>
              <p>
                Everything below is also available in the app&rsquo;s onboarding
                checklist. If you prefer the CLI or API, skip to the snippets —
                they do exactly the same things.
              </p>
              <pre className={s.codeBlock}>{`# 1. Create a workspace
open https://nova.build/signup

# 2. Connect your first tool (example: Slack)
#    Settings → Integrations → Slack → Connect

# 3. Deploy your first agent
nova agents deploy support \\
  --sources zendesk,intercom \\
  --mode draft-only

# 4. Watch it work
nova agents tail support --follow`}</pre>
              <ul className={s.docList}>
                <li><b>Connect in read-only first.</b> Agents learn your conventions without touching anything.</li>
                <li><b>Start with draft-only mode.</b> Humans approve everything until trust is earned — usually a week.</li>
                <li><b>Scope narrowly.</b> One agent, one queue. Expand when the approval rate settles above 95%.</li>
              </ul>
            </div>

            <div className={s.docSection} id="concepts">
              <h2 className="h-2">Core concepts</h2>
              <p>Four nouns explain almost everything in NOVA:</p>
              <ul className={s.docList}>
                <li><b>Agent</b> — a model + tools + permissions + a job description. Owns outcomes, not prompts.</li>
                <li><b>Task</b> — one unit of completed work. The unit we bill on and measure ROI against.</li>
                <li><b>Workflow</b> — trigger + conditions + actions, compiled from plain language or drawn on canvas.</li>
                <li><b>Approval</b> — a human decision point, routed by impact threshold and role.</li>
              </ul>
            </div>

            <div className={s.docSection} id="agents">
              <h2 className="h-2">Agents</h2>
              <p>
                Research, Sales, Support, and Data agents ship with every plan.
                Each has an explicit permission scope per tool —
                <b> read-only</b>, <b>draft-only</b>, or <b>act</b> — minted as
                short-lived capability tokens per action. Nothing is ambient,
                everything is logged.
              </p>
              <h3 className="h-4">Escalation behavior</h3>
              <p>
                Below an agent&rsquo;s confidence threshold, or above an action&rsquo;s
                impact threshold, the agent escalates: it bundles context,
                a recommended action, and its own reasoning into the
                human-in-the-loop queue. Agents never guess at high stakes.
              </p>
            </div>

            <div className={s.docSection} id="automations">
              <h2 className="h-2">Automations</h2>
              <p>
                Workflows compile to deterministic steps you can inspect,
                version, and roll back. Loops require explicit exit
                conditions; every step previews against live data before going
                live. Schedules are timezone-correct, including the hard ones.
              </p>
              <pre className={s.codeBlock}>{`trigger:  contact.created(hubspot)
if:       contact.lifecycle in ["lead", "mql"]
then:
  - data.enrich(contact)
  - sales.draft_sequence(contact, template="first-touch")
  - approvals.require(role="account-owner")
notify:   #growth`}</pre>
            </div>

            <div className={s.docSection} id="analytics">
              <h2 className="h-2">Analytics</h2>
              <p>
                Hours saved is measured per workflow against rolling baselines
                with confidence intervals. Approval rate, cost per task, and
                time-to-value are available per agent, per team, and per
                workspace — exportable as CSV or via the API.
              </p>
            </div>

            <div className={s.docSection} id="api">
              <h2 className="h-2">API reference</h2>
              <p>
                REST, JSON, cursor pagination, idempotency keys everywhere.
                Base URL: <span className="mono">https://api.nova.build/v1</span>
              </p>
              <pre className={s.codeBlock}>{`# Authenticate with a workspace-scoped key
Authorization: Bearer nvk_...

POST   /tasks              create a task for an agent
GET    /tasks/:id          task status, output, and audit refs
GET    /agents             list agents and their scopes
POST   /workflows/:id/run  trigger a workflow run manually
GET    /analytics/hours    hours saved, per workflow, with CI
POST   /webhooks           subscribe to the event stream`}</pre>
              <p>
                Rate limits are 600 requests/minute per key, with generous
                burst allowances. Errors return RFC 9457 problem documents.
              </p>
            </div>

            <div className={s.docSection} id="events">
              <h2 className="h-2">The event model</h2>
              <p>
                Every provider normalizes into one envelope:{" "}
                <span className="mono">resource</span>,{" "}
                <span className="mono">operation</span>,{" "}
                <span className="mono">actor</span>,{" "}
                <span className="mono">timestamp</span>,{" "}
                <span className="mono">payload</span>, and a provider cursor.
                Webhooks are treated as hints; cursor-window polls are the
                source of truth. Median event-to-trigger latency is 1.4
                seconds, and duplicates are impossible by construction.
              </p>
            </div>

            <div className={s.docSection} id="security">
              <h2 className="h-2">Security</h2>
              <ul className={s.docList}>
                <li>SOC 2 Type II with continuous control monitoring.</li>
                <li>AES-256 at rest, TLS 1.3 in transit, per-workspace envelope keys.</li>
                <li>SSO/SAML and SCIM on Scale; 2FA everywhere.</li>
                <li>OAuth scope changes force explicit re-consent — no silent widening.</li>
                <li>Immutable, sealed audit events for every agent decision.</li>
              </ul>
            </div>

            <div className={s.docSection} id="privacy">
              <h2 className="h-2">Privacy</h2>
              <p>
                Your data is never used to train models — contractually,
                technically, and architecturally. Workspaces are isolated;
                data is exportable and deletable on demand. We process data
                under a standard DPA with EU SCCs, and publish a subprocessor
                list we actively minimize. The full policy lives on the{" "}
                <Link href="/privacy" style={{ color: "var(--accent)" }}>
                  privacy page
                </Link>
                .
              </p>
            </div>

            <div className={s.docSection} id="terms" style={{ borderBottom: "none" }}>
              <h2 className="h-2">Terms</h2>
              <p>
                NOVA is provided as a hosted service under a modern, readable
                MSA. You own your workspace data and the outputs your agents
                produce for you; we own the platform. Fair-use applies to the
                free tier; uptime commitments and remedies are spelled out in
                the Scale SLA. Read the full text on the{" "}
                <Link href="/terms" style={{ color: "var(--accent)" }}>
                  terms page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
