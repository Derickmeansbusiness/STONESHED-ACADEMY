import { redirect } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getSession, can } from "@/lib/auth/session";
import { AdminNav } from "@/components/admin/admin-nav";
import { Notice } from "@/components/ui/notice";

export default async function AdminLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getDictionary(locale);
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/admin`)}`);
  if (!can(user.role, "admin.view")) redirect(`/${locale}/dashboard`);
  return (
    <div className="pt-[72px]">
      <div className="mx-auto grid w-full max-w-[88rem] gap-0 lg:grid-cols-[250px_1fr]">
        <AdminNav role={user.role} name={user.fullName} />
        <div className="min-w-0 px-5 py-8 sm:px-8">
          <Notice tone="demo" className="mb-6">{t.admin.fictional}</Notice>
          {children}
        </div>
      </div>
    </div>
  );
}
