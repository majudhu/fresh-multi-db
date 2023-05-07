import { Pool } from "pg";

export const pool = new Pool(Deno.env.get("ROACH_DB_URL")!, 1, true);
