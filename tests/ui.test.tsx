import React from "react";
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost" });
Object.defineProperty(globalThis, "window", {value: dom.window, configurable:true});
Object.defineProperty(globalThis, "document", {value: dom.window.document, configurable:true});
Object.defineProperty(globalThis, "navigator", {value: dom.window.navigator, configurable:true});
Object.assign(globalThis, { HTMLElement: dom.window.HTMLElement, self: dom.window, React });

test("BI filters, local import, error preservation, reset and pagination", async () => {
  const { render, fireEvent, waitFor, cleanup } = await import("@testing-library/react");
  const { BiDashboard } = await import("../src/components/bi-dashboard");
  const view = render(<BiDashboard />);
  assert.ok(view.getByText("36 of 36 records match the filters."));
  fireEvent.click(view.getByRole("button", {name:"Next"}));
  assert.ok(view.getByText("Page 2 of 2"));
  fireEvent.change(view.getByLabelText("Category"), {target:{value:"Consulting"}});
  assert.ok(view.getByText("12 of 36 records match the filters."));
  fireEvent.change(view.getByLabelText("From"), {target:{value:"2026-12-31"}});
  assert.ok(view.getByText("No matching records"));
  fireEvent.click(view.getByRole("button", {name:"Clear filters"}));
  const upload = view.getByLabelText("Choose CSV file");
  fireEvent.change(upload, {target:{files:[{name:"sales.csv",size:100,text:async()=>"date,category,revenue,cost\n2026-01-01,Test,100,60"}]}});
  await waitFor(()=>assert.ok(view.getByText("sales.csv")));
  assert.ok(view.getByText("40.0%"));
  fireEvent.change(upload, {target:{files:[{name:"bad.csv",size:10,text:async()=>"bad"}]}});
  await waitFor(()=>assert.match(view.getByRole("alert").textContent || "", /Previous data has been kept/));
  assert.ok(view.getByText("40.0%"));
  fireEvent.click(view.getByRole("button",{name:"Reset sample"}));
  assert.ok(view.getByText("36 of 36 records match the filters."));
  cleanup();
});

test("mobile navigation opens, closes on Escape and route selection", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const { AppShell } = await import("../src/components/app-shell");
  const view = render(<AppShell><p>Workspace</p></AppShell>);
  const toggle = view.getByRole("button", {name:"Open navigation"});
  fireEvent.click(toggle);
  const mobile = view.getByRole("navigation", {name:"Mobile navigation"});
  assert.equal(toggle.getAttribute("aria-expanded"), "true");
  fireEvent.keyDown(mobile, {key:"Escape"});
  assert.equal(view.queryByRole("navigation", {name:"Mobile navigation"}), null);
  assert.equal(document.activeElement, toggle);
  fireEvent.click(toggle);
  const link = view.getByRole("navigation", {name:"Mobile navigation"}).querySelector('a[href="/business-intelligence"]');
  assert.ok(link);
  fireEvent.click(link);
  assert.equal(view.queryByRole("navigation", {name:"Mobile navigation"}), null);
  cleanup();
});
