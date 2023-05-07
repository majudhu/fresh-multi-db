import { Handlers } from "$fresh/server.ts";
import { JSON_HEADERS } from "../utils/axiod.ts";
import { pool } from "../utils/neon.ts";

export const handler: Handlers = {
  async GET() {
    const connection = await pool.connect();
    const { rows } = await connection.queryObject<
      { count: number }
    >`SELECT count FROM count LIMIT 1`;
    connection.release();
    return new Response(
      JSON.stringify({ count: Number(rows[0].count) }),
      JSON_HEADERS,
    );
  },

  async POST(req) {
    const connection = await pool.connect();
    const data = await req.json();
    await connection
      .queryObject`UPDATE count SET count = ${data.count} WHERE id=1`;
    connection.release();
    return new Response("", { status: 201 });
  },
};
