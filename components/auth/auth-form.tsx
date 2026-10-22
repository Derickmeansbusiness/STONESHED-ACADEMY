"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { registerAction, signinAction, type AuthState } from "@/lib/actions/auth";
import { Field, Input, Checkbox } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Notice } from "@/components/ui/notice";
import { DEMO_PASSWORD } from "@/lib/content/demo-accounts";
import type { Locale } from "@/lib/i18n";

type Demo = readonly { email: string; labelEn: string; labelFr: string }[];

export function AuthForm({ mode, locale, next, title, sub, demo }: { mode: "signin" | "register"; locale: Locale; next?: string; title: string; sub: string; demo?: Demo }) {
  const { t } = useLocale();
  const action = mode === "signin" ? signinAction : registerAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-midnight p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="grid-fade absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(18,101,200,0.45),_transparent_60%)]" />
        <Logo light className="relative" />
        <div className="relative">
          <p className="eyebrow-light mb-4">{t.meta.tagline}</p>
          <h2 className="display-md max-w-md text-white">{t.home.finalTitle}</h2>
          <p className="mt-4 max-w-md text-white/65">{t.meta.description}</p>
        </div>
        <p className="relative text-xs text-white/40">© Stoneshed Asset Management S.A. · {t.footer.hashtag}</p>
      </div>
      <div className="flex items-center justify-center px-5 py-28 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="display-sm text-ink">{title}</h1>
          <p className="mt-2 text-steel">{sub}</p>
          <form action={formAction} className="mt-8 space-y-4">
            <input type="hidden" name="locale" value={locale} />
            {next && <input type="hidden" name="next" value={next} />}
            {mode === "register" && (
              <Field label={t.auth.fullName}><Input name="fullName" required minLength={2} autoComplete="name" /></Field>
            )}
            <Field label={t.auth.email}><Input name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label={t.auth.password} hint={mode === "register" ? t.auth.passwordHint : undefined}><Input name="password" type="password" required minLength={mode === "register" ? 8 : 1} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
            {mode === "register" && (
              <div className="space-y-3 pt-1">
                <Checkbox name="terms" required label={t.auth.terms} />
                <Checkbox name="minor" label={t.auth.minor} />
              </div>
            )}
            {state?.error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">{state.error}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={pending}>{pending ? t.common.loading + "…" : mode === "signin" ? t.auth.signIn : t.auth.register}</Button>
          </form>
          <p className="mt-6 text-sm text-steel">
            {mode === "signin" ? t.auth.noAccount : t.auth.haveAccount}{" "}
            <Link href={`/${locale}/${mode === "signin" ? "register" : "signin"}${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-finance hover:underline">{mode === "signin" ? t.auth.register : t.auth.signIn}</Link>
          </p>
          {mode === "signin" && demo && (
            <div className="mt-10">
              <Notice tone="demo" title={t.auth.demoTitle}>
                <p className="mb-3">{t.auth.demoSub}</p>
                <div className="grid gap-1.5">
                  {demo.map((d) => (
                    <button key={d.email} type="button" onClick={() => { setEmail(d.email); setPassword(DEMO_PASSWORD); }} className="flex items-center justify-between rounded-lg border border-mist bg-white px-3 py-2 text-left text-xs hover:border-finance">
                      <span className="font-medium text-ink">{locale === "fr" ? d.labelFr : d.labelEn}</span>
                      <span className="text-steel">{d.email}</span>
                    </button>
                  ))}
                </div>
              </Notice>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
