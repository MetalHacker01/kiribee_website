import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/content";

const Body = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(8).max(5000),
  locale: z.enum(["en", "sq"]).optional(),
  // honeypot
  website: z.string().optional(),
});

// Tiny in-memory rate limit (per-instance, best-effort).
const HITS = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || entry.reset < now) {
    HITS.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let parsed;
  try {
    const json = await req.json();
    parsed = Body.parse(json);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Silent honeypot trap
  if (parsed.website && parsed.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || `Kiribee <onboarding@resend.dev>`;
  const to = process.env.CONTACT_TO || SITE.email;

  if (!apiKey) {
    // Dev mode without a key — log the inquiry and pretend success so the
    // UI flow can be tested locally.
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (no RESEND_API_KEY) inquiry:", parsed);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subject = `New Kiribee inquiry — ${parsed.name}`;
  const safe = (s: string) => s.replace(/[<>&"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string)
  );
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:auto;color:#1F1A14;">
      <h2 style="font-family:Georgia,serif;color:#3A2A12;border-bottom:1px solid #E8B53A;padding-bottom:8px;">
        New inquiry via kiribee.com
      </h2>
      <p><strong>From:</strong> ${safe(parsed.name)} &lt;${safe(parsed.email)}&gt;</p>
      <p><strong>Locale:</strong> ${parsed.locale ?? "en"}</p>
      <p style="white-space:pre-wrap;background:#FAF6EC;padding:16px;border-radius:8px;">${safe(parsed.message)}</p>
      <hr style="margin-top:32px;border:none;border-top:1px solid #eee" />
      <p style="font-size:12px;color:#888">Reply directly to this email to respond.</p>
    </div>
  `;
  const text = `New inquiry via kiribee.com

From: ${parsed.name} <${parsed.email}>
Locale: ${parsed.locale ?? "en"}

${parsed.message}

— Reply directly to this email to respond.`;

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: parsed.email,
      html,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
