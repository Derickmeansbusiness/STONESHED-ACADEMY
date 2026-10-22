import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import { copyFileSync, existsSync } from "fs";
import path from "path";
import * as tables from "./schema";
import * as rels from "./relations";

const schema = { ...tables, ...rels };

/**
 * Database location.
 *  - DATABASE_URL set → used as-is (libsql/Turso URL or a local file). Persistent.
 *  - Vercel (read-only filesystem) → the seeded data/academy.db bundled with the deployment is
 *    copied to /tmp on cold start. Writes work but are per-instance and reset on redeploy;
 *    set DATABASE_URL (Turso) or migrate to PostgreSQL for persistence.
 *  - Otherwise → file:./data/academy.db
 */
function resolveUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const bundled = path.join(process.cwd(), "data", "academy.db");
  if (process.env.VERCEL || process.env.READ_ONLY_FS) {
    const tmp = "/tmp/academy.db";
    try {
      if (!existsSync(tmp) && existsSync(bundled)) copyFileSync(bundled, tmp);
      return `file:${tmp}`;
    } catch {
      return `file:${bundled}`;
    }
  }
  return `file:${bundled}`;
}

declare global {
  var __stoneshedDbClient: Client | undefined;
}

const client = globalThis.__stoneshedDbClient ?? createClient({ url: resolveUrl(), authToken: process.env.DATABASE_AUTH_TOKEN });
globalThis.__stoneshedDbClient = client;

export const db = drizzle(client, { schema });
export { tables as schema };
export type Db = typeof db;
