/* ============================================================
   Blog posts — structured content for /blog and /blog/[slug]
   ============================================================ */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: { name: string; role: string; initials: string };
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "introducing-nova-ai-2",
    title: "Introducing NOVA AI 2.0: work that finishes itself",
    excerpt:
      "Today we're shipping agents that plan, execute, and report back — with the guardrails enterprises actually need.",
    category: "Announcement",
    date: "August 4, 2026",
    readingTime: "6 min read",
    author: { name: "Mira Solberg", role: "Co-founder & CEO", initials: "MS" },
    body: [
      {
        type: "p",
        text: "Two years ago we started NOVA with a simple observation: knowledge work is full of tasks that are necessary, well-defined, and quietly miserable. Status reports, ticket triage, CRM hygiene, meeting follow-ups — work that exists to keep the machine running rather than to move it forward.",
      },
      {
        type: "p",
        text: "NOVA AI 1.0 automated the mechanics. Version 2.0, shipping today, automates the judgment. The difference sounds subtle until you watch an agent decide that a refund request should go to Maya because it's from a churn-risk account, attach the sentiment summary, and leave a recommended action in her queue — all before she's had coffee.",
      },
      { type: "h2", text: "Agents, not chatbots" },
      {
        type: "p",
        text: "A chatbot waits to be asked. An agent owns a responsibility. In 2.0, each agent — Research, Sales, Support, and Data — is a standing capability with an explicit job description, tool permissions, and a track record you can inspect. You don't prompt them; you onboard them, like a colleague.",
      },
      {
        type: "list",
        items: [
          "Research Agent turns raw noise into decision-ready briefs on accounts, competitors, and markets.",
          "Sales Agent keeps pipeline data immaculate and drafts outreach that sounds like your best rep on a good day.",
          "Support Agent resolves tickets end to end and escalates with context instead of shrugging.",
          "Data Agent watches pipelines, reconciles drift, and answers business questions with charts, not SQL.",
        ],
      },
      { type: "h2", text: "Control is the feature" },
      {
        type: "p",
        text: "The least interesting question in AI is what models can do. The interesting question is what they should be allowed to do. Every action an agent takes runs through a permission scope you define — read-only, draft-only, or act — and anything above a confidence or impact threshold waits for human approval with full context attached.",
      },
      {
        type: "quote",
        text: "Autonomy without an audit trail is a demo. Autonomy with one is infrastructure.",
      },
      {
        type: "p",
        text: "Every decision is logged, replayable, and reversible. When something looks wrong, you can see exactly what the agent saw, what it decided, and why. This is what makes NOVA deployable inside companies with real security review processes — and why our 2.0 beta cohort expanded seat counts instead of churning.",
      },
      { type: "h2", text: "What customers did in the beta" },
      {
        type: "p",
        text: "Across 340 beta workspaces, agents completed 4.1 million tasks in 90 days and asked for help just 1.8% of the time. Median time-to-first-automated-task was nine minutes. The most common quote in feedback calls, unprompted: \"It feels like we hired ten people who never sleep and never complain.\"",
      },
      {
        type: "p",
        text: "NOVA AI 2.0 is available today on every plan, including Free. Deploy your first agent in the dashboard, read the announcement on the changelog, or just connect Slack and watch your Monday standup write itself.",
      },
    ],
  },
  {
    slug: "how-teams-reclaim-12-hours",
    title: "How teams reclaim 12 hours a week with AI agents",
    excerpt:
      "We measured where the time actually goes — and where it comes back when agents take over the repetitive core of knowledge work.",
    category: "Product",
    date: "July 21, 2026",
    readingTime: "8 min read",
    author: { name: "Tomás Ferreira", role: "Head of Research", initials: "TF" },
    body: [
      {
        type: "p",
        text: "When we tell people NOVA customers save an average of 12 hours per person per week, the skeptical follow-up is always the same: from where, exactly? So we pulled the instrumentation data from 1,800 workspaces and broke the recovered time into its components. The story is less magical than people hope and more mechanical than people fear — which is precisely why it works.",
      },
      { type: "h2", text: "Where the hours hide" },
      {
        type: "p",
        text: "Repetitive knowledge work clusters into five buckets: status reporting (2.9h/week), ticket triage and first response (2.7h), CRM and systems hygiene (2.2h), meeting transcription and follow-up (2.1h), and internal Q&A — the 'where is that doc' tax (2.3h). None of it is hard. All of it is constant.",
      },
      {
        type: "list",
        items: [
          "Status reporting: agents compile updates from the tools where work already happens, in the format each audience needs.",
          "Ticket triage: first response in under a minute, escalation with sentiment and a recommended action attached.",
          "Systems hygiene: deduped records, enriched contacts, closed loops — continuously, not quarterly.",
          "Meeting follow-up: decisions, owners, and deadlines extracted and filed where they'll actually be found.",
          "Internal Q&A: answers sourced from your workspace, with citations, delivered in Slack in seconds.",
        ],
      },
      { type: "h2", text: "The important part: it compounds" },
      {
        type: "p",
        text: "Week one savings come from automation. Month three savings come from coordination debt that never accrues. When the CRM is always clean, forecast meetings get shorter. When briefs always exist, prep meetings disappear. Teams reported a second-order dividend — roughly 30% on top of the raw hours — that only shows up after agents have been running long enough to change behavior.",
      },
      {
        type: "quote",
        text: "The first month, you save time. The third month, you forget the problem ever existed.",
        cite: "Elena Marsh, VP of Operations, Vantage",
      },
      {
        type: "p",
        text: "If you want the full methodology, the instrumented dataset and confidence intervals are published in this quarter's research note, linked from the Analytics docs. And if you want the 12 hours: the fastest path we've measured is deploying the Support Agent against your top three ticket categories first. Everything else follows.",
      },
    ],
  },
  {
    slug: "designing-the-workflow-builder",
    title: "Designing a workflow builder people don't fight",
    excerpt:
      "The third rewrite of our visual canvas taught us that power users want constraints, not freedom. Notes from the design process.",
    category: "Design",
    date: "June 30, 2026",
    readingTime: "7 min read",
    author: { name: "Ingrid Halvorsen", role: "Design Lead", initials: "IH" },
    body: [
      {
        type: "p",
        text: "Every workflow tool makes the same first impression: an empty canvas, infinite possibility, and a blinking cursor's worth of anxiety. Our first two versions were proud examples of the genre. Version three — shipped in June — works because we stopped asking 'what can users build?' and started asking 'what are they actually trying to say?'",
      },
      { type: "h2", text: "The sentence, not the box" },
      {
        type: "p",
        text: "Ninety percent of real workflows read like a sentence: when X happens, do Y, and if Z, also tell someone. So the builder now starts as a sentence — literally a row of mad-lib fields — and only unfolds into a canvas when the logic genuinely branches. The box-and-arrow view still exists, but it shows up when it's earning its pixels, not before.",
      },
      {
        type: "quote",
        text: "Visual programming fails when the picture becomes the point. The point is the outcome.",
      },
      { type: "h2", text: "Constraints users thank you for" },
      {
        type: "list",
        items: [
          "One trigger per workflow. Multi-trigger flows were the number one source of 'why didn't this run' tickets. Composition handles the rest.",
          "Guaranteed termination. Loops require a visible exit condition or the builder won't save — support volume from runaway loops dropped to zero.",
          "Every node previews with live data. If a step can't show a real preview, it isn't designed well enough to ship.",
          "Change history is the undo button that survives sessions. Every version is diffable and restorable.",
        ],
      },
      { type: "h2", text: "What we cut" },
      {
        type: "p",
        text: "Custom code nodes (replaced by a proper API and webhooks — code belongs in version control), minimaps (the builder's max zoom is now polite enough that you never get lost), and color-coding by node type (nobody could remember the legend; typography carries hierarchy better).",
      },
      {
        type: "p",
        text: "The builder's test: a new hire should ship a real automation before lunch on day one. Median time today is 22 minutes, and the most common first workflow is still 'clean my CRM,' which tells you everything about where knowledge work actually hurts.",
      },
    ],
  },
  {
    slug: "security-at-nova-soc2",
    title: "Security at NOVA: boring by design",
    excerpt:
      "SOC 2 Type II is table stakes. What matters is the architecture underneath — scoped permissions, immutable logs, and data that never trains models.",
    category: "Engineering",
    date: "June 9, 2026",
    readingTime: "9 min read",
    author: { name: "Priya Raghavan", role: "VP of Engineering", initials: "PR" },
    body: [
      {
        type: "p",
        text: "There's a genre of security blog post that reads like a compliance checklist cosplaying as a philosophy. This is not that post. This is a short tour of the actual architecture, because 'trust us' is not a control and your security team deserves better questions to ask us than the ones on the vendor questionnaire.",
      },
      { type: "h2", text: "Permission scopes, not vibes" },
      {
        type: "p",
        text: "Every agent and every workflow acts through a capability token scoped to an explicit tool, resource set, and action class (read, draft, act). Tokens are short-lived, single-audience, and minted per action. There is no ambient 'AI access' ambient privilege anywhere in the system — every action is attributable, scoped, and revocable without a deploy.",
      },
      { type: "h2", text: "The audit log is the product" },
      {
        type: "p",
        text: "Each agent decision produces an immutable event: inputs seen, tools called, confidence score, guardrail evaluations, and the human who approved it if one did. The log is append-only (backed by object-lock storage), queryable from your dashboard, and exportable in full. If you can't replay an incident in minutes, observability failed — so we test ours monthly, adversarially.",
      },
      {
        type: "list",
        items: [
          "SOC 2 Type II, with continuous control monitoring — not an annual snapshot.",
          "AES-256 at rest, TLS 1.3 in transit, envelope encryption with per-workspace keys.",
          "Contractual, technical, and architectural exclusion of customer data from model training.",
          "Regional residency: EU, US, and APAC storage with routing at the workspace level.",
          "SSO/SAML, SCIM provisioning, and role-based access down to individual workflows.",
        ],
      },
      { type: "h2", text: "Boring on purpose" },
      {
        type: "quote",
        text: "The best security posture is the one where nothing clever is required.",
      },
      {
        type: "p",
        text: "No client-side model keys. No prompt bodies in analytics events. No silent scope widening in integration updates — an OAuth scope change forces re-consent, full stop. Our red-team report and the pen-test letter are available under NDA from the security page, and the questionnaire answers are in the docs for everyone else.",
      },
    ],
  },
  {
    slug: "from-prompts-to-pipelines",
    title: "From prompts to pipelines: automation patterns that hold up",
    excerpt:
      "Four patterns cover most of what teams automate in their first ninety days — and one anti-pattern that keeps eating calendars.",
    category: "Guides",
    date: "May 19, 2026",
    readingTime: "6 min read",
    author: { name: "Tomás Ferreira", role: "Head of Research", initials: "TF" },
    body: [
      {
        type: "p",
        text: "After watching a few thousand workspaces build their first workflows, the successful ones converge on the same four shapes. They're less glamorous than the demos you've seen at AI conferences and considerably more durable. If you're starting from zero, start here.",
      },
      { type: "h2", text: "Pattern 1: Observe, summarize, deliver" },
      {
        type: "p",
        text: "The workhorse. Watch a source on a schedule (merged PRs, support queues, competitor pages), condense it, file it where the audience lives. Low autonomy, zero risk, immediate calendar relief. Median setup: six minutes.",
      },
      { type: "h2", text: "Pattern 2: Draft for approval" },
      {
        type: "p",
        text: "The agent produces, a human judges. Outreach sequences, customer replies, release notes. Turnaround drops from hours to minutes; judgment stays exactly where lawyers and managers want it.",
      },
      { type: "h2", text: "Pattern 3: Triage with thresholds" },
      {
        type: "p",
        text: "Score everything, act on what's confidently classifiable, escalate the rest with a recommendation attached. The threshold is the product decision: set it from your error tolerance, not from the model's vibes.",
      },
      { type: "h2", text: "Pattern 4: Continuous hygiene" },
      {
        type: "p",
        text: "Dedupe, enrich, reconcile — small nudges that keep systems trustworthy forever. Individually invisible; compounding into the absence of the painful quarterly cleanup.",
      },
      {
        type: "quote",
        text: "The teams that succeed automate the boring 80% first. The teams that struggle start by trying to automate their edge cases.",
      },
      { type: "h2", text: "The anti-pattern: the demo loop" },
      {
        type: "p",
        text: "Building the workflow that looks best in a meeting — usually something with six agents and a dramatic canvas — instead of the one your queue actually needs. It's how teams end up with a stunning demo and a calendar that never got lighter. Start with report, draft, triage, clean. The dramatic stuff is version two.",
      },
    ],
  },
  {
    slug: "inside-the-sync-engine",
    title: "Inside the sync engine: 60 integrations, one event model",
    excerpt:
      "How NOVA keeps every connected tool consistent in real time — webhooks, backfills, and the boring genius of idempotency keys.",
    category: "Engineering",
    date: "April 28, 2026",
    readingTime: "10 min read",
    author: { name: "Priya Raghavan", role: "VP of Engineering", initials: "PR" },
    body: [
      {
        type: "p",
        text: "The feature nobody sees is the one everything depends on. Every agent brief, every automation trigger, every analytics number rides on a sync layer that keeps 60+ external tools' data consistent with what your workspace believes is true. This is a short technical tour of how it works.",
      },
      { type: "h2", text: "One event model to bind them" },
      {
        type: "p",
        text: "Every provider — Slack, HubSpot, GitHub, Linear — normalizes into a single envelope: resource, operation, actor, timestamp, payload hash, and a provider-specific cursor. Normalization is deliberately lossy: if a field doesn't fit the model, it lives in the raw payload, not in a fake generalization we'll regret at 2 a.m.",
      },
      { type: "h2", text: "Webhooks when offered, cursors when not" },
      {
        type: "p",
        text: "About two-thirds of our providers offer webhooks, with reliability varying from 'excellent' to 'aspirational.' We treat them as hints, not truth: a webhook schedules an incremental pull, which reconciles against the cursor window. Missed webhook? The cursor catches it. Duplicated delivery? Idempotency keys collapse it before it reaches a workflow trigger.",
      },
      {
        type: "list",
        items: [
          "Backfill: full-history pulls on connect, chunked and rate-respecting, resumable at any chunk boundary.",
          "Incremental: cursor-window polls every 30–120 seconds per connector, adaptive to traffic.",
          "Reconciliation: nightly sampling diffs provider truth against our store and self-heals drift.",
          "Idempotency: every event carries a content-addressed key; retries are free, duplicates are impossible.",
        ],
      },
      { type: "h2", text: "Why boring wins" },
      {
        type: "p",
        text: "There's no exotic infrastructure in this system — queues, workers, and meticulous bookkeeping. The engineering culture rule is that the sync layer is allowed to be slow but not wrong: a workflow that fires a minute late is a UX bug; one that fires twice is a trust bug. Median event-to-trigger latency today is 1.4 seconds, and the duplicate rate is, by construction, zero.",
      },
      {
        type: "p",
        text: "If you're building on top of NOVA, the same event stream is available to you through the API and webhooks — same envelopes, same guarantees. The reference is in the docs under 'Event model.'",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
