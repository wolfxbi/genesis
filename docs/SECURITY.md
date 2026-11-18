# Genesis AI — Security and Safety Baseline

## Development baseline

- Treat all model output as untrusted input.
- Never run generated shell commands or code automatically.
- Do not store passwords, tokens, broker credentials, or private keys in the repository.
- Keep Ollama bound to localhost unless a secured private network setup is deliberately configured.
- Add authentication, CSRF protections where applicable, rate limits, and request size limits before public exposure.
- Use least-privilege filesystem and repository permissions.

## Trading safeguards

- Analysis and backtesting only by default.
- No broker order placement in the foundation release.
- Any future order workflow must include explicit user confirmation, max position size, max daily loss, stop-loss policy, and a kill switch.
- Historical or delayed data must never be represented as live data.

## Robotics safeguards

- Start in simulation.
- Use an explicit command allowlist.
- Enforce speed, force, workspace, and payload limits at the controller level.
- Require a physical emergency stop and watchdog.
- Never rely on the language model as the only safety controller.
- Human supervision is required for physical movement during development.

## Incident response

Stop the affected service, preserve relevant logs, revoke exposed credentials, assess data exposure, and restore from a known-good backup. Document the incident before re-enabling the capability.
