"use client";
import { useActionState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { partnershipInquiryAction, type FormState } from "@/lib/actions/engagement";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";

export function PartnershipForm({ programs }: { programs: { slug: string; label: string }[] }) {
  const { locale, t } = useLocale();
  const [state, action, pending] = useActionState<FormState, FormData>(partnershipInquiryAction, undefined);
  const f = t.institutions.fields;
  if (state?.ok) return <Notice tone="compliance">{t.institutions.sent}</Notice>;
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.institutionName}><Input name="institutionName" required /></Field>
        <Field label={f.institutionType}><Select name="institutionType" required defaultValue="university">{Object.entries(t.institutions.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></Field>
        <Field label={f.contactPerson}><Input name="contactPerson" required /></Field>
        <Field label={f.email}><Input name="email" type="email" required /></Field>
        <Field label={f.phone}><Input name="phone" /></Field>
        <Field label={f.participants}><Input name="expectedParticipants" type="number" min={1} /></Field>
        <Field label={f.city}><Input name="city" required /></Field>
        <Field label={f.country}><Input name="country" required defaultValue={locale === "fr" ? "Cameroun" : "Cameroon"} /></Field>
        <Field label={f.program}><Select name="requestedProgram" required>{programs.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}</Select></Field>
        <Field label={f.format}><Select name="deliveryFormat" required defaultValue="on_campus">{Object.entries(t.institutions.formats).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></Field>
      </div>
      <Field label={f.timing}><Input name="preferredTiming" /></Field>
      <Field label={f.details}><Textarea name="details" /></Field>
      {state?.error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{state.error}</p>}
      <Button type="submit" disabled={pending}>{pending ? t.common.loading + "…" : t.institutions.inquiry}</Button>
    </form>
  );
}
