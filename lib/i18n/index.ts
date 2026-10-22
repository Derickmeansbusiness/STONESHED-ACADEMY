import { en, type Dictionary } from "./en";
import { fr } from "./fr";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fr";
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "fr" ? fr : en;
}

export type { Dictionary };

/** Pick the localized field from a bilingual record, e.g. pick(course, "title", locale). */
export function pick<T extends Record<string, unknown>>(record: T, base: string, locale: Locale): string {
  const key = `${base}${locale === "fr" ? "Fr" : "En"}`;
  const v = record[key];
  return typeof v === "string" ? v : "";
}

export function pickArr<T extends Record<string, unknown>, R = string>(record: T, base: string, locale: Locale): R[] {
  const key = `${base}${locale === "fr" ? "Fr" : "En"}`;
  const v = record[key];
  return Array.isArray(v) ? (v as R[]) : [];
}

export function formatFcfa(value: number, locale: Locale, opts: { compact?: boolean } = {}): string {
  const rounded = Math.round(value);
  if (opts.compact && Math.abs(rounded) >= 1_000_000) {
    const m = rounded / 1_000_000;
    return `${m.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: m >= 100 ? 0 : 1 })} M FCFA`;
  }
  return `${rounded.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")} FCFA`;
}

export function formatDate(iso: string | number | Date, locale: Locale, opts: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof iso === "number" ? new Date(iso * 1000) : new Date(iso);
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", ...opts });
}

export function formatTime(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function formatPct(value: number, locale: Locale, digits = 1): string {
  return `${value.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: digits })} %`;
}
