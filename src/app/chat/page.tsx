"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Bot, LoaderCircle, Send, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welkom bij Genesis AI. Ik ben de eerste chatinterface. Verbind een lokaal Ollama-model om offline gesprekken te voeren." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;
    const next = [...messages, { role: "user" as const, content: prompt }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "De AI-service is niet beschikbaar.");
      setMessages([...next, { role: "assistant", content: data.message }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Onbekende fout.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="flex min-h-screen flex-col bg-[#070b16] text-slate-100">
    <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
      <div className="flex items-center gap-3"><Link href="/dashboard" className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5"><ArrowLeft size={18} /></Link><div><h1 className="font-semibold">Genesis AI Chat</h1><p className="text-xs text-slate-500">Local model · Ollama connector</p></div></div>
      <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Local-first</div>
    </header>
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
      <div className="mb-6 flex items-center gap-3"><div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-300"><Sparkles /></div><div><h2 className="text-xl font-semibold">Waar kan ik je mee helpen?</h2><p className="text-sm text-slate-400">Je berichten worden naar de geconfigureerde lokale modelserver gestuurd.</p></div></div>
      <div className="flex-1 space-y-4">
        {messages.map((message, index) => <div key={index} className={message.role === "user" ? "ml-auto max-w-[85%] rounded-2xl bg-cyan-300 px-4 py-3 text-sm leading-6 text-slate-950" : "max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200"}>{message.role === "assistant" && <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-cyan-300"><Bot size={14} /> GENESIS</div>}{message.content}</div>)}
        {busy && <div className="flex items-center gap-2 text-sm text-slate-400"><LoaderCircle className="animate-spin" size={16} /> Genesis denkt na…</div>}
        {error && <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-200">{error} Controleer of Ollama actief is en het model is gedownload.</div>}
      </div>
      <form onSubmit={sendMessage} className="mt-8 flex gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Stel een vraag aan Genesis…" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-500" />
        <button disabled={busy || !input.trim()} className="rounded-xl bg-cyan-300 px-4 py-3 text-slate-950 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Verstuur bericht"><Send size={17} /></button>
      </form>
      <p className="mt-3 text-center text-[11px] text-slate-600">Gebruik geen geheime sleutels of gevoelige persoonsgegevens in deze eerste ontwikkelversie.</p>
    </section>
  </main>;
}
