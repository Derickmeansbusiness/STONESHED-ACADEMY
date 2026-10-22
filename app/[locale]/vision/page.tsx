import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getSession, canPresentVision } from "@/lib/auth/session";
import { executiveMetrics } from "@/lib/services/analytics";
import { VisionDeck } from "@/components/vision/vision-deck";

export default async function VisionPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/vision`)}`);
  if (!canPresentVision(user)) redirect(`/${locale}/dashboard`);
  const m = await executiveMetrics();
  return <VisionDeck locale={locale} metrics={m.totals} weeks={m.weeks} />;
}
