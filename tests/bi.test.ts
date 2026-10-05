import { test } from "node:test";
import assert from "node:assert/strict";
import { filterRows, groupRows, parseSalesCsv, summarize, MAX_ROWS } from "../src/lib/bi";
const header = "date,category,revenue,cost\n";
test("quoted CSV, BOM, CRLF, reordered headers and decimal commas", () => {
  const rows = parseSalesCsv('\uFEFFcost;category;date;revenue\r\n12,50;"Sales; ""West""";2026-01-01;100,25\r\n');
  assert.deepEqual(rows, [{date:"2026-01-01",category:'Sales; "West"',revenue:100.25,cost:12.5}]);
});
test("filter and aggregate actual monetary values, including loss and zero revenue", () => {
  const rows = parseSalesCsv(header + '2026-01-01,A,0.10,0.20\n2026-01-31,A,0.20,0.40\n2026-02-01,B,0,10');
  assert.deepEqual(summarize(filterRows(rows, "A", "2026-01-01", "2026-01-31")), {revenue:0.3,cost:0.6,profit:-0.3,margin:-100,count:2});
  assert.equal(summarize([rows[2]]).margin, null);
  assert.equal(groupRows(rows, "month").length, 2);
  assert.deepEqual(filterRows(rows,"", "2026-03-01","2026-01-01"), []);
});
test("reject invalid schema, empty, malformed, impossible dates and amounts", () => {
  for (const csv of ["", header, "date,category,revenue,revenue\n2026-01-01,A,1,2", header+'2026-02-30,A,1,2', header+'2026-01-01,A,,2', header+'2026-01-01,A,NaN,2', header+'2026-01-01,A,-1,2', header+'2026-01-01,A,1.001,2', header+'2026-01-01,"A,1,2', header+'2026-01-01,"A"oops,1,2', header+'2026-01-01,A,1,2,3']) assert.throws(() => parseSalesCsv(csv));
});
test("reject oversized input and too many records", () => {
  assert.throws(() => parseSalesCsv("a".repeat(1_000_001)), /1 MB/);
  assert.throws(() => parseSalesCsv(header + "2026-01-01,A,1,2\n".repeat(MAX_ROWS + 1)), /Maximum/);
});
test("duplicate observations remain included and prototype-like category names are safe", () => {
  const rows = parseSalesCsv(header + '2026-01-01,__proto__,1,2\n2026-01-01,__proto__,1,2');
  assert.equal(groupRows(rows,"category")[0].revenue, 2);
});
