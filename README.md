# NOVA — AI Productivity Platform

A complete, production-ready SaaS website and product dashboard with an
Apple-inspired design language: warm neutrals, self-hosted Geist typography,
hairline borders, restrained motion, and fully rendered product UI.
No gradients-as-personality, no glass-everything, no filler.

Built with **Next.js 15 (App Router) · TypeScript · CSS Modules**. One
runtime dependency set (`next`, `react`, `react-dom`) — charts, icons,
accordions, and the command palette are all hand-rolled.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Marketing homepage — 13 sections, live product UI |
| `/features` | Editorial feature deep-dives (incl. `#solutions`, `#security`) |
| `/integrations` | Filterable integration catalog + API panel |
| `/pricing` | Plans with monthly/yearly toggle + full comparison table |
| `/about` | Story, values, team |
| `/blog`, `/blog/[slug]` | 6 complete long-form articles |
| `/changelog` | Versioned release history |
| `/docs` | Product docs with in-page reference (API, security, privacy, terms) |
| `/contact` | Working client-side form (simulated send) |
| `/login`, `/signup` | Split-panel auth screens → demo dashboard |
| `/dashboard` | Overview with stats, charts, approvals, activity |
| `/dashboard/agents` | Agent control cards with pause/resume + action log |
| `/dashboard/automations` | Searchable, filterable, toggleable automation table |
| `/dashboard/analytics` | 7d/30d/90d switching, donut, per-agent performance |
| `/dashboard/settings` | Workspace, notifications, security, API keys, billing |

Press **⌘K / Ctrl-K** anywhere in the dashboard for the command palette.

## Customization

Everything brandable lives in a few obvious places:

- **Design tokens** — `app/globals.css`. Colors, radii, shadows, type
  scale, container widths, easing curves. Change the accent (one variable,
  `--accent`) and the whole system follows.
- **Typography** — self-hosted Geist + Geist Mono in `public/fonts`, wired
  via `@font-face` in `globals.css`. Drop in your own `.woff2` files to
  rebrand; body copy references `--font-sans` / `--font-mono`.
- **Content** — `lib/data.ts` (pricing, FAQ, testimonials, integrations,
  agents, automations, changelog entries, chart data) and `lib/posts.ts`
  (blog articles as structured blocks).
- **Components** — `components/` is split by concern: `site/` (navbar,
  footer, pricing), `mock/` (the rendered product UI), `charts/`,
  `dash/` (shell + command palette), `ui/` (accordion), `icons.tsx`.
- **Layout constants** — nav height, gutter, and container widths are CSS
  variables; breakpoints: 1024 / 920 / 832 / 768 / 620 / 560 / 480.

## Deployment

Any Node host, or zero-config on Vercel:

```bash
npm run build && npm start          # Node / Docker / Fly / Railway
vercel deploy                       # Vercel (auto-detects Next.js)
```

Static-first: every marketing route is prerendered. `metadataBase` lives in
`app/layout.tsx` — set it to your domain (also used by `app/sitemap.ts` and
`app/robots.ts`).

## Notes

- Auth, forms, and dashboard actions are front-end demos — wire them to your
  backend or auth provider of choice (the form submit handlers are the only
  touch points to replace).
- Fonts ship under the OFL 1.1 license (Geist by Vercel).
