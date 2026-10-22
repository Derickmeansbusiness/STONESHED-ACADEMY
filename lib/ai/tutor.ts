/**
 * Ask Stoneshed AI — source-grounded tutor.
 *
 * Retrieval: keyword scoring over approved knowledge sources (aiKnowledgeSources).
 * Generation: Claude via the Anthropic Messages API when ANTHROPIC_API_KEY is configured;
 * otherwise a transparent "grounded offline" mode that assembles an answer from the
 * retrieved sources with citations. Never invents returns, NAVs, approvals or guarantees.
 */
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import type { Locale } from "@/lib/i18n";

export type TutorSource = { id: string; title: string; reference: string; sourceType: string; snippet: string; href?: string };
export type TutorResult = { answer: string; sources: TutorSource[]; mode: "live_model" | "grounded_offline"; referral: boolean; suggestions: { label: string; href: string }[] };

const STOP = new Set(["the", "and", "what", "does", "how", "why", "with", "that", "this", "from", "for", "are", "une", "des", "les", "que", "qui", "est", "pour", "dans", "comment", "pourquoi", "quoi", "quel", "quelle", "mean", "explain", "about", "you", "can", "your", "me", "moi", "signifie", "entre", "expliquer", "simplement"]);

function tokens(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
}

const SYNONYMS: Record<string, string[]> = {
  nav: ["net asset value", "valeur liquidative", "liquidative"],
  fund: ["mutual fund", "fcp", "fonds", "opcvm"],
  fonds: ["fcp", "fund", "opcvm"],
  bond: ["obligation", "bonds", "coupon"],
  obligation: ["bond", "coupon"],
  gold: ["stoneshed gold", "distribution"],
  classic: ["stoneshed classic", "capitalisation", "capitalization"],
  risk: ["risque", "volatility"],
  inflation: ["purchasing power", "pouvoir d'achat"],
  fee: ["fees", "frais", "management fee"],
  frais: ["fee", "fees"],
  save: ["saving", "savings", "epargne", "épargne"],
  epargne: ["saving", "savings"],
};

const PERSONAL = [/should i (invest|buy|put|subscribe)/i, /is it (a )?good (idea|time) for me/i, /my (savings|salary|money|situation|portfolio)/i, /how much should i/i, /dois-je (investir|souscrire|acheter)/i, /est-ce que je dois/i, /ma situation/i, /mon (epargne|épargne|salaire|argent|portefeuille)/i, /combien dois-je/i, /which fund (should|is best)/i, /quel fonds (choisir|me)/i];

