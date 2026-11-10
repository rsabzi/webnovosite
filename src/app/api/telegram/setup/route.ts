import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ابزار راه‌اندازی تلگرام.
 *
 * GET  /api/telegram/setup        → وضعیت ربات و فهرست چت‌هایی که به ربات پیام داده‌اند
 * GET  /api/telegram/setup?test=1 → ارسال یک پیام آزمایشی و گزارش علت دقیق در صورت شکست
 * POST /api/telegram/setup        → ارسال یک پیام آزمایشی به TELEGRAM_CHAT_ID
 *
 * روش استفاده:
 *   ۱) در تلگرام ربات خود را باز کنید و /start بزنید (یا هر پیامی بفرستید).
 *   ۲) این آدرس را در مرورگر باز کنید تا chat_id عددی شما را ببینید.
 *   ۳) آن عدد را در متغیر محیطی TELEGRAM_CHAT_ID قرار دهید.
 *   ۴) برای اطمینان از اتصال: همین آدرس را با ?test=1 باز کنید.
 *
 * پس از تنظیم شدن TELEGRAM_CHAT_ID، این مسیر دیگر chat_id ها را فاش نمی‌کند.
 */

function maskChatId(id: string): string {
  const value = id.trim();
  if (value.length <= 4) return "•••";
  return `${value.slice(0, 3)}…${value.slice(-2)} (${value.length} کاراکتر)`;
}

/** راهنمای فارسی برای رایج‌ترین خطاهای تلگرام */
function hintFor(description?: string | null, status?: number | null): string {
  const text = (description || "").toLowerCase();

  if (!text && (status === 0 || status === null)) {
    return "پاسخی از تلگرام دریافت نشد (خطای شبکه/دسترسی به api.telegram.org).";
  }
  if (text.includes("unauthorized") || text.includes("invalid token") || text.includes("not found") && text.includes("bot")) {
    return "توکن ربات معتبر نیست یا منقضی شده است. از @BotFather توکن جدید بگیرید و در TELEGRAM_BOT_TOKEN قرار دهید، سپس پروژه را دوباره دیپلوی کنید.";
  }
  if (text.includes("chat not found") || text.includes("unsupported chat") || text.includes("chat_id is empty")) {
    return "آیدی چت درست نیست. باید عدد باشد (مثل 6912564436)؛ برای گروه/کانال با - شروع می‌شود (مثل -1001234567890). مقدار TELEGRAM_CHAT_ID را اصلاح و دوباره دیپلوی کنید.";
  }
  if (text.includes("can't initiate") || text.includes("cannot initiate") || text.includes("blocked by the user") || text.includes("deactivated")) {
    return "ربات نمی‌تواند گفتگو را شروع کند. ابتدا در تلگرام ربات خود را باز کنید و /start را بزنید (یا ربات را از حالت بلاک خارج کنید)، سپس دوباره تست کنید.";
  }
  if (text.includes("topic") || text.includes("thread")) {
    return "این گروه تاپیک (Topic) دارد و برای ارسال، شناسه‌ی تاپیک هم لازم است. یا به یک چت خصوصی/گروه ساده پیام دهید.";
  }
  if (text.includes("too long")) {
    return "متن پیام بیش از ۴۰۹۶ کاراکتر شده است (معمولاً به‌خاطر شرح خیلی طولانی پروژه).";
  }
  if (text.includes("entit") || text.includes("parse")) {
    return "تلگرام در تجزیه‌ی قالب‌بندی HTML پیام به مشکل خورده است.";
  }
  if (status === 429) {
    return "تلگرام موقتاً محدود کرده است (ارسال بیش از حد). چند دقیقه دیگر دوباره تست کنید.";
  }
  return "علت را در فیلد error ببینید؛ اگر نامفهوم بود، لاگ‌های سرور (Vercel → Functions) را بررسی کنید.";
}

/**
 * محافظ ورودی این مسیر ابزار داخلی:
 * اگر `LEADS_ADMIN_TOKEN` تنظیم شده باشد، فقط با هدر `x-admin-token` یا
 * پارامتر `?token=` می‌توان از این مسیر استفاده کرد؛ در غیر این صورت
 * (حالت راه‌اندازی اولیه) رفتار قبلی حفظ می‌شود تا فرایند مستندشده‌ی
 * «/start زدن و خواندن chat_id» از کار نیفتد.
 */
function guardAdmin(req: Request): { ok: true } | { ok: false; response: Response } {
  const expected = process.env.LEADS_ADMIN_TOKEN?.trim();
  if (!expected) return { ok: true };

  const url = new URL(req.url);
  const provided = (req.headers.get("x-admin-token") || url.searchParams.get("token") || "").trim();
  if (provided === expected) return { ok: true };

  return {
    ok: false,
    response: NextResponse.json({ ok: false, error: "not found" }, { status: 404 }),
  };
}

