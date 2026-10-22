import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthForm } from "@/components/auth/auth-form";
import { DEMO_ACCOUNTS } from "@/lib/content/demo-accounts";

export default async function SignInPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ next?: string }> }) {
  const { locale } = await params;
  const { next } = await searchParams;
  if (await getSession()) redirect(next && next.startsWith("/") ? next : `/${locale}/dashboard`);
  const t = getDictionary(locale);
  return <AuthForm mode="signin" locale={locale} next={next} demo={DEMO_ACCOUNTS} title={t.auth.signInTitle} sub={t.auth.signInSub} />;
}
