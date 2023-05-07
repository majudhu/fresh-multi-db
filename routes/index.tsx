import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { pool } from "../utils/roach.ts";

interface Data {
  roach: number;
}

async function getRoachCount() {
  const connection = await pool.connect();
  //   await connection.queryObject`
  //   CREATE TABLE IF NOT EXISTS count (
  //     id SERIAL PRIMARY KEY,
  //     count INTEGER DEFAULT 0 NOT NULL
  //   );
  //   INSERT INTO count(id,count) values (1,0);
  // `;
  const { rows } = await connection.queryObject<
    { count: number }
  >`SELECT id,count FROM count LIMIT 1`;
  connection.release();
  return Number(rows[0].count);
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const [roach] = await Promise.all([getRoachCount()]);
    return ctx.render({ roach });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />

        <Counter src="roach" count={data.roach} />
      </div>
    </>
  );
}
