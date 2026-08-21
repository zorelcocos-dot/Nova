/* ============================================================
   NOVA content & product data
   Edit this file to customize copy, pricing, and datasets.
   ============================================================ */

export const trustedCompanies = [
  { name: "Vantage", style: "w600" },
  { name: "meridian", style: "mono" },
  { name: "NORTHPEAK", style: "caps" },
  { name: "Fjord", style: "w500" },
  { name: "ouro", style: "w600" },
  { name: "Castle & Co.", style: "serif" },
  { name: "HALCYON", style: "caps" },
  { name: "beacon", style: "mono" },
];

/* ---------------- Testimonials ---------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We stopped counting the hours. NOVA quietly removed about a third of our operational workload in the first quarter — status reports, ticket triage, CRM hygiene — all of it just happens now. The team noticed the silence more than the software.",
    name: "Elena Marsh",
    role: "VP of Operations",
    company: "Vantage",
    initials: "EM",
  },
  {
    quote:
      "The approval layer is what sold our security team. Agents draft, humans approve, everything is logged. It's the first AI tooling we've rolled out that Legal actually liked.",
    name: "David Okafor",
    role: "Head of Growth",
    company: "Meridian",
    initials: "DO",
  },
  {
    quote:
      "Our support agent resolves 41% of tickets end to end. What surprised me is the quality — customers rate its answers higher than our old macros.",
    name: "Petra Lindqvist",
    role: "Engineering Lead",
    company: "Fjord",
    initials: "PL",
  },
  {
    quote:
      "Setup took an afternoon. By Friday, the research agent had briefed every account executive on their Monday meetings. Nobody on my team wants to give it back.",
    name: "Sam Rivera",
    role: "Chief Operating Officer",
    company: "Northpeak",
    initials: "SR",
  },
  {
    quote:
      "It's rare that a platform makes both finance and engineering happy. Finance sees the hours saved, engineering sees clean APIs and real audit logs.",
    name: "Ava Chen",
    role: "Support Director",
    company: "Ouro",
    initials: "AC",
  },
];

/* ---------------- Pricing ---------------- */

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  cta: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    blurb: "For individuals getting a feel for AI-powered work.",
    cta: "Start for free",
    features: [
      "1,000 AI tasks per month",
      "3 active workflows",
      "1 workspace seat",
      "Core integrations",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 29,
    yearly: 23,
    blurb: "For teams ready to hand real work to agents.",
    cta: "Start 14-day trial",
    features: [
      "20,000 AI tasks per month",
      "Unlimited workflows",
      "Up to 10 seats",
      "All 80+ integrations",
      "Advanced analytics",
      "Approval flows & guardrails",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 99,
    yearly: 79,
    blurb: "For organizations with security and scale requirements.",
    cta: "Talk to sales",
    features: [
      "Unlimited AI tasks",
      "Unlimited seats",
      "SSO / SAML & SCIM",
      "Audit logs & data residency",
      "99.99% uptime SLA",
      "Dedicated success manager",
    ],
  },
];

export type ComparisonRow = {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  scale: string | boolean;
};

export const comparisonGroups: { title: string; rows: ComparisonRow[] }[] = [
  {
    title: "Usage",
    rows: [
      { feature: "AI tasks / month", starter: "1,000", pro: "20,000", scale: "Unlimited" },
      { feature: "Active workflows", starter: "3", pro: "Unlimited", scale: "Unlimited" },
      { feature: "Seats", starter: "1", pro: "10", scale: "Unlimited" },
      { feature: "AI agents", starter: "2", pro: "6", scale: "Unlimited" },
      { feature: "History", starter: "7 days", pro: "1 year", scale: "Unlimited" },
    ],
  },
  {
    title: "Platform",
    rows: [
      { feature: "Core integrations", starter: true, pro: true, scale: true },
      { feature: "Premium integrations", starter: false, pro: true, scale: true },
      { feature: "API access", starter: false, pro: true, scale: true },
      { feature: "Advanced analytics", starter: false, pro: true, scale: true },
      { feature: "Approval flows", starter: false, pro: true, scale: true },
    ],
  },
  {
    title: "Security & support",
    rows: [
      { feature: "SSO / SAML & SCIM", starter: false, pro: false, scale: true },
      { feature: "Audit logs", starter: false, pro: false, scale: true },
      { feature: "Data residency", starter: false, pro: false, scale: true },
      { feature: "Uptime SLA", starter: false, pro: "99.9%", scale: "99.99%" },
      { feature: "Support", starter: "Community", pro: "Priority", scale: "Dedicated CSM" },
    ],
  },
];