export async function GET(req: Request) {
  const guard = guardAdmin(req);
  if (!guard.ok) return guard.response;

  const wantsTest = new URL(req.url).searchParams.get("test") === "1";

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_BOT_TOKEN تنظیم نشده است.", hint: hintFor(null, null) },
      { status: 503 }
    );
  }

  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  try {
    const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`, { cache: "no-store" });
    const me = await meRes.json();

    if (!me?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "توکن ربات معتبر نیست.",
          detail: me?.description,
          hint: hintFor(me?.description, meRes.status),
        },
        { status: 502 }
      );
    }

    const bot = {
      id: me.result?.id,
      username: me.result?.username ? `@${me.result.username}` : null,
      name: me.result?.first_name,
    };

    const maskedChatIds = chatIds.map(maskChatId);

    // حالت تست: یک پیام واقعی می‌فرستیم و نتیجه را با جزئیات برمی‌گردانیم
    if (wantsTest) {
      const limit = checkRateLimit(requestKey(req, "telegram-setup-test"), 3, 10 * 60 * 1000);
      if (!limit.allowed) {
        return NextResponse.json(
          {
            ok: false,
            error: "تعداد تست‌های ارسال زیاد بوده است. چند دقیقه بعد دوباره تلاش کنید.",
            retryAfterSeconds: limit.retryAfterSeconds,
          },
          { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
        );
      }

      const result = await sendTelegramMessage(
        [
          "✅ <b>تست اتصال سایت نوین وب</b>",
          "",
          "اگر این پیام را می‌بینید، فرم سایت درست به تلگرام شما وصل است.",
          `🕒 ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}`,
        ].join("\n")
      );

      return NextResponse.json(
        {
          ok: result.ok,
          bot,
          chatIdsCount: chatIds.length,
          chatIds: maskedChatIds,
          result: result.ok ? "پیام آزمایشی با موفقیت ارسال شد." : "ارسال پیام آزمایشی ناموفق بود.",
          error: result.ok ? null : (result.description ?? result.error ?? "خطای ناشناخته"),
          status: result.status ?? null,
          hint: result.ok
            ? "اتصال برقرار است؛ فرم تماس سایت پیام‌ها را به همین چت می‌فرستد."
            : hintFor(result.description ?? result.error, result.status),
        },
        { status: result.ok ? 200 : 502 }
      );
    }

    if (chatIds.length > 0) {
      return NextResponse.json({
        ok: true,
        bot,
        chatIdConfigured: true,
        chatIdsCount: chatIds.length,
        chatIds: maskedChatIds,
        hint: "TELEGRAM_CHAT_ID از قبل تنظیم شده است. برای ارسال پیام آزمایشی، همین آدرس را با ?test=1 باز کنید.",
      });
    }

    const updRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates`, {
      cache: "no-store",
    });
    const upd = await updRes.json();

    type TgUpdate = { message?: { chat?: { id: number; type: string; first_name?: string; title?: string; username?: string } } };
    const chats = new Map<number, Record<string, unknown>>();
    for (const u of (upd?.result || []) as TgUpdate[]) {
      const chat = u.message?.chat;
      if (chat?.id) {
        chats.set(chat.id, {
          chat_id: chat.id,
          type: chat.type,
          name: chat.title || chat.first_name || null,
          username: chat.username ? `@${chat.username}` : null,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      bot,
      chatIdConfigured: false,
      chats: [...chats.values()],
      hint:
        chats.size === 0
          ? "هیچ پیامی یافت نشد. ابتدا در تلگرام به ربات خود /start بزنید، سپس این صفحه را رفرش کنید."
          : "عدد chat_id را در متغیر محیطی TELEGRAM_CHAT_ID قرار دهید و پروژه را دوباره دیپلوی کنید.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "اتصال به API تلگرام برقرار نشد.",
        detail: err instanceof Error ? err.message : String(err),
        hint: hintFor(null, 0),
      },
      { status: 502 }
    );
  }
}

export async function POST(req: Request) {
  const guard = guardAdmin(req);
  if (!guard.ok) return guard.response;

  const limit = checkRateLimit(requestKey(req, "telegram-setup-test"), 3, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "تعداد تست‌های ارسال زیاد بوده است. چند دقیقه بعد دوباره تلاش کنید." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const result = await sendTelegramMessage(
    [
      "✅ <b>تست اتصال سایت نوین وب</b>",
      "",
      "اگر این پیام را می‌بینید، فرم تماس سایت درست به تلگرام وصل است.",
      `🕒 ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}`,
    ].join("\n")
  );

  return NextResponse.json(
    { ...result, hint: result.ok ? "اتصال برقرار است." : hintFor(result.description ?? result.error, result.status) },
    { status: result.ok ? 200 : 502 }
  );
}
