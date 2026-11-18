# Genesis AI — Development Roadmap

Roadmap order is dependency-driven; dates are intentionally not promised until hardware and deployment requirements are confirmed.

## Phase 0 — Foundation (current)
- [x] Confirm existing Next.js / React / TypeScript project
- [x] Add capability dashboard
- [x] Add local Ollama chat adapter
- [x] Document product scope, architecture, setup and safety boundaries
- [ ] Run build and type checks in the target environment
- [ ] Add automated tests and CI

## Phase 1 — Reliable local assistant
- [ ] Streaming chat responses
- [ ] Conversation history and search
- [ ] Model selector and connection health
- [ ] Local database and user-controlled memory
- [ ] Authentication and local user profile
- [ ] Desktop packaging / local deployment guide

## Phase 2 — Knowledge and documents
- [ ] PDF, DOCX, XLSX, PPTX and CSV ingestion
- [ ] Local embedding model and vector search
- [ ] Answers with document citations
- [ ] Export generated reports
- [ ] Offline language packs

## Phase 3 — Developer Studio and website builder
- [ ] Sandboxed code execution
- [ ] Repository read/write with scoped permissions
- [ ] Code review and test generation
- [ ] Website scaffolding and preview
- [ ] Git integration and approval before commits/deployments

## Phase 4 — Power BI Intelligence
- [ ] DAX and Power Query M assistant
- [ ] SQL and data model analysis
- [ ] PBIX workflow investigation and supported integrations
- [ ] Dashboard design guidance and report QA

## Phase 5 — Forex & Gold Lab
- [ ] Historical market data import
- [ ] XAUUSD and FX chart analysis
- [ ] Position sizing and risk calculator
- [ ] Strategy backtesting and paper trading
- [ ] Live market feed adapter (online only)
- [ ] Broker integration only after explicit risk and approval design

## Phase 6 — Personal Robotics
- [ ] Select robot hardware and control computer
- [ ] ROS 2 gateway and simulator
- [ ] Sensor telemetry and robot status
- [ ] Command allowlist and motion limits
- [ ] Watchdog, physical emergency stop and supervised tests
- [ ] Offline local-network operation

## Phase 7 — Agents and automation
- [ ] Tool registry and permission system
- [ ] Specialist agents
- [ ] Multi-agent workflows with bounded execution
- [ ] Audit trail, approvals, pause and cancel controls

## Definition of done for every module

- Documented scope and limitations
- Unit and integration tests
- Clear offline/online status
- Permission model
- Error handling and audit trail
- No unsafe autonomous side effects
