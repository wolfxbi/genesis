# Genesis AI — WolfX BI

**Genesis AI** is a local-first, modular personal AI operating platform by WolfX BI. The project is designed to bring personal AI chat, software development, website creation, Power BI assistance, translation, forex research, document workflows, AI agents, and personal robotics into one controlled workspace.

> Foundation release: the dashboard and a local Ollama chat connector are implemented. The other capability areas are documented roadmap items, not finished features.

## Vision

- Your own product, interface, application architecture, and configurable data environment.
- Local model inference for offline-capable workflows.
- Optional online services for live information and hosted models.
- Specialist modules that can be developed and tested independently.
- Explicit human approval before financial, external, destructive, or physical actions.

Genesis does **not** claim to train a foundation model from scratch. It can use locally hosted open-weight models and, in future, optional hosted providers.

## Technology

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- lucide-react
- Ollama local model API

## Current routes

- `/login` — initial access screen (visual only; authentication is not implemented)
- `/dashboard` — Genesis capability dashboard
- `/chat` — local AI chat interface

## Implemented in Foundation 0.1

- Capability dashboard with clear planned/implemented labels.
- Chat UI with request validation and actionable connection errors.
- Server-side adapter to a local Ollama instance.
- Environment-based model configuration.
- Product, architecture, security, setup, and roadmap documentation.

## Not implemented yet

Persistent memory, authentication, document ingestion, vector search, voice, translation, code execution, website publishing, Power BI integrations, live market data, broker execution, robotics control, and autonomous agents remain future work. See [the roadmap](docs/ROADMAP.md).

## Quick start

Requirements: Node.js 20+, npm, and Ollama installed locally.

```bash
npm install
ollama pull llama3.1:8b
ollama serve
```

Create `.env.local` from `.env.example`:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.1:8b
```

Run the web app:

```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

The example model is configurable; choose a model appropriate for your computer's RAM and GPU memory. Local inference can work without internet after the application dependencies and model have been installed. Live prices, web search, cloud APIs, and remote services still require internet.

## Documentation

- [Product specification](docs/PRODUCT_SPEC.md)
- [Technical architecture](docs/ARCHITECTURE.md)
- [Local setup](docs/LOCAL_SETUP.md)
- [Development roadmap](docs/ROADMAP.md)
- [Security and safety](docs/SECURITY.md)

## Safety baseline

- Generated code is untrusted and must not execute automatically.
- Never commit secrets or credentials.
- Do not expose Ollama directly to the public internet.
- Trading starts with analysis, historical testing, and paper trading; no live order placement is included.
- Robotics starts in simulation and requires controller-level safety limits, watchdogs, and a physical emergency stop.

## Project

Built by **WolfX BI**. Repository: https://github.com/wolfxbi/genesis
