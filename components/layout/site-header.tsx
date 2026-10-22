"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, LayoutDashboard, LogOut, ShieldCheck, Presentation } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth/session";

const NAV = [
  ["learn", "/learn"],
  ["tv", "/tv"],
  ["lab", "/lab"],
  ["funds", "/funds"],
  ["insights", "/insights"],
  ["events", "/events"],
  ["institutions", "/institutions"],
  ["about", "/about"],
] as const;

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const isHome = pathname === `/${locale}`;
  const isLesson = /\/learn\/[^/]+\/[^/]+$/.test(pathname) || pathname.includes("/vision");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); setUserMenu(false); }, [pathname]);

  const otherLocale = locale === "en" ? "fr" : "en";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;
  const staff = user && ["super_admin", "academy_manager", "content_creator", "instructor", "compliance_reviewer", "research_editor"].includes(user.role);
  const presenter = user && (user.isDemoPresenter || user.role === "super_admin" || user.role === "academy_manager");
  const darkHeader = isHome && !scrolled && !open;

  if (pathname.includes("/vision")) return null;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", darkHeader ? "bg-transparent" : "border-b border-mist/60 bg-white/85 backdrop-blur-xl", isLesson && "relative")}>
      <div className="mx-auto flex h-[72px] w-full max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <Link href={`/${locale}`} aria-label="Stoneshed Academy">
          <Logo light={darkHeader} />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV.map(([key, href]) => {
            const full = `/${locale}${href}`;
            const active = pathname.startsWith(full);
            return (
              <Link key={key} href={full} className={cn("rounded-full px-3 py-2 text-[13.5px] font-medium transition", darkHeader ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-slate hover:bg-cloud hover:text-royal", active && (darkHeader ? "bg-white/15 text-white" : "bg-cloud text-royal"))}>
                {t.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href={`/${locale}/ask`} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold transition", darkHeader ? "text-sky hover:bg-white/10" : "text-finance hover:bg-cloud")}>
            <Sparkles className="h-4 w-4" /> {t.nav.ask}
          </Link>
          <Link href={switchPath} hrefLang={otherLocale} className={cn("rounded-full border px-2.5 py-1.5 text-[12px] font-bold tracking-wider transition", darkHeader ? "border-white/25 text-white hover:bg-white/10" : "border-mist text-royal hover:border-finance")} aria-label={t.nav.language}>
            {locale === "en" ? "FR" : "EN"}
          </Link>
          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenu((v) => !v)} className={cn("flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-1.5 text-[13px] font-semibold transition", darkHeader ? "border-white/25 text-white hover:bg-white/10" : "border-mist text-royal hover:border-finance")} aria-expanded={userMenu}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-finance text-[11px] font-bold text-white">{initials(user.fullName)}</span>
                {user.fullName.split(" ")[0]}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-mist bg-white p-1.5 shadow-[var(--shadow-lift)]">
                    <MenuLink href={`/${locale}/dashboard`} icon={LayoutDashboard}>{t.nav.myLearning}</MenuLink>
                    {staff && <MenuLink href={`/${locale}/admin`} icon={ShieldCheck}>{t.nav.admin}</MenuLink>}
                    {presenter && <MenuLink href={`/${locale}/vision`} icon={Presentation}>{t.nav.vision}</MenuLink>}
                    <form action="/api/auth/signout" method="post">
                      <input type="hidden" name="locale" value={locale} />
                      <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-slate hover:bg-cloud"><LogOut className="h-4 w-4" />{t.nav.signOut}</button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href={`/${locale}/signin`} className={cn("rounded-full px-3 py-2 text-[13.5px] font-semibold", darkHeader ? "text-white hover:bg-white/10" : "text-royal hover:bg-cloud")}>{t.nav.signIn}</Link>
              <Button href={`/${locale}/register`} size="sm" variant={darkHeader ? "light" : "primary"}>{t.nav.startFree}</Button>
            </>
          )}
        </div>

        <button className={cn("rounded-full p-2 lg:hidden", darkHeader ? "text-white" : "text-royal")} onClick={() => setOpen((v) => !v)} aria-label={open ? t.nav.close : t.nav.menu} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-mist bg-white lg:hidden">
            <div className="space-y-1 px-5 py-4">
              {NAV.map(([key, href]) => (
                <Link key={key} href={`/${locale}${href}`} className="block rounded-xl px-3 py-3 text-base font-medium text-slate hover:bg-cloud">{t.nav[key]}</Link>
              ))}
              <Link href={`/${locale}/ask`} className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-finance hover:bg-cloud"><Sparkles className="h-4 w-4" />{t.nav.ask}</Link>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-mist pt-4">
                <Link href={switchPath} className="rounded-full border border-mist px-3 py-2 text-xs font-bold tracking-wider text-royal">{locale === "en" ? "Français" : "English"}</Link>
                {user ? (
                  <>
                    <Button href={`/${locale}/dashboard`} size="sm">{t.nav.myLearning}</Button>
                    {staff && <Button href={`/${locale}/admin`} size="sm" variant="outline">{t.nav.admin}</Button>}
                    {presenter && <Button href={`/${locale}/vision`} size="sm" variant="outline">{t.nav.vision}</Button>}
                    <form action="/api/auth/signout" method="post"><input type="hidden" name="locale" value={locale} /><Button size="sm" variant="ghost" type="submit">{t.nav.signOut}</Button></form>
                  </>
                ) : (
                  <>
                    <Button href={`/${locale}/signin`} size="sm" variant="outline">{t.nav.signIn}</Button>
                    <Button href={`/${locale}/register`} size="sm">{t.nav.startFree}</Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuLink({ href, icon: Icon, children }: { href: string; icon: typeof LayoutDashboard; children: React.ReactNode }) {
  return <Link href={href} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate hover:bg-cloud hover:text-royal"><Icon className="h-4 w-4" />{children}</Link>;
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}
