import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON-invoer." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
    return NextResponse.json({ error: "Stuur 1 tot 40 chatberichten." }, { status: 400 });
  }
  if (messages.some((item) => !item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string" || item.content.length > 12000)) {
    return NextResponse.json({ error: "Een of meer chatberichten zijn ongeldig." }, { status: 400 });
  }

  const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const model = process.env.OLLAMA_MODEL || "llama3.1:8b";
  try {
    const upstream = await fetch(new URL("/api/chat", baseUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          { role: "system", content: "Je bent Genesis AI, een behulpzame persoonlijke AI-assistent van WolfX BI. Antwoord helder en eerlijk. Maak nooit claims dat je tools hebt uitgevoerd als dat niet zo is. Vraag toestemming voordat je externe, financiële of fysieke acties uitvoert." },
          ...messages,
        ],
      }),
      signal: AbortSignal.timeout(120000),
      cache: "no-store",
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: "De lokale Ollama-server reageerde met een fout. Controleer modelnaam en serverstatus." }, { status: 502 });
    }
    const data = await upstream.json();
    const message = data?.message?.content;
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Het lokale model gaf geen tekstueel antwoord terug." }, { status: 502 });
    }
    return NextResponse.json({ message, model });
  } catch {
    return NextResponse.json({ error: "Geen verbinding met Ollama. Start Ollama lokaal en download het ingestelde model." }, { status: 503 });
  }
}
