# Genesis AI — Local Development Setup

## Requirements

- Node.js 20 or later
- npm
- Ollama installed locally
- A model compatible with the available computer

## 1. Install dependencies

```bash
npm install
```

## 2. Install and start Ollama

Install Ollama using the official instructions for your operating system, then download a model. Example:

```bash
ollama pull llama3.1:8b
ollama serve
```

The model shown is a configurable example. Choose a smaller quantized model if RAM or GPU memory is limited.

## 3. Configure Genesis

Copy `.env.example` to `.env.local` and adjust:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.1:8b
```

## 4. Start the application

```bash
npm run dev
```

Open http://localhost:3000/dashboard.

## 5. Verify chat

Open the AI Chat workspace and send a test message. If the service is unavailable, verify Ollama is running and the configured model has been downloaded.

## Offline use

After application dependencies and the model are installed, local chat can run without internet provided the machine and local Ollama service remain available. Initial installation, model downloads, online services, live market feeds and web research require internet access.

## Troubleshooting

- **Connection refused:** start Ollama and confirm it listens on port 11434.
- **Model not found:** run `ollama pull <model-name>` and match `OLLAMA_MODEL`.
- **Slow responses:** use a smaller quantized model or a machine with more memory / GPU capacity.
- **Remote deployment:** do not expose the local Ollama endpoint publicly; add authentication and a secured private gateway first.
