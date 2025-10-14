import { createEnv } from "@t3-oss/env-nextjs";

import { keys as auth } from "@azem/auth/keys";
import { keys as core } from "@azem/config/keys";
import { keys as db } from "@azem/db/keys";

export const env = createEnv({
  extends: [auth(), core(), db()],
  server: {},
  client: {},
  runtimeEnv: {},
});
