# Genesis AI — Technical Architecture

## 1. Current stack

- Web application: Next.js 15 App Router
- UI: React 19, TypeScript, Tailwind CSS
- Icons: lucide-react
- Local model runtime: Ollama HTTP API
- Configuration: environment variables
- Repository: `wolfxbi/genesis`

## 2. Logical architecture

```text
Browser / Desktop UI
        |
        v
Next.js application + API routes
        |
        +---- Chat adapter ----------------> Local Ollama
        |
        +---- Capability interfaces (planned)
        |       +-- Developer tools
        |       +-- Power BI tools
        |       +-- Translation models
        |       +-- Trading research
        |       +-- Robotics gateway
        |       +-- Document processing
        |
        +---- Policy / approval layer (required before actions)
        |
        +---- Local data layer (planned)
                +-- Relational metadata
                +-- Vector index
                +-- Encrypted files / secrets
                +-- Audit events
```

## 3. Current implementation

- `/dashboard`: capability overview.
- `/chat`: chat interface.
- `POST /api/chat`: validates messages and forwards them to Ollama.
- `.env.example`: local model configuration.

The current chat route uses a non-streaming Ollama request. It does not provide authentication, persistent chat history, retrieval, or tool execution yet.

## 4. Local model configuration

Default values:

- Base URL: `http://127.0.0.1:11434`
- Model: `llama3.1:8b`

Override using environment variables. Download a model separately before use. Model size and performance depend on RAM, GPU/VRAM, quantization, and context length.

## 5. Offline and online boundaries

**Offline-capable when installed locally:** chat inference, local document retrieval (once implemented), local translation (with downloaded models), local code assistance, historical data analysis, and robot communication over a local network.

**Connectivity required:** public web search, live forex quotes, hosted model APIs, cloud services, remote repositories, and external synchronization.

## 6. Planned data and service boundaries

- Model gateway: one interface for local and hosted models.
- Tool registry: explicit allowlist of available tools.
- Agent orchestrator: task planning with bounded steps.
- Knowledge service: local document ingestion, chunking, embeddings, retrieval and citations.
- Trading service: analysis and simulation first; broker execution excluded until separate authorization and risk controls exist.
- Robotics gateway: ROS 2 bridge with command allowlists, speed/force limits, watchdog and physical emergency stop.

## 7. Security requirements

- Bind local model services to loopback by default.
- Do not expose Ollama directly to the public internet.
- Add authentication before any public deployment.
- Validate and limit all API input.
- Never execute generated code in the web server process.
- Run code in isolated containers with resource and network limits.
- Store credentials in environment/secret management, never in Git.
- Require explicit confirmation for external side effects.
