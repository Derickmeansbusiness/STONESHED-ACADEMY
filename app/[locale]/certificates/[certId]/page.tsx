import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";
import { eq } from "drizzle-orm";
import { ArrowLeft, Printer } from "lucide-react";
import { db, schema } from "@/lib/db";
import { getSession, isStaff } from "@/lib/auth/session";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/ui/logo";
import { PrintButton } from "@/components/ui/print-button";

export default async function CertificatePage({ params }: { params: Promise<{ locale: Locale; certId: string }> }) {
  const { locale, certId } = await params;
  const t = getDictionary(locale);
  const user = await getSession();
  const cert = await db.query.certificates.findFirst({ where: eq(schema.certificates.id, certId), with: { course: true } });
  if (!cert) notFound();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/certificates/${certId}`)}`);
  if (user.id !== cert.userId && !isStaff(user.role)) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const verifyUrl = `${site}/${locale}/verify/${cert.id}`;
  const qr = await QRCode.toString(verifyUrl, { type: "svg", margin: 0, color: { dark: "#0B2F73", light: "#ffffff00" } });
  const title = locale === "fr" ? cert.course.titleFr : cert.course.titleEn;

  return (
    <div className="min-h-screen bg-cloud/60 px-4 py-10 print:bg-white print:p-0">
      <div className="no-print mx-auto mb-6 flex max-w-4xl items-center justify-between">
        <Link href={`/${locale}/dashboard`} className="inline-flex items-center gap-1 text-sm font-medium text-steel hover:text-royal"><ArrowLeft className="h-4 w-4" />{t.nav.myLearning}</Link>
        <PrintButton label={t.common.print} icon={<Printer className="h-4 w-4" />} />
      </div>
      <div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden rounded-2xl border border-mist bg-white p-8 shadow-[var(--shadow-lift)] print:rounded-none print:border-0 print:shadow-none sm:p-14">
        <div className="absolute inset-0 grid-fade opacity-70" />
        <div className="absolute inset-4 rounded-xl border-2 border-royal/20 sm:inset-6" />
        <div className="absolute inset-5 rounded-lg border border-sky/40 sm:inset-7" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <Logo />
            <div className="text-right text-[10px] uppercase tracking-[0.2em] text-steel"><p>{t.cert.id}</p><p className="num mt-0.5 font-display text-sm font-bold tracking-wider text-royal">{cert.id}</p></div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="eyebrow">{t.cert.title}</p>
            <p className="mt-6 text-sm text-steel">{t.cert.awardedTo}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-5xl">{cert.learnerName}</p>
            <p className="mt-6 text-sm text-steel">{t.cert.completed}</p>
            <p className="mt-2 max-w-2xl font-display text-xl font-bold text-royal sm:text-2xl">{title}</p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="text-xs text-steel">
              <p><span className="font-semibold text-slate">{t.cert.issued}:</span> {formatDate(cert.issuedAt, locale)}</p>
              <p className="mt-1"><span className="font-semibold text-slate">{t.cert.verify}:</span> {verifyUrl.replace(/^https?:\/\//, "")}</p>
              <p className="mt-3 max-w-md text-[10px] leading-relaxed">{t.cert.disclaimer}</p>
            </div>
            <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
        </div>
      </div>
    </div>
  );
}