/* ---------------- FAQ ---------------- */

export const faqs: { q: string; a: string }[] = [
  {
    q: "What exactly is an AI agent in NOVA?",
    a: "An agent is a configuration of a model, tools, and permissions that owns a category of work — research, sales outreach, support replies, data cleanup. You describe the outcome, connect the tools it may use, and set its guardrails. From then on it picks up tasks autonomously and reports back with everything it did.",
  },
  {
    q: "Do I need to replace the tools my team already uses?",
    a: "No. NOVA sits on top of the tools you have — Slack, Notion, GitHub, HubSpot, Linear, and 80+ more. Agents read from and write to your existing stack with scoped, revocable permissions, so adoption never requires a migration.",
  },
  {
    q: "What counts as one AI task?",
    a: "A task is one unit of completed work: a research brief, a drafted reply, an enriched CRM record, a summarized thread. We count outcomes, not tokens or API calls, so your bill maps to value rather than model internals.",
  },
  {
    q: "Is my company's data used to train models?",
    a: "Never. Your data is encrypted in transit and at rest, isolated per workspace, and contractually excluded from training. You can export or permanently delete all workspace data at any time, from Settings or via the API.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams connect their first integration and complete their first automated task within ten minutes. A typical team rollout — agents configured, approval flows set, analytics baseline — takes an afternoon, and our team handles enterprise deployments with you.",
  },
  {
    q: "Can I control what agents are allowed to do?",
    a: "Yes, precisely. Every agent has an explicit permission scope per tool: read-only, draft-only, or act. Actions above a confidence or impact threshold can require human approval, and every decision an agent makes is recorded in an immutable audit log.",
  },
  {
    q: "What happens when an agent gets stuck or unsure?",
    a: "It asks, rather than guess. Agents escalate to a human-in-the-loop queue with full context and a recommended action. You approve, edit, or reject; the agent learns from the correction for next time.",
  },
  {
    q: "Can I cancel or change plans at any time?",
    a: "Of course. Plans are month to month (or yearly at a 20% discount), prorated automatically, and you keep full access until the end of the billing period. Downgrading never destroys your configuration — it waits for you to come back.",
  },
];

/* ---------------- Integrations ---------------- */

export type Integration = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export const integrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description:
      "Agent updates, approvals, and summaries delivered in the channels your team already lives in.",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge",
    description:
      "Agents read your docs and specs, then keep them current as work changes underneath them.",
  },
  {
    id: "googledrive",
    name: "Google Drive",
    category: "Storage",
    description:
      "Index files and folders as source material, with permissions inherited from Drive itself.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Engineering",
    description:
      "Draft release notes, triage issues, and summarize pull requests the moment they land.",
  },
  {
    id: "linear",
    name: "Linear",
    category: "Engineering",
    description:
      "Turn agent findings into well-formed issues — labeled, scoped, and assigned automatically.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "Sales",
    description:
      "Enrich contacts, draft outreach, and keep pipeline hygiene pristine without a spreadsheet in sight.",
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    description:
      "A community support agent that answers from your docs and escalates when it should.",
  },
  {
    id: "jira",
    name: "Jira",
    category: "Engineering",
    description:
      "Sync epics and tickets, generate status reports, and keep sprints honest.",
  },
];

/* ---------------- AI Agents ---------------- */

export type AgentAction = { time: string; text: string };
export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  status: "Working" | "Idle" | "Scheduled" | "Paused";
  currentTask: string;
  progress: number;
  tasksPerWeek: string;
  avgTime: string;
  accuracy: string;
  recent: AgentAction[];
};

