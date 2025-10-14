import type { NextRequest } from "next/server";

import { auth } from "@azem/auth/server";

async function handler(req: NextRequest) {
  return auth.handler(req);
}

export { handler as GET, handler as POST };
