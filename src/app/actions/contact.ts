"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactServerSchema, type ContactPayload, type ContactResult } from "@/lib/contact-schema";
import { services } from "@/content/services";

// Simple sliding-window rate limit: 5 submissions per IP per 10 minutes.
// In-memory, so it is per server instance — good enough to stop casual abuse.
// For stricter limits across instances, swap for Upstash/Vercel KV.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > MAX_HITS;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitContact(input: ContactPayload): Promise<ContactResult> {
  const parsed = contactServerSchema.safeParse(input);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend success so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { ok: true };
    return { ok: false, error: "validation", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] };
  }
  const data = parsed.data;

  // Time trap: a human needs more than ~1.5s between first focus and submit
  // (0 = form never focused = scripted POST). Bots get a fake success.
  if (!data.startedAt || Date.now() - data.startedAt < 1500) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const service = services.find((s) => s.slug === data.service);
  const serviceName = service ? (typeof service.title === "string" ? service.title : service.title.en) : data.service;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "sales@hasviktech.com";
  const from = process.env.CONTACT_FROM_EMAIL || "HASVIK Website <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY not set — submission logged instead of emailed:", { ...data, serviceName });
      return { ok: true };
    }
    console.error("[contact] RESEND_API_KEY is missing in production.");
    return { ok: false, error: "server" };
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Service", serviceName],
    ["Budget", data.budget || "—"],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email || undefined,
      subject: `New quote request: ${serviceName} — ${data.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n\nIP: ${ip}`,
      html: `<h2 style="font-family:sans-serif;color:#002f6c">New quote request</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5e6c82">${k}</td><td style="padding:4px 0"><strong>${escape(v)}</strong></td></tr>`,
        )
        .join("")}</table>
<p style="font-family:sans-serif;white-space:pre-wrap;border-left:3px solid #71c554;padding-left:12px">${escape(data.message)}</p>`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { ok: false, error: "server" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { ok: false, error: "server" };
  }
}
