import { randomBytes } from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous characters

export function newId(prefix = ""): string {
  const bytes = randomBytes(12);
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return prefix ? `${prefix}_${out}` : out;
}

export function certificateId(): string {
  const year = new Date().getFullYear();
  return `SA-${year}-${newId().slice(0, 6)}`;
}

export function ticketCode(): string {
  return `SE-${newId().slice(0, 4)}-${newId().slice(0, 4)}`;
}
