import { Handlers } from "$fresh/server.ts";
import { JSON_HEADERS } from "../utils/axiod.ts";
import { connect } from "../utils/mongo.ts";

export const handler: Handlers = {
  async GET() {
    const db = await connect();
    const { count } = await db.collection("count").findOne({});
    return new Response(
      JSON.stringify({ count }),
      JSON_HEADERS,
    );
  },

  async POST(req) {
    const db = await connect();
    const data = await req.json();
    await db.collection("count").updateOne({}, {
      "$set": { count: +data.count },
    });
    return new Response("", { status: 201 });
  },
};
