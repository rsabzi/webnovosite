/**
 * ارسال اعلان به تلگرام از طریق Bot API
 * مقادیر لازم در متغیرهای محیطی:
 *   TELEGRAM_BOT_TOKEN  — توکن ربات (از @BotFather)
 *   TELEGRAM_CHAT_ID    — آیدی عددی چت مقصد (یا چند آیدی با کاما)
 */

/** محدودیت Telegram Bot API برای متن sendMessage است. */
export const TELEGRAM_MESSAGE_LIMIT = 4096;

export type TelegramResult = {
  ok: boolean;
  /** پیام کوتاه خطا (توضیح خودِ تلگرام) — برای لاگ و دیاگنوستیک */
  error?: string;
  /** توضیح دقیق تلگرام */
  description?: string;
  /** کد پاسخ HTTP تلگرام؛ ۰ یعنی پاسخی دریافت نشد (خطای شبکه) */
  status?: number;
};

type SendAttempt = {
  ok: boolean;
  description?: string;
  status: number;
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** حذف تگ‌ها برای ارسال به‌صورت متن ساده (بدون parse_mode). */
function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (entity) => {
      const entities: Record<string, string> = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
      };
      return entities[entity] ?? entity;
    });
}

/** آیا تلگرام پیام را به‌خاطر تجزیه‌ی HTML رد کرده است؟ */
function isParseError(attempt: SendAttempt): boolean {
  return /parse\s+entities|can't\s+parse|unsupported\s+start\s+tag|entity|html/i.test(
    attempt.description || ""
  );
}

/**
 * پیام را به قطعاتی می‌شکند که از سقف تلگرام بزرگ‌تر نباشند.
 * ابتدا در انتهای خط یا فاصله می‌شکند تا متن فارسی خوانا بماند و در صورت
 * اجبار، بدون قطع‌کردن یک جفت surrogate جاوااسکریپت، وسط متن می‌شکند.
 */
export function splitTelegramMessage(
  text: string,
  maxLength: number = TELEGRAM_MESSAGE_LIMIT
): string[] {
  if (maxLength <= 0) throw new Error("maxLength must be positive");

  const characters = Array.from(text);
  if (characters.length <= maxLength) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < characters.length) {
    const hardEnd = Math.min(start + maxLength, characters.length);
    let end = hardEnd;

    if (hardEnd < characters.length) {
      const minimumUsefulBreak = start + Math.max(1, Math.floor((hardEnd - start) / 2));

      // خط جدید بهترین مرز برای پیام‌های فرم است.
      for (let index = hardEnd - 1; index >= minimumUsefulBreak; index -= 1) {
        if (characters[index] === "\n") {
          end = index + 1;
          break;
        }
      }

      // اگر خطی بیش از حد طولانی بود، روی فاصله یا تب بشکن.
      if (end === hardEnd) {
        for (let index = hardEnd - 1; index >= minimumUsefulBreak; index -= 1) {
          if (/\s/.test(characters[index])) {
            end = index + 1;
            break;
          }
        }
      }
    }

    // تگ HTML را از وسط قطع نکنید؛ در صورت نامعتبر شدن قالب‌بندی، ارسال ساده
    // به‌عنوان fallback انجام می‌شود، اما این کار از خطای غیرضروری جلوگیری می‌کند.
    const lastOpenTag = characters.lastIndexOf("<", end - 1);
    const lastCloseTag = characters.lastIndexOf(">", end - 1);
    if (lastOpenTag > lastCloseTag && lastOpenTag > start) {
      end = lastOpenTag;
    }

    // این حالت فقط برای یک تگ غیرعادیِ بزرگ رخ می‌دهد؛ از حلقه بی‌نهایت
    // جلوگیری می‌کنیم و همان قطعه را می‌فرستیم.
    if (end <= start) end = hardEnd;

    chunks.push(characters.slice(start, end).join(""));
    start = end;
  }

  return chunks;
}

async function sendOnce(
  token: string,
  chatId: string,
  text: string,
  useHtml: boolean
): Promise<SendAttempt> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: useHtml ? text : stripHtml(text),
        ...(useHtml ? { parse_mode: "HTML" } : {}),
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });

    const data = (await res.json()) as { ok?: boolean; description?: string };
    return {
      ok: Boolean(data?.ok),
      description: data?.description,
      status: res.status,
    };
  } catch (err) {
    return {
      ok: false,
      description: err instanceof Error ? err.message : "network error",
      status: 0,
    };
  }
}

async function sendChunksToChat(
  token: string,
  chatId: string,
  text: string
): Promise<SendAttempt> {
  const chunks = splitTelegramMessage(text);
  let lastSuccessfulAttempt: SendAttempt = { ok: true, status: 200 };

  // قطعات یک چت باید به‌ترتیب ارسال شوند تا متن فرم جابه‌جا نشود.
  for (const chunk of chunks) {
    const first = await sendOnce(token, chatId, chunk, true);

    if (first.ok) {
      lastSuccessfulAttempt = first;
      continue;
    }

    // اگر فقط قالب HTML مشکل داشت، همان قطعه را بدون parse_mode دوباره بفرستید.
    if (isParseError(first)) {
      const plain = await sendOnce(token, chatId, chunk, false);
      if (!plain.ok) return plain;
      lastSuccessfulAttempt = plain;
      continue;
    }

    return first;
  }

  return lastSuccessfulAttempt;
}

export async function sendTelegramMessage(text: string): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    return {
      ok: false,
      error:
        !token && chatIds.length === 0
          ? "TELEGRAM_BOT_TOKEN و TELEGRAM_CHAT_ID تنظیم نشده‌اند."
          : !token
            ? "TELEGRAM_BOT_TOKEN تنظیم نشده است."
            : "TELEGRAM_CHAT_ID تنظیم نشده است.",
    };
  }

  const results = await Promise.all(
    chatIds.map((chatId) => sendChunksToChat(token, chatId, text))
  );

  const failed = results.find((result) => !result.ok);
  if (!failed) return { ok: true };

  return {
    ok: false,
    error: failed.description || `Telegram API error (HTTP ${failed.status})`,
    description: failed.description,
    status: failed.status,
  };
}
