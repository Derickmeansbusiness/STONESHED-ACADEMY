import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { TutorChat } from "@/components/ask/tutor-chat";

export const metadata: Metadata = { title: "Ask Stoneshed AI" };

export default async function AskPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ q?: string }> }) {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = getDictionary(locale);
  const live = !!process.env.ANTHROPIC_API_KEY;
  return (
    <div className="pt-24 pb-12">
      <Container size="md">
        <p className="eyebrow mb-2">{t.ask.alt}</p>
        <h1 className="display-md text-ink">{t.ask.title}</h1>
        <p className="mt-3 text-steel">{t.ask.sub}</p>
        <div className="mt-8"><TutorChat initialQuestion={q} live={live} /></div>
      </Container>
    </div>
  );
}
