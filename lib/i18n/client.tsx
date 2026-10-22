"use client";
import { createContext, useContext } from "react";
import type { Dictionary, Locale } from "./index";

type Ctx = { locale: Locale; t: Dictionary };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, dictionary, children }: { locale: Locale; dictionary: Dictionary; children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale, t: dictionary }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
