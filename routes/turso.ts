import { Handlers } from "$fresh/server.ts";
import { JSON_HEADERS } from "../utils/axiod.ts";
import { db } from "../utils/turso.ts";

export const handler: Handlers = {
  async GET() {
    const { rows } = await db.execute("SELECT count FROM count LIMIT 1");
    return new Response(
      JSON.stringify({ count: Number(rows[0].count) }),
      JSON_HEADERS,
    );
  },

  async POST(req) {
    const data = await req.json();
    await db.execute(`UPDATE count SET count = ${+data.count} WHERE id=1`);
    return new Response("", { status: 201 });
  },
};
