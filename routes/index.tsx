import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { pool as roachPool } from "../utils/roach.ts";
import { db as tursoDb } from "../utils/turso.ts";
import { pool as neonPool } from "../utils/neon.ts";
import { connect as mongoConnect } from "../utils/mongo.ts";

interface Data {
  roach: number;
  turso: number;
  neon: number;
  mongo: number;
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const [roach, turso, neon, mongo] = await Promise.all([
      getRoachCount(),
      getTursoCount(),
      getNeonCount(),
      getMongoCount(),
    ]);
    return ctx.render({ roach, turso, neon, mongo });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md space-y-4">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />

        <Counter
          src="roach"
          count={data.roach}
          name="CockroachDB"
          href="https://www.cockroachlabs.com"
        />
        <Counter
          src="turso"
          count={data.turso}
          name="Turso"
          href="https://turso.tech"
        />
        <Counter
          src="neon"
          count={data.neon}
          name="Neon"
          href="https://neon.tech"
        />
        <Counter
          src="mongo"
          count={data.mongo}
          name="MongoDb Atlas"
          href="https://www.mongodb.com"
        />

        <a
          class="block text-center mx-auto"
          href="https://github.com/majudhu/fresh-multi-db"
          target="_blank"
        >
          View on GitHub
        </a>
      </div>
    </>
  );
}

async function getRoachCount() {
  const connection = await roachPool.connect();
  //   await connection.queryObject`
  //   CREATE TABLE IF NOT EXISTS count (
  //     id SERIAL PRIMARY KEY,
  //     count INTEGER DEFAULT 0 NOT NULL
  //   );
  //   INSERT INTO count(id, count) values (1, 0) ON CONFLICT (id) DO NOTHING;
  // `;
  const { rows } = await connection.queryObject<
    { count: number }
  >`SELECT id,count FROM count LIMIT 1`;
  connection.release();
  return Number(rows[0].count);
}

async function getTursoCount() {
  // await db.execute(
  //   "CREATE TABLE IF NOT EXISTS count (id INTEGER PRIMARY KEY, count INTEGER DEFAULT 0 NOT NULL)",
  // );
  // await db.execute(
  //   "INSERT INTO count(id,count) values (1,0) ON CONFLICT(id) DO NOTHING",
  // );
  const { rows } = await tursoDb.execute("SELECT id,count FROM count LIMIT 1");
  return rows[0].count as number;
}

async function getNeonCount() {
  const connection = await neonPool.connect();
  //   await connection.queryObject`
  //   CREATE TABLE IF NOT EXISTS count (
  //     id SERIAL PRIMARY KEY,
  //     count INTEGER DEFAULT 0 NOT NULL
  //   );
  //   INSERT INTO count(id, count) values (1, 0) ON CONFLICT (id) DO NOTHING;
  // `;
  const { rows } = await connection.queryObject<
    { count: number }
  >`SELECT id,count FROM count LIMIT 1`;
  connection.release();
  return Number(rows[0].count);
}

async function getMongoCount() {
  const db = await mongoConnect();
  const { count } = await db.collection("count").findOne({});
  return count as number;
}
