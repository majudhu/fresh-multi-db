import { Pool } from "pg";

const DB_URL = Deno.env.get("ROACH_DB_URL") ??
  "postgresql://majudhuahmed@localhost/postgres";

export const pool = new Pool(DB_URL, 1, true);
