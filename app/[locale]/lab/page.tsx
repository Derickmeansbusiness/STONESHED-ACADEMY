import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { LABS } from "@/lib/lab/registry";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { CoverArt } from "@/components/ui/cover-art";
import { Notice } from "@/components/ui/notice";

export const metadata: Metadata = { title: "Investment Lab" };

export default async function LabIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.nav.lab} title={t.lab.tagline} sub={t.lab.sub} size="lg" /></Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LABS.map((lab, i) => {
            const Icon = (Icons as unknown as Record<string, typeof Icons.TrendingUp>)[lab.icon] ?? Icons.FlaskConical;
            return (
              <StaggerItem key={lab.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Link href={`/${locale}/lab/${lab.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mist/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[2.4/1]" : "aspect-[16/9]"}`}><CoverArt seed={lab.slug} theme={lab.theme} className="transition-transform duration-700 group-hover:scale-105" /><span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-royal"><Icon className="h-5 w-5" /></span></div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow mb-1 text-[10px]">Lab {i + 1}</p>
                    <h2 className="font-display text-lg font-bold text-ink group-hover:text-finance">{lab.title[locale]}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{lab.blurb[locale]}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-finance">{t.lab.open} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Notice tone="compliance" className="mt-12">{t.lab.labDisclaimer}</Notice>
      </Container>
    </div>
  );
}
