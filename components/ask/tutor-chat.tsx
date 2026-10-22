"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, Send, ExternalLink, Wifi, WifiOff, UserRound } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Notice } from "@/components/ui/notice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Source = { id: string; title: string; reference: string; sourceType: string; snippet: string; href?: string };
type Msg = { role: "user" | "assistant"; text: string; sources?: Source[]; mode?: string; referral?: boolean; suggestions?: { label: string; href: string }[] };

export function TutorChat({ initialQuestion, live }: { initialQuestion?: string; live: boolean }) {
  const { locale, t } = useLocale();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState(initialQuestion ?? "");
  const [busy, setBusy] = useState(false);
  const sessionId = useRef<string>("");
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => { try { sessionId.current = sessionStorage.getItem("sa_ai_session") || Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("sa_ai_session", sessionId.current); } catch { sessionId.current = "anon-" + Date.now(); } }, []);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const initialSent = useRef(false);
  useEffect(() => { if (initialQuestion && !initialSent.current) { initialSent.current = true; void send(initialQuestion); } }, [initialQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(q: string, mode: string = "default") {
    const question = q.trim();
    if (!question || busy) return;
    setMsgs((m) => [...m, { role: "user", text: mode === "default" ? question : `${modeLabel(mode)} — ${question}` }]);
    setInput(""); setBusy(true);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question, locale, sessionId: sessionId.current, mode }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "error");
      setMsgs((m) => [...m, { role: "assistant", text: data.answer, sources: data.sources, mode: data.mode, referral: data.referral, suggestions: data.suggestions }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: t.common.error }]);
    } finally { setBusy(false); }
  }
  function modeLabel(mode: string) { return ({ simpler: t.ask.simpler, example: t.ask.example, quiz: t.ask.quiz, translate: t.ask.translate, lesson: t.ask.lesson } as Record<string, string>)[mode] ?? mode; }
  const lastUser = [...msgs].reverse().find((m) => m.role === "user")?.text.replace(/^.*? — /, "");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="flex min-h-[560px] flex-col rounded-3xl border border-mist/70 bg-white shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-mist/60 px-5 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-royal"><Sparkles className="h-4 w-4" />{t.ask.title}</span>
          <Badge tone={live ? "green" : "amber"}>{live ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}{live ? t.ask.liveMode : t.ask.offlineMode}</Badge>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 thin-scroll" aria-live="polite">
          {msgs.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-steel">{locale === "fr" ? "Commencez par une question, par exemple :" : "Start with a question, for example:"}</p>
              <div className="grid gap-2 sm:grid-cols-2">{t.ask.examples.map((q) => <button key={q} onClick={() => send(q)} className="rounded-xl border border-mist bg-porcelain px-4 py-3 text-left text-sm text-slate transition hover:border-finance hover:bg-white">{q}</button>)}</div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "")}>
              {m.role === "assistant" && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal text-white"><Sparkles className="h-4 w-4" /></span>}
              <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed", m.role === "user" ? "bg-royal text-white" : "bg-cloud/70 text-slate")}>
                {m.text.split("\n\n").map((p, k) => <p key={k} className={k > 0 ? "mt-3" : ""}>{p}</p>)}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-4 border-t border-mist pt-3">
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-steel">{t.ask.sources}</p>
                    <ol className="space-y-1.5 text-xs">{m.sources.map((s, k) => <li key={s.id} className="flex gap-2"><span className="num font-bold text-finance">[{k + 1}]</span><span>{s.href ? <Link href={s.href} className="font-semibold text-royal hover:underline">{s.title}</Link> : <span className="font-semibold text-royal">{s.title}</span>}<span className="block text-steel">{s.reference}</span></span></li>)}</ol>
                  </div>
                )}
                {m.referral && <Link href={`/${locale}/funds#adviser`} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-royal shadow-sm hover:bg-sky/20"><UserRound className="h-3.5 w-3.5" />{t.funds.speak}</Link>}
                {m.suggestions && m.suggestions.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{m.suggestions.map((s) => <Link key={s.href} href={s.href} className="inline-flex items-center gap-1 rounded-full border border-mist bg-white px-2.5 py-1 text-[11px] font-semibold text-royal hover:border-finance">{s.label}<ExternalLink className="h-3 w-3" /></Link>)}</div>}
              </div>
              {m.role === "user" && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cloud text-royal"><UserRound className="h-4 w-4" /></span>}
            </div>
          ))}
          {busy && <div className="flex gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal text-white"><Sparkles className="h-4 w-4 animate-pulse" /></span><div className="rounded-2xl bg-cloud/70 px-4 py-3 text-sm text-steel">{t.common.loading}…</div></div>}
          <div ref={bottom} />
        </div>
        {lastUser && (
          <div className="flex flex-wrap gap-1.5 border-t border-mist/60 px-5 py-2.5">
            {(["simpler", "example", "quiz", "translate", "lesson"] as const).map((m) => <button key={m} disabled={busy} onClick={() => send(lastUser, m)} className="rounded-full border border-mist bg-white px-3 py-1 text-xs font-semibold text-steel transition hover:border-finance hover:text-royal disabled:opacity-50">{modeLabel(m)}</button>)}
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="flex items-center gap-2 border-t border-mist/60 p-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.ask.placeholder} className="flex-1 rounded-full border border-mist bg-porcelain px-4 py-3 text-sm outline-none focus:border-finance" aria-label={t.ask.placeholder} maxLength={1000} />
          <button type="submit" disabled={busy || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-full bg-royal text-white transition hover:bg-finance disabled:opacity-50" aria-label={t.ask.send}><Send className="h-4 w-4" /></button>
        </form>
      </div>
      <aside className="space-y-4">
        <Notice tone="compliance">{t.ask.notice}</Notice>
        {!live && <Notice tone="demo" title={t.ask.offlineMode}>{t.ask.offlineBody}</Notice>}
      </aside>
    </div>
  );
}
