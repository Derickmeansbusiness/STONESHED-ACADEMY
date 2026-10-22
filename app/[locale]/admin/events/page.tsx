import { asc, eq } from "drizzle-orm";
import { getDictionary, pick, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { checkInAction } from "@/lib/actions/events";
import { updateEventStatusAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { QrScanner } from "@/components/admin/qr-scanner";

export default async function AdminEvents({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ event?: string; result?: string; reg?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const events = await db.query.events.findMany({ orderBy: [asc(schema.events.startsAt)], with: { registrations: { with: { user: true, attendance: true } } } });
  const selected = events.find((e) => e.id === sp.event) ?? events.find((e) => new Date(e.endsAt) > new Date()) ?? events[0];
  const path = `/${locale}/admin/events?event=${selected?.id ?? ""}`;
  const regs = selected ? selected.registrations.filter((r) => r.status !== "cancelled") : [];
  const checked = regs.filter((r) => r.attendance.length > 0).length;
  const reg = sp.reg ? await db.query.eventRegistrations.findFirst({ where: eq(schema.eventRegistrations.id, sp.reg), with: { user: true } }) : null;
  return (
    <>
      <PageTitle title={t.admin.events} sub={fr ? "Programmes, inscriptions, participants, accueil et présence." : "Programs, registrations, participants, check-in and attendance."}>
        {selected && <a href={`/api/admin/events/${selected.id}/attendees.csv`} className={btnCls}>{fr ? "Exporter la liste (CSV)" : "Export attendee list (CSV)"}</a>}
      </PageTitle>
      <Table head={[fr ? "Événement" : "Event", t.common.date, fr ? "Capacité" : "Capacity", fr ? "Inscrits" : "Registered", fr ? "Liste d'attente" : "Waitlist", fr ? "Présents" : "Attended", t.common.status, t.common.actions]}>
        {events.map((e) => { const c = e.registrations.filter((r) => r.status === "confirmed").length, w = e.registrations.filter((r) => r.status === "waitlisted").length, a = e.registrations.filter((r) => r.attendance.length).length; return (
          <tr key={e.id} className={e.id === selected?.id ? "bg-sky/10" : ""}><Td><a href={`/${locale}/admin/events?event=${e.id}`} className="font-medium text-ink hover:text-finance">{pick(e, "title", locale)}</a></Td><Td className="text-xs">{formatDate(e.startsAt, locale)}</Td><Td className="num">{e.capacity}</Td><Td className="num">{c}</Td><Td className="num">{w}</Td><Td className="num">{a}</Td><Td><Badge tone={e.status === "open" ? "green" : e.status === "completed" ? "gray" : "amber"}>{e.status}</Badge></Td>
            <Td><form action={updateEventStatusAction} className="flex items-center gap-1.5"><input type="hidden" name="eventId" value={e.id} /><input type="hidden" name="path" value={path} /><select name="status" defaultValue={e.status} className={selectCls}>{["draft", "open", "waitlist", "closed", "completed", "cancelled"].map((s) => <option key={s}>{s}</option>)}</select><input name="capacity" type="number" defaultValue={e.capacity} className="w-16 rounded-lg border border-mist px-2 py-1.5 text-xs" /><button className={btnCls}>{t.common.save}</button></form></Td></tr>
        ); })}
      </Table>
      {selected && (
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-ink">{t.admin.checkin} — {pick(selected, "title", locale)}</h2>
            <div className="grid grid-cols-2 gap-3"><Kpi label={fr ? "Inscrits" : "Registered"} value={regs.length} /><Kpi label={fr ? "Présents" : "Checked in"} value={checked} tone="royal" /></div>
            <form action={checkInAction} className="surface space-y-3 p-5">
              <input type="hidden" name="path" value={path} />
              <label className="block text-sm font-semibold text-ink">{fr ? "Code du billet" : "Ticket code"}<input name="ticketCode" placeholder="SE-XXXX-XXXX" className="mt-1.5 w-full rounded-xl border border-mist px-4 py-3 font-mono text-sm uppercase outline-none focus:border-finance" autoFocus /></label>
              <button className={btnCls + " w-full py-2.5"}>{fr ? "Enregistrer la présence" : "Check in"}</button>
              <QrScanner label={fr ? "Scanner un QR (caméra)" : "Scan a QR code (camera)"} />
            </form>
            {sp.result === "ok" && <Notice tone="compliance">{fr ? "Présence enregistrée" : "Checked in"}: {reg?.user.fullName}</Notice>}
            {sp.result === "already" && <Notice tone="info">{fr ? "Déjà enregistré(e)" : "Already checked in"}: {reg?.user.fullName}</Notice>}
            {sp.result === "notfound" && <Notice tone="warning">{fr ? "Billet introuvable." : "Ticket not found."}</Notice>}
          </div>
          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-ink">{fr ? "Participants" : "Participants"}</h2>
            <Table head={[t.common.name, fr ? "Affiliation" : "Affiliation", fr ? "Billet" : "Ticket", t.common.status, fr ? "Présence" : "Attendance"]}>
              {regs.map((r) => <tr key={r.id}><Td className="font-medium text-ink">{r.user.fullName}<span className="block text-xs text-steel">{r.user.email}</span></Td><Td className="text-xs">{r.affiliation ?? "—"}</Td><Td className="num text-xs">{r.ticketCode}</Td><Td><Badge tone={r.status === "confirmed" ? "green" : "amber"}>{r.status}</Badge></Td><Td>{r.attendance.length ? <Badge tone="green">✓ {r.attendance[0].method}</Badge> : <form action={checkInAction}><input type="hidden" name="registrationId" value={r.id} /><input type="hidden" name="path" value={path} /><button className="rounded-lg border border-mist px-2 py-1 text-xs font-semibold hover:border-finance">{fr ? "Pointer" : "Check in"}</button></form>}</Td></tr>)}
            </Table>
          </div>
        </section>
      )}
    </>
  );
}
