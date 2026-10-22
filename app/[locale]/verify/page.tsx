import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";

export default async function VerifyIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <Container size="sm" className="py-32">
      <p className="eyebrow mb-3">{t.cert.verifyTitle}</p>
      <h1 className="display-md text-ink">{t.cert.verifyTitle}</h1>
      <form action="/api/verify-redirect" method="get" className="mt-8 flex gap-3">
        <input type="hidden" name="locale" value={locale} /><Input name="id" placeholder="SA-2026-XXXXXX" required pattern="[A-Za-z0-9-]+" aria-label={t.cert.id} />
        <Button type="submit" >{t.common.search}</Button>
      </form>
      <Notice tone="compliance" className="mt-6">{t.cert.disclaimer}</Notice>
    </Container>
  );
}
