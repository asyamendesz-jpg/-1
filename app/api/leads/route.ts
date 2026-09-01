import { site } from "@/lib/content";
import { hasUsableLink, isPlaceholder } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (hasUsableLink(site.leads.webhookUrl) && !isPlaceholder(site.leads.webhookUrl)) {
    await fetch(site.leads.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true });
}
