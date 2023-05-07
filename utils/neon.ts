import { Pool } from "pg";

export const pool = new Pool(Deno.env.get("NEON_DB_URL")!, 1, true);
