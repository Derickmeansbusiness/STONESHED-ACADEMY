"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { onboardingAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Notice } from "@/components/ui/notice";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const INTERESTS = ["money", "investing", "funds", "wealth", "markets", "treasury", "professional"] as const;
const AUDIENCES = ["student", "first_time", "professional", "investor", "corporate", "diaspora"] as const;
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export function OnboardingWizard({ locale, initialInterest, next }: { locale: Locale; initialInterest?: string; next?: string }) {
  const { t } = useLocale();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>(initialInterest && (INTERESTS as readonly string[]).includes(initialInterest) ? [initialInterest] : []);
  const [audience, setAudience] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [lang, setLang] = useState<Locale>(locale);
  const canNext = [interests.length > 0, !!audience, !!level, true][step];

  return (
    <Container size="sm" className="py-28">
      <div className="mb-8 flex items-center gap-2">{[0, 1, 2, 3].map((i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-finance" : "bg-mist")} />)}</div>
      <h1 className="display-sm text-ink">{t.onboarding.title}</h1>
      <form action={onboardingAction} className="mt-8">
        <input type="hidden" name="locale" value={lang} />
        {next && <input type="hidden" name="next" value={next} />}
        {interests.map((i) => <input key={i} type="hidden" name="interests" value={i} />)}
        <input type="hidden" name="audience" value={audience} />
        <input type="hidden" name="level" value={level} />
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
            {step === 0 && (
              <Step title={t.onboarding.step1} hint={t.onboarding.step1Hint}>
                {INTERESTS.map((k) => <Choice key={k} on={interests.includes(k)} onClick={() => setInterests((v) => (v.includes(k) ? v.filter((x) => x !== k) : v.length < 3 ? [...v, k] : v))}>{t.pathways[k]}</Choice>)}
              </Step>
            )}
            {step === 1 && (
              <Step title={t.onboarding.step2}>
                {AUDIENCES.map((k) => <Choice key={k} on={audience === k} onClick={() => setAudience(k)}>{t.onboarding.audiences[k]}</Choice>)}
              </Step>
            )}
            {step === 2 && (
              <Step title={t.onboarding.step3}>
                {LEVELS.map((k) => <Choice key={k} on={level === k} onClick={() => setLevel(k)}>{t.onboarding.levels[k]}</Choice>)}
              </Step>
            )}
            {step === 3 && (
              <Step title={t.onboarding.step4}>
                <Choice on={lang === "en"} onClick={() => setLang("en")}>English</Choice>
                <Choice on={lang === "fr"} onClick={() => setLang("fr")}>Français</Choice>
              </Step>
            )}
          </motion.div>
        </AnimatePresence>
        <Notice tone="compliance" className="mt-8">{t.onboarding.disclaimer}</Notice>
        <div className="mt-8 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}><ArrowLeft className="h-4 w-4" />{t.common.back}</Button>
          {step < 3 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext}>{t.common.next}<ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button type="submit">{t.onboarding.finish}<Check className="h-4 w-4" /></Button>
          )}
        </div>
      </form>
    </Container>
  );
}

function Step({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display text-xl font-bold text-ink">{title}</legend>
      {hint && <p className="mt-1 text-sm text-steel">{hint}</p>}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={cn("flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition", on ? "border-finance bg-finance/5 text-royal shadow-[var(--shadow-soft)]" : "border-mist bg-white text-slate hover:border-sky")}>
      {children}
      <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", on ? "border-finance bg-finance text-white" : "border-mist")}>{on && <Check className="h-3 w-3" />}</span>
    </button>
  );
}
