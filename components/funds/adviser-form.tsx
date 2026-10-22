"use client";
import { useActionState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { adviserInquiryAction, type FormState } from "@/lib/actions/engagement";
import { Field, Input, Select, Textarea, Checkbox } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";

export function AdviserForm({ fundSlug, source = "fund_page", defaultTopic, user }: { fundSlug?: string; source?: string; defaultTopic?: string; user?: { fullName: string; email: string } | null }) {
  const { locale, t } = useLocale();
  const [state, action, pending] = useActionState<FormState, FormData>(adviserInquiryAction, undefined);
  if (state?.ok) return <Notice tone="compliance" title={t.funds.adviserTitle}>{t.funds.adviserSent}</Notice>;
  return (
    <form action={action} className="space-y-4" id="adviser">
      <input type="hidden" name="locale" value={locale} /><input type="hidden" name="source" value={source} />{fundSlug && <input type="hidden" name="fundSlug" value={fundSlug} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.auth.fullName}><Input name="fullName" required defaultValue={user?.fullName} /></Field>
        <Field label={t.auth.email}><Input name="email" type="email" required defaultValue={user?.email} /></Field>
        <Field label={locale === "fr" ? "Téléphone (facultatif)" : "Phone (optional)"}><Input name="phone" /></Field>
        <Field label={locale === "fr" ? "Canal préféré" : "Preferred channel"}><Select name="preferredChannel" defaultValue="email"><option value="email">{t.common.email}</option><option value="phone">{locale === "fr" ? "Téléphone" : "Phone"}</option><option value="video">{locale === "fr" ? "Visioconférence" : "Video call"}</option><option value="in_person">{locale === "fr" ? "En personne" : "In person"}</option></Select></Field>
      </div>
      <Field label={locale === "fr" ? "Sujet" : "Topic"}><Input name="topic" required defaultValue={defaultTopic} /></Field>
      <Field label={locale === "fr" ? "Votre question (facultatif)" : "Your question (optional)"}><Textarea name="message" /></Field>
      <Checkbox name="consent" required label={t.funds.adviserConsent} />
      {state?.error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{state.error}</p>}
      <Button type="submit" disabled={pending}>{pending ? t.common.loading + "…" : t.funds.speak}</Button>
    </form>
  );
}
