"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";
import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  if (pathname.includes("/vision") || /\/learn\/[^/]+\/[^/]+$/.test(pathname)) return null;
  const L = (p: string) => `/${locale}${p}`;
  return (
    <footer className="relative mt-24 overflow-hidden bg-midnight text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">{t.footer.about}</p>
            <p className="mt-4 text-sm font-semibold text-sky">{t.footer.hashtag}</p>
          </div>
          <FooterCol title={t.footer.columns.learn} links={[[t.nav.learn, L("/learn")], [t.nav.tv, L("/tv")], [t.nav.lab, L("/lab")], [t.insights.glossary, L("/insights/glossary")], [t.nav.events, L("/events")]]} />
          <FooterCol title={t.footer.columns.platform} links={[[t.nav.ask, L("/ask")], [t.nav.myLearning, L("/dashboard")], [t.nav.institutions, L("/institutions")], [t.cert.verifyTitle, L("/verify")], [t.nav.funds, L("/funds")]]} />
          <FooterCol title={t.footer.columns.company} links={[[t.nav.about, L("/about")], [t.footer.corporate, "https://www.stoneshed-am.com/"], [t.footer.privacy, L("/privacy")], [t.footer.terms, L("/terms")], [t.footer.contact, L("/about#contact")]]} />
        </div>
        <div className="mt-14 space-y-4 border-t border-white/10 pt-8 text-[12.5px] leading-relaxed text-white/50">
          <p>{t.footer.disclosure}</p>
          <p>{t.footer.funds}</p>
          <p className="text-white/40">© {new Date().getFullYear()} Stoneshed Asset Management S.A. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="eyebrow-light mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href + label}>
            {href.startsWith("http") ? (
              <a href={href} target="_blank" rel="noreferrer" className="text-sm text-white/75 hover:text-white">{label}</a>
            ) : (
              <Link href={href} className="text-sm text-white/75 hover:text-white">{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