export const agents: Agent[] = [
  {
    id: "research",
    name: "Research Agent",
    role: "Research",
    description:
      "Briefs your team on markets, competitors, and accounts before anyone asks.",
    status: "Working",
    currentTask: "Compiling competitive brief for the Meridian renewal",
    progress: 72,
    tasksPerWeek: "384",
    avgTime: "3m 40s",
    accuracy: "99.2%",
    recent: [
      { time: "2m", text: "Summarized 14 analyst notes on Castello's pricing change" },
      { time: "26m", text: "Drafted pre-meeting brief for Avanta Foods, flagged churn risk" },
      { time: "1h", text: "Refreshed competitor battlecard: Positioning v3.2" },
    ],
  },
  {
    id: "sales",
    name: "Sales Agent",
    role: "Sales",
    description:
      "Enriches leads, drafts outreach in your voice, and keeps the CRM immaculate.",
    status: "Working",
    currentTask: "Personalizing 42 outbound first-touch emails",
    progress: 58,
    tasksPerWeek: "1,219",
    avgTime: "48s",
    accuracy: "98.7%",
    recent: [
      { time: "4m", text: "Enriched 26 new HubSpot contacts from call transcripts" },
      { time: "18m", text: "Drafted follow-up sequence for the Northpeak expansion deal" },
      { time: "52m", text: "Logged 9 objections from demo calls to the shared playbook" },
    ],
  },
  {
    id: "support",
    name: "Support Agent",
    role: "Support",
    description:
      "Resolves tickets end to end, escalating with context when a human should decide.",
    status: "Working",
    currentTask: "Resolving billing question for Halcyon (account #4821)",
    progress: 86,
    tasksPerWeek: "2,047",
    avgTime: "1m 12s",
    accuracy: "99.5%",
    recent: [
      { time: "1m", text: "Resolved API rate-limit question, linked changelog entry" },
      { time: "12m", text: "Escalated refund request to Maya with sentiment summary" },
      { time: "33m", text: "Answered SSO setup question from the security docs" },
    ],
  },
  {
    id: "data",
    name: "Data Agent",
    role: "Data",
    description:
      "Watches every pipeline, cleans what drifts, and answers questions with charts.",
    status: "Scheduled",
    currentTask: "Nightly warehouse audit scheduled for 02:00 UTC",
    progress: 0,
    tasksPerWeek: "693",
    avgTime: "2m 05s",
    accuracy: "99.8%",
    recent: [
      { time: "3h", text: "Reconciled 214 duplicated records in the account table" },
      { time: "7h", text: "Flagged a null-rate spike in events stream, posted to #data" },
      { time: "1d", text: "Built 'Hours saved by team' dashboard from raw logs" },
    ],
  },
];

/* ---------------- Automations (dashboard) ---------------- */

export type Automation = {
  id: string;
  name: string;
  trigger: string;
  runs: string;
  success: string;
  lastRun: string;
  active: boolean;
};

export const automations: Automation[] = [
  { id: "a1", name: "Triage inbound support tickets", trigger: "New ticket created", runs: "1,284", success: "99.1%", lastRun: "2 min ago", active: true },
  { id: "a2", name: "Weekly pipeline digest", trigger: "Every Monday, 08:30", runs: "46", success: "100%", lastRun: "2 days ago", active: true },
  { id: "a3", name: "PR summary to #eng-updates", trigger: "Pull request merged", runs: "912", success: "99.6%", lastRun: "18 min ago", active: true },
  { id: "a4", name: "Enrich new CRM contacts", trigger: "Contact created in HubSpot", runs: "3,406", success: "98.4%", lastRun: "6 min ago", active: true },
  { id: "a5", name: "Nightly data warehouse audit", trigger: "Daily, 02:00 UTC", runs: "182", success: "97.8%", lastRun: "7 hours ago", active: true },
  { id: "a6", name: "Churn-risk alert to CSM", trigger: "Health score drops below 60", runs: "64", success: "100%", lastRun: "4 days ago", active: false },
  { id: "a7", name: "Invoice reconciliation", trigger: "Invoice marked paid", runs: "527", success: "99.2%", lastRun: "1 hour ago", active: true },
  { id: "a8", name: "Meeting notes to Linear", trigger: "Call recording uploaded", runs: "238", success: "96.9%", lastRun: "3 hours ago", active: false },
];

/* ---------------- Activity feed ---------------- */

export const activityFeed = [
  { who: "Support Agent", what: "Resolved ticket #5841 — billing question for Halcyon", when: "1 min ago", kind: "agent" },
  { who: "Triage inbound support tickets", what: "Automation completed in 44s", when: "2 min ago", kind: "automation" },
  { who: "Sales Agent", what: "Waiting for approval — outreach sequence for Meridian", when: "9 min ago", kind: "approval" },
  { who: "Maya Chen", what: "Approved 3 agent actions", when: "14 min ago", kind: "human" },
  { who: "Data Agent", what: "Posted weekly anomalies report to #data", when: "32 min ago", kind: "agent" },
  { who: "PR summary to #eng-updates", what: "Automation completed in 12s", when: "41 min ago", kind: "automation" },
  { who: "Research Agent", what: "Delivered competitive brief to Growth", when: "1 hour ago", kind: "agent" },
];

