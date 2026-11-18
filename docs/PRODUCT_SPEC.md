# Genesis AI — Product Specification

**Owner:** WolfX BI  
**Product:** Genesis AI  
**Release target:** Foundation 0.1  
**Status:** Active development

## 1. Product vision

Genesis AI is a private, modular AI operating platform. It combines a local-first assistant with optional online capabilities and specialist workspaces for software development, website creation, Power BI, translation, forex research, document work, AI agents, and personal robotics.

The user owns the product experience, application architecture, configuration, and data environment. Genesis may use third-party open-weight models or hosted model APIs; it is not a claim that a foundation model has been trained from scratch.

## 2. Product principles

1. **Local-first:** core chat and local-file workflows should be usable without internet when suitable models and dependencies are installed.
2. **Offline honesty:** live prices, web search, hosted APIs, cloud sync, and current external information require connectivity.
3. **Human control:** no real-money trades, publishing, destructive file operations, or physical robot motion without explicit authorization and configured safeguards.
4. **Modular:** each capability is an independently testable module behind stable interfaces.
5. **Privacy by design:** local storage by default; secrets are never committed to source control.
6. **Observable:** errors, model availability, and action status must be visible to the user.

## 3. Capability map

| Module | Target capabilities | Dependency / constraint |
|---|---|---|
| Personal Assistant | Chat, preferences, user-controlled memory, voice | Local model; optional speech models |
| Developer Studio | Code generation, explanation, review, tests, website scaffolding | Sandboxed execution and repository permissions |
| Power BI Intelligence | DAX, Power Query M, SQL, data modelling, report guidance | Power BI Desktop for authoring; local files / connectors |
| Translator | Text, documents, subtitles, speech translation | Downloaded language models for offline use |
| Forex & Gold Lab | XAUUSD and FX analysis, journal, position sizing, backtests | Historical data offline; live feeds online |
| Personal Robotics | ROS 2, microcontrollers, sensors, navigation and robot status | Hardware drivers, local network, emergency stop |
| Documents | PDF, DOCX, XLSX, PPTX and CSV workflows | File parsers and explicit file permissions |
| AI Agents | Specialist agents and multi-step workflows | Tool allowlists, approvals, audit log |
| Knowledge Base | Local documents, retrieval and citations | Local embedding model and vector store |
| Admin & Security | Users, secrets, audit, backups, policy controls | Authentication and deployment configuration |

## 4. Non-goals for the first release

- Training a frontier-scale language model from scratch.
- Autonomous live trading or financial account access.
- Unsupervised physical robot control.
- Claiming universal or perfect translation.
- Promising all features work offline without pre-downloaded models and local dependencies.

## 5. First release acceptance criteria

- The Next.js app starts locally.
- Dashboard identifies implemented versus planned capabilities.
- Chat UI sends validated messages to a local Ollama endpoint.
- A missing local model produces a clear actionable error.
- No API key or secret is required for local Ollama chat.
- Setup, configuration, limitations, and safety controls are documented.
