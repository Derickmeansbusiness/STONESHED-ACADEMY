"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, GraduationCap, CalendarDays, Building2, Handshake, ShieldCheck, Landmark, Users, ScrollText, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { PERMISSIONS } from "@/lib/auth/permissions";
import type { Role } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const ITEMS = [
  ["", "overview", LayoutDashboard, "admin.view"],
  ["/content", "content", BookOpen, "admin.view"],
  ["/learning", "learning", GraduationCap, "admin.view"],
  ["/events", "events", CalendarDays, "events.checkin"],
  ["/institutions", "institutions", Building2, "institutions.manage"],
  ["/engagement", "engagement", Handshake, "engagement.view"],
  ["/governance", "governance", ShieldCheck, "content.approve"],
  ["/funds", "fundData", Landmark, "admin.view"],
  ["/users", "users", Users, "users.manage"],
  ["/audit", "audit", ScrollText, "audit.view"],
  ["/ai", "ai", Sparkles, "ai.view"],
] as const;

export function AdminNav({ role, name }: { role: Role; name: string }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const base = `/${locale}/admin`;
  return (
    <aside className="border-b border-mist bg-white lg:min-h-[calc(100vh-72px)] lg:border-r lg:border-b-0">
      <div className="px-5 py-5"><p className="eyebrow">{t.admin.title}</p><p className="mt-1 text-sm font-semibold text-ink">{name}</p><p className="text-xs text-steel">{role.replace(/_/g, " ")}</p></div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-6">
        {ITEMS.filter(([, , , perm]) => PERMISSIONS[perm]?.includes(role)).map(([href, key, Icon]) => {
          const full = base + href;
          const active = href === "" ? pathname === base : pathname.startsWith(full);
          return <Link key={key} href={full} className={cn("flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition", active ? "bg-royal text-white" : "text-slate hover:bg-cloud")}><Icon className="h-4 w-4" />{t.admin[key]}</Link>;
        })}
      </nav>
    </aside>
  );
}
