import { createClient } from "libsql";

export const db = createClient({
  url: Deno.env.get("TURSO_DB_URL")!,
  authToken: Deno.env.get("TURSO_DB_TOKEN")!,
});
