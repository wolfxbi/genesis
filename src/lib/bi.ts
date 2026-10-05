export type SalesRow = { date: string; category: string; revenue: number; cost: number };
export const MAX_BYTES = 1_000_000;
export const MAX_ROWS = 10_000;
export const sampleRows: SalesRow[] = Array.from({ length: 36 }, (_, i) => ({
  date: `2026-${String(Math.floor(i / 6) + 1).padStart(2, "0")}-${String((i % 6) * 4 + 1).padStart(2, "0")}`,
  category: ["Consulting", "Dashboards", "Support"][i % 3],
  revenue: 1200 + (i % 7) * 240 + Math.floor(i / 6) * 180,
  cost: 450 + (i % 5) * 140,
}));

// Strict quoted CSV reader: comma or semicolon, escaped quotes, CRLF and BOM.
function readCells(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], field = "", quoted = false, closed = false;
  const pushField = () => { row.push(field.trim()); field = ""; closed = false; };
  const pushRow = () => { pushField(); if (row.some(Boolean)) rows.push(row); row = []; if (rows.length > MAX_ROWS + 1) throw new Error(`Maximum ${MAX_ROWS} records allowed.`); };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else { quoted = false; closed = true; } }
      else field += c;
    } else if (c === delimiter) pushField();
    else if (c === '\n' || c === '\r') { pushRow(); if (c === '\r' && text[i + 1] === '\n') i++; }
    else if (c === '"' && !field && !closed) quoted = true;
    else { if (closed || c === '"') throw new Error("Invalid CSV quoting. Use double quotes around a complete field."); field += c; }
  }
  if (quoted) throw new Error("Unclosed quoted field in CSV.");
  if (field || row.length || closed) pushRow();
  return rows;
}

export function parseSalesCsv(input: string): SalesRow[] {
  if (new TextEncoder().encode(input).length > MAX_BYTES) throw new Error("CSV must be no larger than 1 MB.");
  const text = input.replace(/^\uFEFF/, "");
  const firstLine = text.split(/\r?\n/, 1)[0];
  const delimiter = firstLine.includes(";") ? ";" : ",";
  const [header, ...rows] = readCells(text, delimiter);
  const expected = ["date", "category", "revenue", "cost"];
  const normalized = header?.map(cell => cell.toLowerCase());
  if (!normalized || normalized.length !== 4 || expected.some(key => !normalized.includes(key))) throw new Error("Expected four columns: date, category, revenue, cost (any order).");
  if (!rows.length) throw new Error("The CSV has no data records.");
  return rows.map((cells, i) => {
    const fail = (reason: string): never => { throw new Error(`Record ${i + 1}: ${reason}`); };
    if (cells.length !== 4) fail("expected four fields.");
    const get = (key: string) => cells[normalized.indexOf(key)];
    const date = get("date"), category = get("category");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < "1900-01-01" || date > "2100-12-31" || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) fail("date must be a valid YYYY-MM-DD between 1900 and 2100.");
    if (!category || category.length > 80 || /[\r\n]/.test(category)) fail("category must contain 1–80 characters on one line.");
    const amount = (key: string) => {
      const value = get(key).replace(",", ".");
      if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) > 1_000_000_000) fail(`${key} must be 0–1,000,000,000 with at most two decimal places; omit currency symbols and thousands separators.`);
      return Number(value);
    };
    return { date, category, revenue: amount("revenue"), cost: amount("cost") };
  });
}

export function filterRows(rows: SalesRow[], category: string, from: string, to: string) {
  return rows.filter(row => (!category || row.category === category) && (!from || row.date >= from) && (!to || row.date <= to));
}
export function summarize(rows: SalesRow[]) {
  const revenueCents = rows.reduce((sum, row) => sum + Math.round(row.revenue * 100), 0);
  const costCents = rows.reduce((sum, row) => sum + Math.round(row.cost * 100), 0);
  return { revenue: revenueCents / 100, cost: costCents / 100, profit: (revenueCents - costCents) / 100, margin: revenueCents ? (revenueCents - costCents) / revenueCents * 100 : null, count: rows.length };
}
export function groupRows(rows: SalesRow[], by: "month" | "category") {
  const groups = new Map<string, SalesRow[]>();
  for (const row of rows) { const key = by === "month" ? row.date.slice(0, 7) : row.category; const group = groups.get(key); if (group) group.push(row); else groups.set(key, [row]); }
  return [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([label, values]) => ({ label, ...summarize(values) }));
}
