import { MongoClient } from "mongo";

const client = new MongoClient();

export async function connect() {
  await client.connect(Deno.env.get("MONGO_DB_URL")!);
  return client.database("test");
}
