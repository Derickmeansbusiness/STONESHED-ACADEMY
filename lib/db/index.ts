import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import * as tables from "./schema";
import * as rels from "./relations";

const schema = { ...tables, ...rels };
const url = process.env.DATABASE_URL ?? "file:./data/academy.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

declare global {
  // eslint-disable-next-line no-var
  var __stoneshedDbClient: Client | undefined;
}

const client = globalThis.__stoneshedDbClient ?? createClient({ url, authToken });
if (process.env.NODE_ENV !== "production") globalThis.__stoneshedDbClient = client;

export const db = drizzle(client, { schema });
export { tables as schema };
export type Db = typeof db;
