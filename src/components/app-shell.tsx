"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronLeft, Command, Menu, Search } from "lucide-react";
import { useState } from "react";
import { brand, navItems } from "@/lib/navigation";
import { clsx } from "clsx";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const BrandIcon = brand.icon;
  return <div className="grid-bg min-h-screen overflow-hidden bg-slate-950">
    <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,.22),transparent_30%),radial-gradient(circle_at_bottom,rgba(16,185,129,.14),transparent_30%)]" />
    <aside className={clsx("fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] flex-col rounded-3xl p-3 transition-all duration-300 lg:flex glass", collapsed ? "w-24" : "w-72")}>
      <div className="flex items-center gap-3 px-3 py-4"><div className="rounded-2xl bg-cyan-400 p-2 text-slate-950"><BrandIcon /></div>{!collapsed && <div><p className="font-bold">Genesis</p><p className="text-xs text-slate-400">WolfX BI</p></div>}</div>
      <nav className="mt-4 flex flex-1 flex-col gap-2">{navItems.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={clsx("flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition hover:bg-white/10", active ? "bg-cyan-400/15 text-cyan-200" : "text-slate-300") }><Icon size={20}/>{!collapsed && <span>{item.label}</span>}</Link>; })}</nav>
      <button onClick={() => setCollapsed(!collapsed)} className="rounded-2xl border border-white/10 p-3 text-slate-300 hover:bg-white/10"><ChevronLeft className={clsx("transition", collapsed && "rotate-180")} /></button>
    </aside>
    <main className={clsx("transition-all duration-300", collapsed ? "lg:pl-32" : "lg:pl-80")}>
      <header className="sticky top-0 z-20 mx-4 flex items-center justify-between border-b border-white/10 bg-slate-950/70 py-4 backdrop-blur-xl lg:mx-8">
        <div className="flex items-center gap-3"><Menu className="lg:hidden"/><div><p className="text-xs uppercase tracking-[.35em] text-cyan-300">AI Operating Platform</p><h1 className="text-xl font-semibold">Genesis Command Center</h1></div></div>
        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-slate-400 md:flex"><Search size={18}/> Search workflows, agents, docs <Command size={14}/></div>
        <button className="rounded-2xl border border-white/10 p-3"><Bell size={18}/></button>
      </header>
      <div className="p-4 lg:p-8">{children}</div>
    </main>
  </div>;
}