/* ---------------- Notifications ---------------- */

export type NotificationKind = "approval" | "success" | "alert" | "info";
export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "approval",
    title: "Sales Agent needs approval",
    body: "Outreach sequence for Meridian is waiting — 4 emails drafted, review before 5pm.",
    time: "9 min ago",
    unread: true,
  },
  {
    id: "n2",
    kind: "alert",
    title: "Churn-risk alert to CSM is paused",
    body: "The automation failed twice overnight after the HubSpot scope change.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "n3",
    kind: "success",
    title: "Weekly report delivered",
    body: "Data Agent posted the anomalies report to #data — 3 insights flagged.",
    time: "32 min ago",
    unread: true,
  },
  {
    id: "n4",
    kind: "info",
    title: "NOVA 2.5 is out",
    body: "Official icon set, WCAG AA contrast, and smooth theme switching. Read the changelog.",
    time: "2 hours ago",
    unread: false,
  },
];


/* ---------------- Changelog ---------------- */

export type ChangeKind = "New" | "Improved" | "Fixed";
export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  items: { kind: ChangeKind; text: string }[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "2.7.0",
    date: "August 22, 2026",
    title: "The accessibility pass",
    items: [
      { kind: "Improved", text: "A full WCAG audit with a real screen-reader rules engine, in both themes, on every page. Every serious finding is fixed: status chips, sidebar hints, and the dashboard search field now clear AA with room to spare." },
      { kind: "Improved", text: "Inline links in legal and docs pages now underline — no more spotting them by color alone — and comparison-table checkmarks carry screen-reader text instead of illegal aria-labels." },
      { kind: "Fixed", text: "Heading outline repaired: plan names, footer columns, and the auth pages' missing main landmark no longer skip levels or float outside landmarks." },
      { kind: "Improved", text: "FAQ accordion panels are properly labelled regions for assistive tech." },
    ],
  },
  {
    version: "2.6.1",
    date: "August 22, 2026",
    title: "Small screens, sharp edges",
    items: [
      { kind: "Fixed", text: "The docs sidebar no longer stretches the page sideways on phones — links reflow into pills inside the viewport." },
      { kind: "Fixed", text: "The integrations grid on the Features page shrinks gracefully on small screens instead of poking out past the edge." },
      { kind: "Fixed", text: "No more horizontal scrollbar flash while fonts or charts settle in — the page clips instead of wobbling." },
      { kind: "New", text: "Keyboard sequences from the command palette hints actually work now: G then O/A/W/N/S jumps straight between dashboard pages." },
      { kind: "Fixed", text: "\u201CForgot password?\u201D on the login screen is no longer a link to itself — it sends a (simulated) reset link, and tells you when the email field is empty." },
    ],
  },
  {
    version: "2.6.0",
    date: "August 22, 2026",
    title: "Terms, privacy, and the notification center",
    items: [
      { kind: "New", text: "Full Terms of Service and Privacy Policy, written in plain English and linked from the footer, signup, and docs — no more 'available on request'." },
      { kind: "New", text: "The dashboard bell is now a real notification center: approvals, alerts, and deliveries in one popover, with mark-all-read and per-item dismiss." },
      { kind: "Improved", text: "Every interactive element was click-tested end to end — filters, switches, forms, SSO buttons, and the command palette all respond." },
    ],
  },
  {
    version: "2.5.0",
    date: "August 22, 2026",
    title: "The visual refresh",
    items: [
      { kind: "Improved", text: "Every icon in the product and on the website now comes from official sources — Lucide for interface icons, Simple Icons for integrations and brand marks. No more approximated glyphs." },
      { kind: "Improved", text: "Dark mode got a full contrast pass: secondary text, status colors, and console panels now meet WCAG AA in both light and dark themes." },
      { kind: "New", text: "Switching themes now cross-fades smoothly instead of hard-cutting — and it politely steps aside if you prefer reduced motion." },
      { kind: "New", text: "The homepage hero has a soft theme-aware aurora backdrop, and link previews (Open Graph) ship a proper branded card." },
      { kind: "Fixed", text: "Autofilled form fields no longer flash a pale yellow or blue box that clashes with dark mode." },
    ],
  },
  {
    version: "2.4.0",
    date: "August 11, 2026",
    title: "Multi-agent handoffs",
    items: [
      { kind: "New", text: "Agents can now hand a task to another agent with full context — a research brief can flow straight into a drafted outreach sequence, no human in the middle required (unless you want one)." },
      { kind: "New", text: "Workflow builder gains a Handoff node with configurable approval between agents." },
      { kind: "Improved", text: "Agent timelines now render 2× faster in workspaces with 10k+ monthly tasks." },
      { kind: "Fixed", text: "Slack approval messages no longer duplicate when a channel is private." },
    ],
  },
  {
    version: "2.3.2",
    date: "July 28, 2026",
    title: "Reliability pass",
    items: [
      { kind: "Improved", text: "Reduced median agent cold-start time from 3.2s to 1.1s." },
      { kind: "Improved", text: "Analytics exports now include per-agent cost breakdowns." },
      { kind: "Fixed", text: "Corrected a timezone bug that shifted 'Every Monday' schedules by one day for UTC+13/+14 teams." },
    ],
  },
  {
    version: "2.3.0",
    date: "July 9, 2026",
    title: "Approval flows 2.0",
    items: [
      { kind: "New", text: "Batch approvals: review and approve up to 200 pending agent actions at once with per-item diffs." },
      { kind: "New", text: "Approval policies — route high-impact actions to specific roles automatically." },
      { kind: "Improved", text: "Guardrail explanations are now written in plain language attached to every blocked action." },
    ],
  },
  {
    version: "2.2.0",
    date: "June 16, 2026",
    title: "Smart Analytics",
    items: [
      { kind: "New", text: "Hours Saved is now measured per workflow with confidence intervals — no more vanity metrics." },
      { kind: "New", text: "Ask Analytics: type a question, get a chart. Powered by the Data Agent." },
      { kind: "Improved", text: "Dashboard loads are now 40% faster thanks to streaming aggregation." },
      { kind: "Fixed", text: "Week-over-week deltas displayed the wrong sign in dark contexts." },
    ],
  },
  {
    version: "2.1.0",
    date: "May 27, 2026",
    title: "The workflow builder, rebuilt",
    items: [
      { kind: "New", text: "Visual canvas for branching logic: conditions, loops, and parallel paths." },
      { kind: "New", text: "Version history for every workflow — diff and restore in one click." },
      { kind: "Improved", text: "Trigger library doubled to 42 event sources." },
    ],
  },
  {
    version: "2.0.0",
    date: "April 30, 2026",
    title: "Introducing NOVA AI 2.0",
    items: [
      { kind: "New", text: "Research, Sales, Support, and Data agents ship to every workspace." },
      { kind: "New", text: "Human-in-the-loop approvals with a full audit trail." },
      { kind: "New", text: "A redesigned dashboard: command palette, agent timelines, and workflow analytics." },
      { kind: "Improved", text: "Every surface rebuilt on our new design system — faster, calmer, sharper." },
    ],
  },
];

/* ---------------- Dashboard chart data ---------------- */

export const chartRanges = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    hoursSaved: [38, 52, 47, 61, 74, 28, 31],
    tasksAutomated: [412, 486, 455, 540, 618, 220, 244],
  },
  "30d": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    hoursSaved: [212, 264, 289, 341],
    tasksAutomated: [2380, 2912, 3054, 3621],
  },
  "90d": {
    labels: ["May", "Jun", "Jul", "Aug"],
    hoursSaved: [864, 1012, 1189, 1421],
    tasksAutomated: [9240, 11020, 12980, 15460],
  },
} as const;

export const donutData = [
  { label: "Support resolution", value: 42 },
  { label: "Research briefs", value: 21 },
  { label: "CRM hygiene", value: 18 },
  { label: "Reporting", value: 12 },
  { label: "Other", value: 7 },
];

export const tasksByType = [
  { label: "Support", value: 2047 },
  { label: "Sales", value: 1219 },
  { label: "Research", value: 384 },
  { label: "Data", value: 693 },
  { label: "Ops", value: 512 },
  { label: "Eng", value: 298 },
];
