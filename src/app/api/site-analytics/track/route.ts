import { NextRequest, NextResponse } from "next/server";
import { recordVisit } from "@/lib/site-analytics";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer : "";
    const screenWidth = typeof body.screenWidth === "number" ? body.screenWidth : undefined;

    const forwarded = req.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    // ثبت غیرهمگام بازدید
    await recordVisit({
      path,
      referrer,
      userAgent,
      ip,
      screenWidth,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
