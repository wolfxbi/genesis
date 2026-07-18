import { ArrowUpRight } from "lucide-react";

export function PageCard({ title, eyebrow, description, stats }: { title: string; eyebrow: string; description: string; stats: string[] }) {
  return <section className="space-y-8">
    <div className="glass overflow-hidden rounded-[2rem] p-8 md:p-12">
      <p className="text-sm uppercase tracking-[.4em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-lg text-slate-300">{description}</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">{stats.map((stat, index) => <div key={stat} className="glass rounded-3xl p-6 transition hover:-translate-y-1"><div className="mb-8 flex justify-between text-cyan-300"><span>0{index + 1}</span><ArrowUpRight /></div><p className="text-2xl font-semibold">{stat}</p><p className="mt-2 text-sm text-slate-400">Ready for API connection in a future phase.</p></div>)}</div>
  </section>;
}
