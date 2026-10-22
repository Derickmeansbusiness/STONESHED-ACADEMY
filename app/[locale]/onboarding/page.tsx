import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { OnboardingWizard } from "@/components/auth/onboarding-wizard";

export default async function OnboardingPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ interest?: string; next?: string }> }) {
  const { locale } = await params;
  const { interest, next } = await searchParams;
  const user = await getSession();
  if (!user) redirect(`/${locale}/register?next=${encodeURIComponent(`/${locale}/onboarding${interest ? `?interest=${interest}` : ""}`)}`);
  return <OnboardingWizard locale={locale} initialInterest={interest} next={next} />;
}
