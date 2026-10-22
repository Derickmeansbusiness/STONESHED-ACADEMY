import { desc } from "drizzle-orm";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { ROLES } from "@/lib/db/schema";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { updateUserRoleAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsers({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const users = await db.query.users.findMany({ orderBy: [desc(schema.users.createdAt)], limit: 60 });
  const staff = users.filter((u) => u.role !== "learner");
  const learners = users.filter((u) => u.role === "learner");
  const path = `/${locale}/admin/users`;
  return (
    <>
      <PageTitle title={t.admin.users} sub={fr ? "Rôles, permissions et accès au mode présentation." : "Roles, permissions and presentation-mode access."} />
      <div className="surface mb-8 overflow-x-auto p-4">
        <p className="eyebrow mb-3">{fr ? "Matrice des permissions" : "Permission matrix"}</p>
        <table className="min-w-[720px] text-[11px]"><thead><tr><th className="p-1.5 text-left">{fr ? "Permission" : "Permission"}</th>{ROLES.map((r) => <th key={r} className="p-1.5 text-center">{r.replace(/_/g, " ")}</th>)}</tr></thead>
          <tbody>{Object.entries(PERMISSIONS).map(([p, roles]) => <tr key={p} className="border-t border-mist/50"><td className="p-1.5 font-semibold">{p}</td>{ROLES.map((r) => <td key={r} className="p-1.5 text-center">{roles.includes(r) ? <span className="text-success">●</span> : <span className="text-mist">○</span>}</td>)}</tr>)}</tbody></table>
      </div>
      <h2 className="mb-3 font-display text-lg font-bold text-ink">{fr ? "Équipe" : "Staff"}</h2>
      <Table head={[t.common.name, t.common.email, t.common.role, fr ? "Présentation" : "Presenter", fr ? "Dernière connexion" : "Last login", t.common.actions]}>
        {staff.map((u) => <tr key={u.id}><Td className="font-medium text-ink">{u.fullName}</Td><Td className="text-xs">{u.email}</Td><Td><Badge tone="blue">{u.role.replace(/_/g, " ")}</Badge></Td><Td>{u.isDemoPresenter ? "✓" : "—"}</Td><Td className="text-xs text-steel">{u.lastLoginAt ? formatDate(u.lastLoginAt, locale) : "—"}</Td>
          <Td><form action={updateUserRoleAction} className="flex items-center gap-1.5"><input type="hidden" name="userId" value={u.id} /><input type="hidden" name="path" value={path} /><select name="role" defaultValue={u.role} className={selectCls}>{ROLES.map((r) => <option key={r} value={r}>{r.replace(/_/g, " ")}</option>)}</select><label className="flex items-center gap-1 text-xs"><input type="checkbox" name="presenter" defaultChecked={u.isDemoPresenter} />{fr ? "présentateur" : "presenter"}</label><button className={btnCls}>{t.common.save}</button></form></Td></tr>)}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Apprenants (60 derniers)" : "Learners (latest 60)"}</h2>
      <Table head={[t.common.name, t.common.email, t.common.language, fr ? "Inscrit le" : "Registered", t.common.actions]}>
        {learners.map((u) => <tr key={u.id}><Td className="font-medium text-ink">{u.fullName}</Td><Td className="text-xs">{u.email}</Td><Td>{u.locale.toUpperCase()}</Td><Td className="text-xs text-steel">{formatDate(u.createdAt, locale)}</Td><Td><form action={updateUserRoleAction} className="flex items-center gap-1.5"><input type="hidden" name="userId" value={u.id} /><input type="hidden" name="path" value={path} /><select name="role" defaultValue={u.role} className={selectCls}>{ROLES.map((r) => <option key={r} value={r}>{r.replace(/_/g, " ")}</option>)}</select><button className={btnCls}>{t.common.save}</button></form></Td></tr>)}
      </Table>
    </>
  );
}
