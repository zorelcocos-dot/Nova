# NOVA — AI Productivity Platform

A complete, production-ready SaaS website and product dashboard with an
Apple-inspired design language: warm neutrals, self-hosted Geist typography,
hairline borders, restrained motion, and fully rendered product UI.
No gradients-as-personality, no glass-everything, no filler.

Built with **Next.js 15 (App Router) · TypeScript · CSS Modules**. One
runtime dependency set (`next`, `react`, `react-dom`) — charts,
accordions, and the command palette are all hand-rolled. UI icons and
brand marks are vendored verbatim into `components/icons.tsx` from
official sources: [Lucide](https://lucide.dev) (ISC) for UI icons and
[Simple Icons](https://simpleicons.org) (CC0) for brand marks.

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
| `/dashboard/settings` | Workspace, appearance, notifications, security, API keys, billing |

Press **⌘K / Ctrl-K** anywhere in the dashboard for the command palette.

## Theming

Light, dark, and system themes ship site-wide.

- **How it works** — the resolved theme is a `data-theme` attribute on
  `<html>`. Light values live on `:root` in `app/globals.css`; every dark
  value lives in the single `[data-theme="dark"], .dark` block. An inline
  script in `app/layout.tsx` paints the stored choice before first paint,
  so there is no flash. Switching themes cross-fades over ~400ms
  (`.theme-switching` on `<html>`), and the cut is instant for
  reduced-motion users. Secondary inks and status hues pass WCAG AA in
  both palettes (plus a `prefers-contrast: more` boost).
- **Where users switch it** — marketing navbar, dashboard topbar,
  Settings → Appearance, and the command palette ("dark", "light", "auto").
  The choice persists in `localStorage` under `nova-theme`.
- **Locally-inverted sections** — a section with class `.dark` (like the
  home page engine band) stays dark in light mode and softens to
  `--bg-soft` in dark mode instead of double-inverting.
- **Panels that must stay dark in both themes** use the `--inv-*` token
  family, so the mock product console keeps its identity either way.
- **Display preferences** — Settings → Appearance also carries *Reduce
  motion* and *Compact density*. They set `data-motion="reduce"` and
  `data-density="compact"` on `<html>`, persist under `nova-prefs`, and are
  honored by both CSS and the JS animation hooks.

Colors are fully tokenized: no component hard-codes a hex value, so
restyling means editing tokens, not hunting through CSS modules.

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
  `dash/` (shell + command palette), `ui/` (accordion, toast), `icons.tsx`.
- **Toasts** — `useToast()` from `components/ui/Toast.tsx`, mounted once in
  the root layout. `toast("Saved.")` or `toast("Key revoked.", "danger")`;
  the queue announces politely to screen readers and cleans up its timers.
- **Overlays** — `useFocusTrap()` in `components/hooks.ts` handles Tab
  cycling, Escape, and focus restoration for modals and the mobile menu.
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
