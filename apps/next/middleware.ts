import type { NextFetchEvent, NextRequest } from "next/server";

import { createNEMO } from "@rescale/nemo";

import { localeMiddleware } from "@azem/locale/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|ingest|favicon.ico).*)"],
  runtime: "nodejs",
};

const composedMiddleware = createNEMO({}, { before: [localeMiddleware] });

export function middleware(request: NextRequest, event: NextFetchEvent) {
  return composedMiddleware(request, event);
}
