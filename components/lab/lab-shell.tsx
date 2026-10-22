"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import { recordLabUseAction } from "@/lib/actions/lab";

export function LabShell({ slug, title, intro, inputs, children, onReset, aside }: { slug: string; title: string; intro: string; inputs: React.ReactNode; children: React.ReactNode; onReset?: () => void; aside?: React.ReactNode }) {
  const { locale, t } = useLocale();
  useEffect(() => { void recordLabUseAction(slug, locale); }, [slug, locale]);
  return (
    <div className="pt-28 pb-16">
      <Container>
        <Link href={`/${locale}/lab`} className="inline-flex items-center gap-1 text-sm font-medium text-steel hover:text-royal"><ChevronLeft className="h-4 w-4" />{t.lab.title}</Link>
        <div className="mt-4 max-w-3xl"><p className="eyebrow mb-2">{t.nav.lab}</p><h1 className="display-md text-ink">{title}</h1><p className="mt-4 text-lg leading-relaxed text-steel">{intro}</p></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5 rounded-3xl border border-mist/70 bg-white p-6 shadow-[var(--shadow-soft)] lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between"><p className="eyebrow">{t.lab.inputs}</p>{onReset && <button onClick={onReset} className="inline-flex items-center gap-1 text-xs font-semibold text-steel hover:text-royal"><RotateCcw className="h-3.5 w-3.5" />{t.lab.reset}</button>}</div>
            {inputs}
          </aside>
          <div className="space-y-6">{children}{aside}</div>
        </div>
        <Notice tone="compliance" className="mt-10">{t.lab.labDisclaimer}</Notice>
      </Container>
    </div>
  );
}

export function ResultCard({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-mist/70 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6 ${className}`}>{title && <p className="eyebrow mb-4">{title}</p>}{children}</div>;
}
