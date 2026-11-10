import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary, isValidAdminToken } from "@/lib/site-analytics";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token =
    req.headers.get("x-admin-token") ||
    req.nextUrl.searchParams.get("token") ||
    "";

  if (!isValidAdminToken(token)) {
    return NextResponse.json(
      { ok: false, error: "توکن یا رمز عبور نامعتبر است" },
      { status: 401 }
    );
  }

  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json({
      ok: true,
      data: summary,
      vercelAnalyticsConfigured: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "خطا در استخراج آمار";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const token = typeof body.token === "string" ? body.token : "";

  const valid = isValidAdminToken(token);
  return NextResponse.json({ ok: true, valid });
}
