import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * فقط زبان و مسیر فعلی را به layout ریشه اطلاع می‌دهد تا بدون جابه‌جایی
 * هیچ صفحه‌ای، <html lang/dir> و لینک‌های hreflang و کروم هر زبان درست رندر شود.
 * فارسی روی ریشه می‌ماند (حفظ URLهای فعلی برای سئو) و انگلیسی زیر /en.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fa";
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/|videos/|robots.txt|sitemap.xml).*)"],
};
