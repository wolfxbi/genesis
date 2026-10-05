"use client";

import { useMemo, useRef, useState } from "react";
import { BarChart3, Download, Upload, RotateCcw } from "lucide-react";
import { filterRows, groupRows, MAX_BYTES, parseSalesCsv, sampleRows, summarize, type SalesRow } from "@/lib/bi";

const euro = (value: number) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);
const control = "rounded-xl border border-white/15 bg-slate-900 px-3 py-2.5 text-sm";
const button = "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:bg-white/10 disabled:opacity-50";

export function BiDashboard() {
  const [rows, setRows] = useState<SalesRow[]>(sampleRows);
  const [source, setSource] = useState("Synthetic sample data");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [page, setPage] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const resetFilters = () => { setCategory(""); setFrom(""); setTo(""); setPage(0); };
  const invalidRange = !!from && !!to && from > to;
  const filtered = useMemo(() => filterRows(rows, category, from, to), [rows, category, from, to]);
  const summary = summarize(filtered);
  const months = groupRows(filtered, "month");
  const categories = groupRows(filtered, "category").sort((a, b) => b.revenue - a.revenue);
  const maxRevenue = Math.max(1, ...months.map(row => row.revenue));
  const pageCount = Math.max(1, Math.ceil(filtered.length / 20));
  const currentPage = Math.min(page, pageCount - 1);
  async function importFile(file?: File) {
    if (!file) return;
    setBusy(true); setError("");
    try {
      if (file.size > MAX_BYTES) throw new Error("CSV must be no larger than 1 MB.");
      const data = parseSalesCsv(await file.text());
      setRows(data); setSource(file.name); resetFilters();
    } catch (e) { setError(e instanceof Error ? e.message : "Could not read this file. Try the sample CSV."); }
    finally { setBusy(false); if (input.current) input.current.value = ""; }
  }
  return <div className="mx-auto max-w-7xl space-y-6">
    <section className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-300"><BarChart3 size={16} aria-hidden="true" /> Business intelligence <span className="rounded-full bg-cyan-300/10 px-3 py-1 tracking-normal">Local analysis</span></div>
      <h1 className="mt-4 text-3xl font-bold md:text-5xl">Your numbers. A clearer view.</h1>
      <p className="mt-3 max-w-2xl text-slate-300">Explore revenue, costs and operating result. Filter the sample dataset or bring a CSV with the same columns. All amounts are interpreted as EUR.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button disabled={busy} onClick={() => input.current?.click()} className={`${button} bg-cyan-300 font-semibold text-slate-950 hover:bg-cyan-200`}><Upload size={16} aria-hidden="true" />{busy ? "Reading CSV…" : "Import CSV"}</button>
        <input ref={input} type="file" accept=".csv,text/csv" aria-label="Choose CSV file" className="sr-only" tabIndex={-1} onChange={event => void importFile(event.target.files?.[0])} />
        <a href="/genesis-sales-example.csv" download className={button}><Download size={16} aria-hidden="true" />Example CSV</a>
        <button disabled={busy} className={button} onClick={() => { setRows(sampleRows); setSource("Synthetic sample data"); setError(""); resetFilters(); }}><RotateCcw size={16} aria-hidden="true" />Reset sample</button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">Processed in this tab, never uploaded. Data is cleared on reload or when leaving this page. Maximum 1 MB / 10,000 records.</p>
      <details className="mt-4 text-sm text-slate-300"><summary className="cursor-pointer">CSV format and calculation rules</summary><p className="mt-3">Required headers: date, category, revenue, cost. Use YYYY-MM-DD dates, comma or semicolon separators, and non-negative amounts without currency symbols or thousands separators. Decimal commas must be quoted in comma-separated files. Each record is a revenue/cost observation; records are not counted as orders. Duplicate records are included. Result = revenue − cost; margin = result ÷ revenue. No currency conversion, tax calculation, or missing-month estimation is applied.</p></details>
    </section>
    <div role="status" className="break-words text-sm text-slate-300">Source: <strong>{source}</strong> · {rows.length.toLocaleString("en")} records</div>
    {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-rose-200">{error} Previous data has been kept.</p>}
    <section aria-label="Filters" className="glass grid gap-4 rounded-2xl p-4 sm:grid-cols-2 xl:grid-cols-4">
      <label className="flex flex-col gap-2 text-sm text-slate-300">Category<select className={control} value={category} onChange={e => { setCategory(e.target.value); setPage(0); }}><option value="">All categories</option>{[...new Set(rows.map(row => row.category))].sort().map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="flex flex-col gap-2 text-sm text-slate-300">From<input type="date" className={control} value={from} onChange={e => { setFrom(e.target.value); setPage(0); }} /></label>
      <label className="flex flex-col gap-2 text-sm text-slate-300">To<input type="date" className={control} value={to} onChange={e => { setTo(e.target.value); setPage(0); }} /></label>
      <button onClick={resetFilters} className={`${button} self-end`}>Clear filters</button>
    </section>
    {invalidRange && <p role="alert" className="text-rose-200">The start date must be on or before the end date.</p>}
    <p aria-live="polite" className="text-sm text-slate-400">{filtered.length} of {rows.length} records match the filters.</p>
    <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
      ["Revenue", euro(summary.revenue)], ["Costs", euro(summary.cost)], ["Operating result", euro(summary.profit)], ["Margin", summary.margin === null ? "—" : `${summary.margin.toFixed(1)}%`],
    ].map(([label, value]) => <div key={label} className="glass min-w-0 rounded-2xl p-5"><h2 className="text-sm text-slate-400">{label}</h2><p className="mt-3 break-words text-2xl font-semibold text-cyan-100">{value}</p><p className="mt-2 text-xs text-slate-500">Filtered records{label === "Margin" && summary.margin === null ? " · no revenue" : ""}</p></div>)}</section>
    {!filtered.length ? <section className="glass rounded-2xl p-8 text-center"><h2 className="text-xl font-semibold">No matching records</h2><p className="mt-2 text-slate-400">Adjust the dates or clear your filters to see the dataset again.</p></section> : <>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="glass min-w-0 rounded-2xl p-5"><h2 className="text-lg font-semibold">Monthly revenue</h2><p className="mt-1 text-xs text-slate-400">EUR · months present in filtered data</p><div className="mt-6 max-h-80 space-y-4 overflow-y-auto pr-2">{months.map(row => <div key={row.label}><div className="mb-2 flex flex-wrap justify-between gap-2 text-sm"><span>{row.label}</span><span>{euro(row.revenue)}</span></div><div className="h-3 rounded-full bg-white/5"><div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${row.revenue / maxRevenue * 100}%` }} /></div></div>)}</div></div>
        <div className="glass min-w-0 rounded-2xl p-5"><h2 className="text-lg font-semibold">Revenue by category</h2><p className="mt-1 text-xs text-slate-400">Share of filtered revenue · top 10</p><div className="mt-6 space-y-4">{categories.slice(0, 10).map(row => <div key={row.label}><div className="mb-2 flex flex-wrap justify-between gap-2 text-sm"><span className="break-all">{row.label}</span><span>{euro(row.revenue)} · {summary.revenue ? (row.revenue / summary.revenue * 100).toFixed(1) : "0.0"}%</span></div><div className="h-3 rounded-full bg-white/5"><div className="h-3 rounded-full bg-emerald-400" style={{ width: `${summary.revenue ? row.revenue / summary.revenue * 100 : 0}%` }} /></div></div>)}</div></div>
      </section>
      <section className="glass min-w-0 rounded-2xl p-5"><h2 className="text-lg font-semibold">Underlying records</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Filtered source records, all amounts in EUR</caption><thead className="border-b border-white/10 text-slate-400"><tr>{["Date", "Category", "Revenue", "Costs", "Result"].map(label => <th key={label} scope="col" className="whitespace-nowrap p-3">{label}</th>)}</tr></thead><tbody>{filtered.slice(currentPage * 20, currentPage * 20 + 20).map((row, index) => <tr key={index} className="border-b border-white/5"><td className="whitespace-nowrap p-3">{row.date}</td><td className="max-w-64 break-words p-3">{row.category}</td><td className="whitespace-nowrap p-3">{euro(row.revenue)}</td><td className="whitespace-nowrap p-3">{euro(row.cost)}</td><td className="whitespace-nowrap p-3">{euro((Math.round(row.revenue * 100) - Math.round(row.cost * 100)) / 100)}</td></tr>)}</tbody></table></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><span>Page {currentPage + 1} of {pageCount}</span><div className="flex gap-2"><button className={button} disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous</button><button className={button} disabled={currentPage + 1 >= pageCount} onClick={() => setPage(currentPage + 1)}>Next</button></div></div></section>
    </>}
  </div>;
}
