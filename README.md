# Genesis

Genesis is an AI Operating Platform prototype by WolfX BI, built with Next.js 15, React 19, TypeScript, Tailwind CSS, and the App Router.

## Current status

**UI prototype with mock content; not a production service.** The app provides a shared platform layout, desktop navigation with active-route highlighting and a collapsible sidebar, a login screen, and a dashboard. Other modules are placeholder pages.

No APIs, database, authentication, authorization, or persistent storage are implemented. The login button links directly to the dashboard; platform routes can be opened without signing in. Dashboard actions, search, and notifications are visual controls only. The mobile menu icon has no interaction and the sidebar is hidden below the desktop breakpoint.

Use the prototype to demonstrate the intended interface with synthetic content. KPI values, “Trust Score,” “Live activity,” and UI wording such as “production-ready” or “secure access” do not establish real operational or security capabilities.

## Routes

| Route | Purpose | Implemented today |
| --- | --- | --- |
| `/` | Entry point | Redirects to `/login`. |
| `/login` | Access screen | Email/password UI and dashboard link; no authentication. |
| `/dashboard` | Command center | Static KPI cards, decorative bar chart, example activity, and agent widgets. |
| `/chat` | AI conversations | Placeholder cards; no chat input, model calls, or conversation memory. |
| `/documents` | Document management | Placeholder cards; no upload, extraction, or storage. |
| `/knowledge-base` | Trusted sources and retrieval | Placeholder cards; no indexing or retrieval. |
| `/business-intelligence` | Analytics and insights | Placeholder cards; no data connectors or Power BI embedding. |
| `/agents` | Specialist AI workers | Placeholder cards; no agent execution or approvals. |
| `/automation` | Business workflows | Placeholder cards; no triggers, runs, or scheduling. |
| `/languages` | Localization | Placeholder cards; no locale switching or translation. |
| `/profile` | Personal workspace details | Placeholder cards; no editable or saved profile. |
| `/settings` | Workspace configuration | Placeholder cards; no saved settings or integrations. |

## Local development

Prerequisites: Git, npm, and a Node.js version compatible with the installed Next.js release. The repository currently does not pin a Node.js version or include a dependency lockfile; several dependencies use `latest`, so installations may resolve differently.

```bash
git clone --branch genesis https://github.com/wolfxbi/genesis.git
cd genesis
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). No API keys or environment variables are required for the current mock UI.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint using `eslint.config.mjs`. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve an existing production build; run build first. |

**Known tooling gap:** `eslint.config.mjs` imports `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`, but these are not declared directly in `package.json`. Resolve dependency/configuration issues before treating lint as a reliable release gate. No automated test script or CI workflow is currently included.

## Code structure and adding a feature

| Location | Responsibility |
| --- | --- |
| `src/app/page.tsx`, `src/app/login/page.tsx` | Entry redirect and login UI. |
| `src/app/(platform)/` | Platform routes and shared layout; the route group does not appear in URLs. |
| `src/components/app-shell.tsx` | Sidebar, header, and layout interactions. |
| `src/components/page-card.tsx` | Shared placeholder module presentation. |
| `src/lib/navigation.ts` | Brand icon and platform navigation items. |
| `src/app/globals.css` | Global styles and visual effects. |

1. Create a feature branch from `genesis` and define the smallest user flow and acceptance criteria.
2. Add `src/app/(platform)/<feature>/page.tsx` and a matching entry in `src/lib/navigation.ts` when navigation is needed.
3. Reuse shared components; add a Client Component only where browser state or interaction is required.
4. Keep synthetic fixtures separate from rendering as the feature grows. Clearly label demo values and implement loading, empty, and error states for asynchronous work.
5. Run lint and build, check the direct route and navigation on desktop/mobile, and update this README when functionality or setup changes.

## Mock data and future API boundaries

Current fixtures live inline in `src/app/(platform)/dashboard/page.tsx`: KPI values, bar heights, activity messages, and agent names. Module titles and capability labels live in their route pages and are rendered through `PageCard`. They are descriptive UI content, not working features or API responses.

For future integrations, introduce typed data contracts and a service layer (for example, `src/lib/services/`; not present yet). Use server-side handlers or server code for provider calls and credentials. Define authentication, workspace authorization, validation, persistence, and error handling before accepting customer data. Keep secrets in server environment variables, never in browser-exposed `NEXT_PUBLIC_*` values. Add a secret-free `.env.example` when variables become necessary.

Chat/model calls, document storage and extraction, retrieval, BI connectors, and workflow execution are separate future integrations. Build one validated end-to-end use case first; the existing routes do not imply these services are available.

## Deployment verification

No hosting configuration, CI pipeline, or verified deployment URL is committed. Dashboard copy mentions Vercel as an intended target, but deployment is not established by that text.

Before a release or customer demo:

- [ ] Resolve tooling gaps, pin the runtime/dependencies, and commit a lockfile. Use `npm ci` for clean installs once a lockfile exists.
- [ ] Run `npm run lint` and `npm run build`; investigate failures rather than bypassing checks.
- [ ] Run `npm run start` and check every route above by direct URL and navigation. Confirm `/` redirects to `/login`.
- [ ] Check desktop and narrow mobile layouts, keyboard access, readable labels, and browser/server errors. Track the unfinished mobile menu explicitly.
- [ ] Deploy the tested commit to the chosen preview environment. For a Node deployment, use the build/start scripts and the host's assigned port.
- [ ] Repeat route and layout checks on the deployed URL; record the commit, URL, check results, and any known limitations.
- [ ] For restricted demos, enable and verify hosting-level access protection. The current login screen provides no access control.
- [ ] Show only synthetic data and explain the prototype status. Verify rollback to the previous deployment before a production release.

These are required checks, not a record that deployment or runtime tests have passed.

## Next build steps

Proposed order; no delivery dates are committed.

| Priority | Step | Completion criterion |
| --- | --- | --- |
| 1 | Stabilize development and release checks | Pinned runtime, committed lockfile, explicit lint dependencies, passing lint/build, and a basic CI gate. |
| 2 | Make the demo usable and honest | Working mobile navigation, accessible controls, visible mock labels, and disabled or explained inactive actions. |
| 3 | Validate one customer workflow | One concrete BI or document-analysis use case, with an agreed input, output, and success criterion. |
| 4 | Build that workflow end to end | Typed service boundary, one real integration, loading/error states, and meaningful verification of the user flow. |
| 5 | Prepare a customer pilot | Real authentication and workspace authorization, appropriate storage/data handling, protected deployment, and documented smoke/rollback checks. |

Expand chat, agents, automation, and other modules only after the first workflow demonstrates value.

## License

MIT; see [LICENSE](LICENSE).
