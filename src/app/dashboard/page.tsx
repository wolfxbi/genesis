import Link from "next/link";
import { Activity, Bot, BrainCircuit, ChartNoAxesCombined, Code2, Languages, LockKeyhole, MessageSquare, Monitor, RadioTower, Sparkles, Workflow } from "lucide-react";

const modules = [
  { name: "AI Chat", description: "Chat met een lokaal taalmodel via Ollama.", icon: MessageSquare, status: "Eerste module", href: "/chat", active: true },
  { name: "Developer Studio", description: "Code schrijven, uitleggen en controleren.", icon: Code2, status: "Gepland" },
  { name: "Power BI Intelligence", description: "DAX, Power Query, datamodellen en rapportages.", icon: ChartNoAxesCombined, status: "Gepland" },
  { name: "Translator", description: "Meertalige tekst- en documentvertaling.", icon: Languages, status: "Gepland" },
  { name: "Forex & Gold Lab", description: "Marktanalyse, backtesting en risicobeheer.", icon: Activity, status: "Gepland" },
  { name: "Personal Robotics", description: "Lokale robotbesturing met expliciete veiligheidsgrenzen.", icon: Bot, status: "Gepland" },
  { name: "AI Agents", description: "Gespecialiseerde agents en goedgekeurde workflows.", icon: Workflow, status: "Gepland" },
  { name: "Local Brain", description: "Lokale modellen, kennisbank en geheugen.", icon: BrainCircuit, status: "In ontwerp" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#070b16] text-slate-100">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-300 p-3 text-slate-950"><Sparkles size={22} /></div>
            <div><p className="text-xl font-bold tracking-wide">GENESIS <span className="text-cyan-300">AI</span></p><p className="text-xs text-slate-400">WolfX BI · Personal Intelligence OS</p></div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Local-first architectuur</div>
        </header>

        <section className="grid-bg relative mt-8 overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/10 via-slate-900 to-violet-500/10 p-7 sm:p-10">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Your private AI command center</p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">Eén intelligentie.<br /><span className="text-cyan-300">Meerdere mogelijkheden.</span></h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Een uitbreidbaar AI-platform voor chat, softwareontwikkeling, Power BI, vertalen, trading en persoonlijke robotica. Ontworpen om lokaal te draaien en online uit te breiden wanneer jij dat wilt.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/chat" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"><MessageSquare size={17} /> Open AI Chat</Link>
              <a href="https://github.com/wolfxbi/genesis" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"><Code2 size={17} /> Repository</a>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex items-center gap-2 text-slate-400"><Monitor size={16} /><span className="text-xs">Platform</span></div><p className="mt-3 text-lg font-semibold">Local-first</p><p className="mt-1 text-xs text-slate-500">Offline-capable ontwerp</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex items-center gap-2 text-slate-400"><RadioTower size={16} /><span className="text-xs">Modelverbinding</span></div><p className="mt-3 text-lg font-semibold">Ollama</p><p className="mt-1 text-xs text-slate-500">Lokale modelserver vereist</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex items-center gap-2 text-slate-400"><LockKeyhole size={16} /><span className="text-xs">Veiligheidsbeleid</span></div><p className="mt-3 text-lg font-semibold">Human approval</p><p className="mt-1 text-xs text-slate-500">Geen autonome financiële of fysieke acties</p></div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Capability modules</p><h2 className="mt-2 text-2xl font-semibold">Genesis werkruimtes</h2></div><span className="text-xs text-slate-500">Versie 0.1 · Foundation</span></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const content = <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"><div className="flex items-start justify-between"><div className="rounded-xl bg-cyan-300/10 p-3 text-cyan-300"><Icon size={21} /></div><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-slate-400">{module.status}</span></div><h3 className="mt-5 font-semibold">{module.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">{module.description}</p>{module.active && <p className="mt-4 text-xs font-semibold text-cyan-300">Open module →</p>}</div>;
              return module.href ? <Link key={module.name} href={module.href}>{content}</Link> : <div key={module.name}>{content}</div>;
            })}
          </div>
        </section>
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-500"><span>GENESIS AI · Built by WolfX BI</span><span>Foundation release · Features marked planned are not implemented yet</span></footer>
      </div>
    </main>
  );
}