export async function retrieve(question: string, locale: Locale, limit = 5): Promise<(TutorSource & { content: string; score: number })[]> {
  const q = tokens(question);
  const expanded = new Set(q);
  for (const w of q) for (const syn of SYNONYMS[w] ?? []) for (const x of tokens(syn)) expanded.add(x);
  const sources = await db.query.aiKnowledgeSources.findMany({ where: eq(schema.aiKnowledgeSources.locale, locale) });
  const mentionsStoneshed = /stoneshed|classic|gold/i.test(question);
  const scored = sources.map((s) => {
    const kw = new Set(s.keywords.map((k) => tokens(k)).flat());
    const title = tokens(s.title);
    const body = s.content.toLowerCase();
    let score = 0;
    for (const w of expanded) {
      if (title.includes(w)) score += 4;
      if (kw.has(w)) score += 2;
      if (body.includes(w)) score += 1;
    }
    if (mentionsStoneshed && s.sourceType === "fund_document") score += 3;
    if (!mentionsStoneshed && s.sourceType === "fund_document") score -= 2;
    if (s.sourceType === "glossary") score += 0.5;
    if (/FAQ/i.test(s.reference)) score += 2.5;
    return { s, score };
  }).filter((x) => x.score > 2).sort((a, b) => b.score - a.score).slice(0, limit);
  return scored.map(({ s, score }) => ({ id: s.id, title: s.title, reference: s.reference, sourceType: s.sourceType, snippet: s.content.replace(/[#*>|:]+/g, " ").replace(/\s+/g, " ").slice(0, 260).trim() + "…", content: s.content, score, href: hrefFor(s.reference, locale) }));
}

function hrefFor(reference: string, locale: Locale): string | undefined {
  if (reference.startsWith("lesson:")) { const [course, lesson] = reference.slice(7).split("/"); return `/${locale}/learn/${course}/${lesson}`; }
  if (reference.startsWith("article:")) return `/${locale}/insights/${reference.slice(8)}`;
  if (reference.startsWith("glossary:")) return `/${locale}/insights/glossary#${reference.slice(9)}`;
  if (/STONESHED CLASSIC/i.test(reference)) return `/${locale}/funds/stoneshed-classic`;
  if (/STONESHED GOLD/i.test(reference)) return `/${locale}/funds/stoneshed-gold`;
  if (/FAQ/i.test(reference)) return `/${locale}/funds`;
  return undefined;
}

function suggestionsFor(sources: TutorSource[], locale: Locale) {
  const out: { label: string; href: string }[] = [];
  for (const s of sources) if (s.href && !out.some((o) => o.href === s.href)) out.push({ label: s.title, href: s.href });
  return out.slice(0, 3);
}

export async function askTutor(input: { question: string; locale: Locale; level?: string | null; userId?: string | null; sessionId: string; mode?: "default" | "simpler" | "example" | "quiz" | "translate" | "lesson" }): Promise<TutorResult> {
  const t0 = Date.now();
  const { question, locale } = input;
  const referral = PERSONAL.some((re) => re.test(question));
  const retrieved = await retrieve(question, locale);
  const sources: TutorSource[] = retrieved.map(({ content: _c, score: _s, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars
  const apiKey = process.env.ANTHROPIC_API_KEY;
  let answer = "";
  let mode: TutorResult["mode"] = "grounded_offline";

  if (apiKey) {
    try {
      answer = await callClaude({ apiKey, question, locale, level: input.level, mode: input.mode ?? "default", context: retrieved.map((r, i) => `[${i + 1}] ${r.title} (${r.reference})\n${r.content.slice(0, 1800)}`).join("\n\n") });
      mode = "live_model";
    } catch {
      answer = offlineAnswer(question, retrieved, locale, input.mode ?? "default");
    }
  } else {
    answer = offlineAnswer(question, retrieved, locale, input.mode ?? "default");
  }
  if (referral) answer += `\n\n${locale === "fr" ? "Cette question semble porter sur votre situation personnelle. L'Academy ne peut pas donner de conseil individuel : vous pouvez demander un échange avec un conseiller Stoneshed." : "This looks like a question about your personal situation. The Academy cannot give individual advice; you can request a conversation with a Stoneshed adviser."}`;

  await db.insert(schema.aiLogRecords).values({ id: newId("ai"), userId: input.userId ?? null, sessionId: input.sessionId, locale, question: question.slice(0, 2000), answer: answer.slice(0, 8000), mode, sourceIds: sources.map((s) => s.id), flagged: referral, latencyMs: Date.now() - t0 });
  return { answer, sources, mode, referral, suggestions: suggestionsFor(sources, locale) };
}

function offlineAnswer(question: string, retrieved: { title: string; reference: string; content: string; sourceType: string }[], locale: Locale, mode: string): string {
  if (!retrieved.length) {
    return locale === "fr"
      ? "Je n'ai pas trouvé de source approuvée répondant à cette question. Je préfère ne pas inventer de réponse. Essayez de reformuler, consultez le glossaire, ou posez une question sur les fonds communs de placement, la valeur liquidative, les obligations, l'inflation ou le risque."
      : "I couldn't find an approved source that answers this question, and I would rather not invent one. Try rephrasing, browse the glossary, or ask about mutual funds, NAV, bonds, inflation or risk.";
  }
  const top = retrieved[0];
  const para = (c: string) => c.replace(/^#+ .*$/gm, "").replace(/^:::.*$/gm, "").replace(/\*\*/g, "").split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 60 && !p.startsWith("|") && !p.startsWith("-"));
  const paras = para(top.content);
  const first = mode === "simpler" ? paras.slice(0, 1) : paras.slice(0, 2);
  const lead = locale === "fr" ? `D'après « ${top.title} » [1] :` : `From “${top.title}” [1]:`;
  const extras = retrieved.slice(1, 3).map((r, i) => `[${i + 2}] ${r.title}`);
  const more = extras.length ? `\n\n${locale === "fr" ? "Sources complémentaires" : "Also relevant"}: ${extras.join(" · ")}` : "";
  const quizNote = mode === "quiz" ? `\n\n${locale === "fr" ? "Les quiz interactifs sont disponibles dans chaque leçon du cours lié ci-dessous." : "Interactive quizzes are available inside each lesson of the related course below."}` : "";
  const offline = locale === "fr" ? "\n\n(Mode hors ligne fondé sur les sources : aucune clé de modèle d'IA n'est configurée, la réponse est extraite textuellement des sources approuvées.)" : "\n\n(Grounded offline mode: no AI model credential is configured, so this answer is extracted verbatim from approved sources.)";
  return `${lead}\n\n${first.join("\n\n")}${more}${quizNote}${offline}`;
}

async function callClaude(p: { apiKey: string; question: string; locale: Locale; level?: string | null; mode: string; context: string }) {
  const system = `You are Ask Stoneshed AI, the financial learning companion of Stoneshed Academy (Stoneshed Asset Management, COSUMAF-licensed, Cameroon/CEMAC). Answer in ${p.locale === "fr" ? "professional French as used in CEMAC finance" : "clear English"}. Learner level: ${p.level ?? "beginner"}. Mode: ${p.mode} (simpler = plainer language and an analogy; example = add a worked FCFA example; quiz = end with 3 multiple-choice questions and answers; translate = answer in the other language; lesson = recommend which cited source to read next).
Rules: Teach financial concepts accurately in plain language with analogies. Use only the provided SOURCES for any claim about Stoneshed products; cite them as [n]. If sources do not cover a product detail, say the information is not available and point to the official fund documents. Never state or estimate investment returns, current NAVs, performance, regulatory approvals, subscription conditions or guarantees that are not in the sources; the brochure's 6% figure is a target yield, never a guarantee or forecast. Never say a product is risk-free. Do not give personalised investment, legal or tax advice; refer such questions to a Stoneshed adviser. Keep answers under 220 words unless a detailed answer is requested.`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": p.apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5", max_tokens: 700, system, messages: [{ role: "user", content: `SOURCES:\n${p.context || "(none)"}\n\nQUESTION: ${p.question}` }] }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}`);
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  return data.content.filter((c) => c.type === "text").map((c) => c.text ?? "").join("\n").trim();
}
