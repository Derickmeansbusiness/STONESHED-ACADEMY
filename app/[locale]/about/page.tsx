import type { Metadata } from "next";
import { ShieldCheck, Landmark, Scale, Mail, Globe } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { STILLS } from "@/lib/content/generated-media";
import { Still } from "@/components/ui/still";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  return (
    <div className="pt-28 pb-12">
      <Container size="md">
        <Reveal><SectionHeading eyebrow={t.nav.about} title={t.about.title} sub={t.about.sub} size="lg" /></Reveal>
        <Still still={STILLS.doualaDawn} className="mt-10 aspect-[21/9] rounded-3xl" />
        <div className="prose-sa mt-10">
          <p>{fr ? "Stoneshed Asset Management S.A. est une société de gestion agréée par la COSUMAF (COSUMAF-SGP-03/2023), active sur le marché financier de la CEMAC. Ses services comprennent la gestion collective, la gestion discrétionnaire de portefeuille, le conseil en investissements financiers, les solutions d'épargne et d'investissement, l'optimisation de trésorerie et de liquidité, et la construction de portefeuilles." : "Stoneshed Asset Management S.A. is a management company licensed by COSUMAF (COSUMAF-SGP-03/2023), operating within the CEMAC financial market. Its services include collective investment management, discretionary portfolio management, financial investment advisory, savings and investment solutions, treasury and liquidity optimisation, and portfolio construction."}</p>
          <p>{fr ? "En 2026, la société a étendu son activité de gestion collective avec deux fonds communs de placement : le FCP Stoneshed Classic (capitalisation, COSUMAF-FCP-01/2026) et le FCP Stoneshed Gold (distribution, COSUMAF-FCP-02/2026)." : "In 2026 the company expanded its collective management activity with two mutual funds: FCP Stoneshed Classic (capitalisation, COSUMAF-FCP-01/2026) and FCP Stoneshed Gold (distribution, COSUMAF-FCP-02/2026)."}</p>
          <h2>{fr ? "Pourquoi une Academy" : "Why an Academy"}</h2>
          <p>{t.home.welcomeBody}</p>
          <h2>{fr ? "Ce que l'Academy n'est pas" : "What the Academy is not"}</h2>
          <ul>
            <li>{fr ? "Ce n'est pas un canal de souscription : aucune somme n'est reçue ni investie via la plateforme." : "It is not a subscription channel: no money is received or invested through the platform."}</li>
            <li>{fr ? "Ce n'est pas un conseil personnalisé : les contenus sont pédagogiques et génériques." : "It is not personalised advice: content is educational and generic."}</li>
            <li>{fr ? "Ses supports ne sont pas approuvés ni avalisés par la COSUMAF, sauf mention expresse documentée." : "Its materials are not approved or endorsed by COSUMAF unless expressly documented."}</li>
          </ul>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[[ShieldCheck, "COSUMAF-SGP-03/2023", fr ? "Agrément de société de gestion" : "Management company licence"], [Landmark, "Ecobank Cameroon", fr ? "Dépositaire des FCP" : "Depositary of the FCPs"], [Scale, "Moore Stephens CA", fr ? "Commissaire aux comptes" : "Statutory auditor"]].map(([Icon, a, b]) => { const I = Icon as typeof ShieldCheck; return <div key={a as string} className="surface p-5 text-center"><I className="mx-auto h-6 w-6 text-royal" /><p className="mt-3 font-display font-bold text-ink">{a as string}</p><p className="text-xs text-steel">{b as string}</p></div>; })}
        </div>
        <section id="contact" className="surface mt-10 scroll-mt-28 p-6">
          <p className="eyebrow mb-3">{t.footer.contact}</p>
          <ul className="space-y-2 text-sm text-slate">
            <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-finance" /><a href="https://www.stoneshed-am.com/" target="_blank" rel="noreferrer" className="text-finance hover:underline">www.stoneshed-am.com</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-finance" />{fr ? "Adresse e-mail de l'Academy : à confirmer par Stoneshed (academy@stoneshed-am.com proposé)." : "Academy email: to be confirmed by Stoneshed (academy@stoneshed-am.com proposed)."}</li>
          </ul>
        </section>
        <Notice tone="compliance" className="mt-8">{t.footer.disclosure}</Notice>
      </Container>
    </div>
  );
}
