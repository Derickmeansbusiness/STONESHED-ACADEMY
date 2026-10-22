import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "fr"];
const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) return NextResponse.next();

  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) {
    const locale = pathname.split("/")[1];
    const res = NextResponse.next();
    if (request.cookies.get("sa_locale")?.value !== locale) res.cookies.set("sa_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  const cookieLocale = request.cookies.get("sa_locale")?.value;
  const header = request.headers.get("accept-language") ?? "";
  const preferred = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : header.toLowerCase().startsWith("fr") ? "fr" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
