# Genesis

Genesis is an AI Operating Platform prototype by WolfX BI, built with Next.js 15, React 19, TypeScript, Tailwind CSS, and the App Router.

## Current status

**UI prototype with mock content; not a production service.** The app provides responsive navigation, a platform overview, and a working browser-only BI workspace with CSV import, date/category filters, calculated KPIs, revenue charts, and paginated records. Other modules are placeholder pages.

No APIs, database, authentication, authorization, or persistent storage are implemented. `/login` is an honest demo entry screen with no credential fields. Routes are public. The mobile navigation opens/closes and supports Escape; the desktop sidebar collapses. Imported data stays in React state and is discarded on reload or when leaving the BI page.

Use the prototype to demonstrate the intended interface with synthetic content. The platform overview uses synthetic metrics including “Trust Score”; these do not establish real operational or security capabilities. BI workspace metrics are calculated from the selected dataset.

## Routes

| Route | Purpose | Implemented today |
| --- | --- | --- |
| `/` | Entry point | Redirects to `/login`. |
| `/login` | Access screen | Demo entry links; no authentication or credential collection. |
| `/dashboard` | Command center | Static KPI cards, decorative bar chart, example activity, and agent widgets. |
| `/chat` | AI conversations | Placeholder cards; no chat input, model calls, or conversation memory. |
| `/documents` | Document management | Placeholder cards; no upload, extraction, or storage. |
| `/knowledge-base` | Trusted sources and retrieval | Placeholder cards; no indexing or retrieval. |
| `/business-intelligence` | Analytics and insights | Working local CSV analysis, filters, KPIs, charts, and records; no external connectors or Power BI embedding. |
| `/agents` | Specialist AI workers | Placeholder cards; no agent execution or approvals. |
| `/automation` | Business workflows | Placeholder cards; no triggers, runs, or scheduling. |
| `/languages` | Localization | Placeholder cards; no locale switching or translation. |
| `/profile` | Personal workspace details | Placeholder cards; no editable or saved profile. |
| `/settings` | Workspace configuration | Placeholder cards; no saved settings or integrations. |

## Local development

