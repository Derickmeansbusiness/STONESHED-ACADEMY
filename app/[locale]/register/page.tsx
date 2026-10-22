import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthForm } from "@/components/auth/auth-form";

export default async function RegisterPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ next?: string }> }) {
  const { locale } = await params;
  const { next } = await searchParams;
  if (await getSession()) redirect(`/${locale}/dashboard`);
  const t = getDictionary(locale);
  return <AuthForm mode="register" locale={locale} next={next} title={t.auth.registerTitle} sub={t.auth.registerSub} />;
}
