import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { roiCalculations } from "@/db/schema";
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const limit = checkRateLimit(requestKey(req, "calculator"), 12, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `تعداد درخواست‌ها زیاد بود. لطفاً ${limit.retryAfterSeconds} ثانیه دیگر تلاش کنید.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  try {
    const body = await req.json();

    const {
      staffCount,
      wastedHoursPerWeek,
      avgMonthlySalaryTomans,
      estimatedMonthlySavingTomans,
      companyName,
      phoneNumber,
      email,
    } = body;

    const values = {
      staffCount: Number(staffCount) || 1,
      wastedHoursPerWeek: Number(wastedHoursPerWeek) || 10,
      avgMonthlySalaryTomans: Number(avgMonthlySalaryTomans) || 20000000,
      estimatedMonthlySavingTomans: Number(estimatedMonthlySavingTomans) || 0,
      companyName: companyName || null,
      phoneNumber: phoneNumber || null,
      email: email || null,
    };

    let id: number | null = null;
    try {
      const db = getDb();
      if (db) {
        const [inserted] = await db.insert(roiCalculations).values(values).returning();
        id = inserted?.id ?? null;
      }
    } catch (error) {
      console.error("[calculator] db insert failed:", error);
    }

    // اگر کاربر راه تماس گذاشته باشد، یعنی لید واقعی است → اعلان تلگرام
    if (values.phoneNumber) {
      await sendTelegramMessage(
        [
          "🧮 <b>محاسبه‌گر صرفه‌جویی — لید جدید</b>",
          "",
          values.companyName ? `🏢 <b>کسب‌وکار:</b> ${escapeHtml(values.companyName)}` : "",
          `📞 <b>تماس:</b> ${escapeHtml(values.phoneNumber)}`,
          values.email ? `📧 <b>ایمیل:</b> ${escapeHtml(values.email)}` : "",
          `👥 <b>تعداد نفرات درگیر:</b> ${values.staffCount}`,
          `⏳ <b>ساعت هدررفته در هفته:</b> ${values.wastedHoursPerWeek}`,
          `💸 <b>صرفه‌جویی ماهانه برآوردی:</b> ${values.estimatedMonthlySavingTomans.toLocaleString("fa-IR")} تومان`,
        ]
          .filter(Boolean)
          .join("\n")
      );
    }

    return NextResponse.json({
      success: true,
      message: "محاسبات ثبت شد و گزارش اختصاصی برای شما آماده شد.",
      id,
    });
  } catch (error) {
    console.error("Error creating ROI log:", error);
    return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 });
  }
}
