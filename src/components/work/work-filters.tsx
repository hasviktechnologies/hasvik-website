"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; status: string; category: string; node: ReactNode };
type Group = { label: string; all: string; options: { value: string; label: string }[] };

/**
 * Filter chips over pre-rendered project cards. Filter state is kept in the URL
 * (?status=&category=) so filtered views are shareable.
 */
export function WorkFilters({
  items,
  status,
  category,
  strings,
}: {
  items: Item[];
  status: Group;
  category: Group;
  strings: { empty: string; reset: string; results: string };
}) {
  const [sel, setSel] = useState<{ s: string; c: string }>({ s: "", c: "" });

  // Read filters from the URL after hydration (server render is always unfiltered).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get("status") ?? "";
    const c = q.get("category") ?? "";
    if (s || c) setSel({ s, c });
  }, []);

  const update = (next: { s: string; c: string }) => {
    setSel(next);
    const q = new URLSearchParams();
    if (next.s) q.set("status", next.s);
    if (next.c) q.set("category", next.c);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const visible = useMemo(() => items.filter((i) => (!sel.s || i.status === sel.s) && (!sel.c || i.category === sel.c)), [items, sel]);

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-4 text-sm font-semibold transition-all duration-200",
      active ? "border-brand-900 bg-brand-900 text-white shadow-soft dark:border-accent dark:bg-accent dark:text-brand-950" : "border-border bg-card text-muted-foreground hover:border-brand-600/40 hover:text-heading",
    );

  const renderGroup = (g: Group, key: "s" | "c") => (
    <div role="group" aria-label={g.label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</span>
      {[{ value: "", label: g.all }, ...g.options].map((o) => (
        <button key={o.value || "all"} type="button" aria-pressed={sel[key] === o.value} onClick={() => update({ ...sel, [key]: o.value })} className={chip(sel[key] === o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl2 border border-border bg-card p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between">
        {renderGroup(status, "s")}
        {renderGroup(category, "c")}
      </div>
      <p role="status" className="mb-6 text-sm text-muted-foreground">
        {strings.results.replace("{n}", String(visible.length))}
      </p>
      {visible.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">{strings.empty}</p>
          <button type="button" onClick={() => update({ s: "", c: "" })} className={chip(false)}>
            {strings.reset}
          </button>
        </div>
      )}
    </div>
  );
}
