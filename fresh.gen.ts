// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/index.tsx";
import * as $1 from "./routes/neon.ts";
import * as $2 from "./routes/roach.ts";
import * as $3 from "./routes/turso.ts";
import * as $$0 from "./islands/Counter.tsx";

const manifest = {
  routes: {
    "./routes/index.tsx": $0,
    "./routes/neon.ts": $1,
    "./routes/roach.ts": $2,
    "./routes/turso.ts": $3,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
