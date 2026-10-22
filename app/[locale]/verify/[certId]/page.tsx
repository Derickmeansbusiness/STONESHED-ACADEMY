import { eq } from "drizzle-orm";
import { ShieldCheck, ShieldX } from "lucide-react";
import { db, schema } from "@/lib/db";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";

export default async function VerifyPage({ params }: { params: Promise<{ locale: Locale; certId: string }> }) {
  const { locale, certId } = await params;
  const t = getDictionary(locale);
  const cert = await db.query.certificates.findFirst({ where: eq(schema.certificates.id, certId.toUpperCase()) });
  const valid = cert && !cert.revokedAt;
  return (
    <Container size="sm" className="py-32">
      <p className="eyebrow mb-3">{t.cert.verifyTitle}</p>
      <div className={`rounded-3xl border p-8 ${valid ? "border-success/40 bg-success/5" : "border-danger/40 bg-danger/5"}`}>
        <div className="flex items-center gap-3">{valid ? <ShieldCheck className="h-8 w-8 text-success" /> : <ShieldX className="h-8 w-8 text-danger" />}<h1 className="display-sm text-ink">{valid ? t.cert.valid : cert ? t.cert.revoked : t.cert.invalid}</h1></div>
        {cert && (
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-wider text-steel">{t.cert.id}</dt><dd className="num font-semibold text-ink">{cert.id}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-steel">{t.common.name}</dt><dd className="font-semibold text-ink">{cert.learnerName}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-wider text-steel">{t.learn.title}</dt><dd className="font-semibold text-ink">{cert.courseTitle}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-steel">{t.cert.issued}</dt><dd className="font-semibold text-ink">{formatDate(cert.issuedAt, locale)}</dd></div>
          </dl>
        )}
      </div>
      <Notice tone="compliance" className="mt-6">{t.cert.disclaimer}</Notice>
    </Container>
  );
}