Prerequisites: Git, Node.js 24.19.0 (see `.nvmrc`), and npm 11.9.0. Dependencies are pinned and `package-lock.json` is committed.
```bash
git clone --branch genesis https://github.com/wolfxbi/genesis.git
cd genesis
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No API keys or environment variables are required for the current mock UI.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint using `eslint.config.mjs`. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve an existing production build; run build first. |

Run `npm run lint`, `npm test`, `npm run build`, and `npm run typecheck` before opening a PR. GitHub Actions runs these checks with a clean `npm ci` install. Tests cover CSV parsing/validation, financial aggregation, BI import/filter/reset/pagination interactions, and mobile menu interaction in a simulated DOM. They do not replace a visual browser check. ESLint uses the Next.js core-web-vitals and TypeScript configuration.

## BI workspace and CSV import

Open `/business-intelligence`. Start with 36 synthetic observations or download `public/genesis-sales-example.csv`, edit it, and use **Import CSV**. CSV contents never leave the browser; no API key is needed. Imports replace the dataset only after successful validation. **Reset sample** discards imported data and restores the demo.

| Column | Accepted input |
| --- | --- |
| `date` | Valid `YYYY-MM-DD`, years 1900–2100. |
| `category` | 1–80 characters on one line. |
| `revenue`, `cost` | Non-negative EUR amounts, maximum 1 billion per record, up to two decimals; no currency symbols or thousands separators. |

All four headers are required, in any order. Comma and semicolon delimiters, UTF-8 BOM, CRLF, quoted fields, and escaped quotes are supported. Decimal commas are accepted (quote them in comma-delimited files). Limits: 1 MB and 10,000 records. Invalid input produces an error while preserving the previous dataset.

Date boundaries are inclusive. Filters update every KPI, chart, and the 20-record table pages. Revenue/cost totals use integer cents; operating result is revenue minus cost, and margin is result divided by revenue (undefined at zero revenue). Each row is an observation, not an order; duplicate rows are included. Charts show observed months and the top 10 categories by revenue. No currency conversion, tax handling, or missing-month estimation is performed.

## Code structure and adding a feature

| Location | Responsibility |
| --- | --- |
| `src/app/page.tsx`, `src/app/login/page.tsx` | Entry redirect and login UI. |
| `src/app/(platform)/` | Platform routes and shared layout; the route group does not appear in URLs. |
| `src/components/app-shell.tsx` | Sidebar, header, and layout interactions. |
| `src/components/page-card.tsx` | Shared placeholder module presentation. |
| `src/lib/navigation.ts` | Brand icon and platform navigation items. |
| `src/lib/bi.ts` | CSV validation, synthetic data, filters, and aggregation. |
| `src/components/bi-dashboard.tsx` | Local import, filters, metrics, charts, and table UI. |
| `src/app/globals.css` | Global styles and visual effects. |

1. Create a feature branch from `genesis` and define the smallest user flow and acceptance criteria.
2. Add `src/app/(platform)/<feature>/page.tsx` and a matching entry in `src/lib/navigation.ts` when navigation is needed.
3. Reuse shared components; add a Client Component only where browser state or interaction is required.
4. Keep synthetic fixtures separate from rendering as the feature grows. Clearly label demo values and implement loading, empty, and error states for asynchronous work.
5. Run lint and build, check the direct route and navigation on desktop/mobile, and update this README when functionality or setup changes.

## Mock data and future API boundaries

Current fixtures live inline in `src/app/(platform)/dashboard/page.tsx`: KPI values, bar heights, activity messages, and agent names. The BI workspace uses the separate `sampleRows` fixture in `src/lib/bi.ts` until a local CSV is imported. Other module titles and capability labels live in their route pages and are rendered through `PageCard`. They are descriptive UI content, not working features or API responses.

For future integrations, introduce typed data contracts and a service layer (for example, `src/lib/services/`; not present yet). Use server-side handlers or server code for provider calls and credentials. Define authentication, workspace authorization, validation, persistence, and error handling before accepting customer data. Keep secrets in server environment variables, never in browser-exposed `NEXT_PUBLIC_*` values. Add a secret-free `.env.example` when variables become necessary.

Chat/model calls, document storage and extraction, retrieval, BI connectors, and workflow execution are separate future integrations. Build one validated end-to-end use case first; the existing routes do not imply these services are available.

## Deployment verification

A lint/test/build/typecheck CI workflow is committed. No hosting configuration or verified deployment URL is committed.

Before a release or customer demo:

- [ ] Use the pinned Node/npm versions and `npm ci` for a clean installation.
- [ ] Run `npm run lint` and `npm run build`; investigate failures rather than bypassing checks.
- [ ] Run `npm run start` and check every route above by direct URL and navigation. Confirm `/` redirects to `/login`.
- [ ] Check desktop and narrow mobile layouts, keyboard access, readable labels, and browser/server errors. Verify mobile menu open/close, Escape, route selection, CSV import errors, filter totals, and pagination.
- [ ] Deploy the tested commit to the chosen preview environment. For a Node deployment, use the build/start scripts and the host's assigned port.
- [ ] Repeat route and layout checks on the deployed URL; record the commit, URL, check results, and any known limitations.
- [ ] For restricted demos, enable and verify hosting-level access protection. The demo entry screen provides no access control.
- [ ] Show only synthetic data and explain the prototype status. Verify rollback to the previous deployment before a production release.

These are required checks, not a record that deployment or runtime tests have passed.

## Next build steps

Proposed order; no delivery dates are committed.

| Priority | Step | Completion criterion |
| --- | --- | --- |
| Done in code | Stabilize development and local BI demo | Pinned runtime/dependencies, lockfile, lint/test/build CI, mobile navigation, and local CSV dashboard. |
| 1 | Validate the demo with a user | Confirm that the CSV schema, metrics, and mobile experience fit an actual business question. |
| 2 | Validate one customer workflow | One concrete BI or document-analysis use case, with an agreed input, output, and success criterion. |
| 3 | Build that workflow end to end | Typed service boundary, one real integration, loading/error states, and meaningful verification of the user flow. |
| 4 | Prepare a customer pilot | Real authentication and workspace authorization, appropriate storage/data handling, protected deployment, and documented smoke/rollback checks. |

Expand chat, agents, automation, and other modules only after the first workflow demonstrates value.

## License

MIT; see [LICENSE](LICENSE).
