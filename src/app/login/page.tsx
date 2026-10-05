import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Login() {
  return <main className="grid-bg flex min-h-screen items-center justify-center bg-slate-950 p-6"><section className="glass w-full max-w-md rounded-3xl p-8"><BrainCircuit className="mb-6 text-cyan-300" size={40} aria-hidden="true" /><p className="text-sm text-cyan-300">WOLFX BI</p><h1 className="mt-2 text-4xl font-bold">Welcome to Genesis</h1><p className="mt-4 leading-relaxed text-slate-300">Explore your business data in a focused workspace. Start with sample data or import a CSV in your browser.</p><Link href="/business-intelligence" className="mt-8 block rounded-xl bg-cyan-300 px-4 py-3 text-center font-semibold text-slate-950">Explore BI workspace</Link><Link href="/dashboard" className="mt-4 block text-center text-sm text-slate-300 underline">View platform overview</Link><p className="mt-6 text-sm text-slate-400">Prototype · No account required. Imported files stay in this browser tab and are cleared when you reload or leave the BI page.</p></section></main>;
}
