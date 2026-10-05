"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { brand, navItems } from "@/lib/navigation";
import { clsx } from "clsx";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const BrandIcon = brand.icon;
  const links = (compact = false) => navItems.map(({ href, label, icon: Icon }) => (
    <Link key={href} href={href} title={compact ? label : undefined} aria-label={compact ? label : undefined}
      aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}
      className={clsx("flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-white/10", pathname === href ? "bg-cyan-400/15 text-cyan-200" : "text-slate-300")}>
      <Icon size={20} aria-hidden="true" />{!compact && label}
    </Link>
  ));
  return <div className="grid-bg min-h-screen bg-slate-950">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-slate-900 focus:p-4">Skip to content</a>
    <aside className={clsx("glass fixed left-4 top-4 z-30 hidden h-[calc(100dvh-2rem)] flex-col overflow-y-auto rounded-3xl p-3 lg:flex", collapsed ? "w-24" : "w-64")}>
      <Link href="/dashboard" aria-label="Genesis dashboard" className="flex items-center gap-3 px-3 py-4"><BrandIcon className="shrink-0 text-cyan-300" aria-hidden="true" />{!collapsed && <span><strong>Genesis</strong><span className="block text-xs text-slate-400">WolfX BI</span></span>}</Link>
      <nav aria-label="Main navigation" className="mt-4 flex-1 space-y-1">{links(collapsed)}</nav>
      <button onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} className="mt-4 rounded-xl border border-white/10 p-3"><ChevronLeft className={collapsed ? "rotate-180" : ""} aria-hidden="true" /></button>
    </aside>
    <div className={collapsed ? "lg:pl-32" : "lg:pl-72"}>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:px-8">
        <div className="flex items-center gap-3">
          <button ref={menuButton} onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" className="rounded-xl border border-white/10 p-3 lg:hidden">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
          <div className="min-w-0"><p className="text-xs uppercase tracking-widest text-cyan-300">WolfX BI / Genesis</p><p className="text-lg font-semibold">Business workspace</p></div>
          <span className="ml-auto rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200">Prototype</span>
        </div>
        {open && <nav id="mobile-navigation" aria-label="Mobile navigation" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } }} className="mt-4 max-h-[65dvh] space-y-1 overflow-y-auto border-t border-white/10 pt-3 lg:hidden">{links()}</nav>}
      </header>
      <main id="main-content" className="min-w-0 p-4 lg:p-8">{children}</main>
    </div>
  </div>;
}
