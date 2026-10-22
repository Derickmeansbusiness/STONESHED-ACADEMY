import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { LEGAL } from "@/lib/content/legal";
import { renderMarkdownLite } from "@/lib/utils";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return <Container size="sm" className="pt-28 pb-12"><p className="eyebrow mb-2">Stoneshed Academy</p><h1 className="display-md text-ink">{t.footer.privacy}</h1><div className="prose-sa mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdownLite(LEGAL.privacy[locale]) }} /></Container>;
}
