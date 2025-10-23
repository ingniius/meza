import type { NextFetchEvent, NextRequest } from "next/server";

import { ADMIN_HOSTNAMES, API_HOSTNAMES, APP_HOSTNAMES, WEB_HOSTNAMES } from "@azem/config/lib/constants";
import { parse } from "@azem/config/lib/utils";
import { adminProxy, apiProxy, appProxy, defaultProxy, webProxy } from "@azem/config/proxy";
import { localeProxy } from "@azem/locale/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function proxy(req: NextRequest, ev: NextFetchEvent) {
  const { domain } = parse(req);

  if (ADMIN_HOSTNAMES.has(domain))
    return adminProxy(req, ev);

  if (API_HOSTNAMES.has(domain))
    return apiProxy(req, ev);

  if (APP_HOSTNAMES.has(domain))
    return appProxy(req, ev);

  if (WEB_HOSTNAMES.has(domain))
    return webProxy(req, ev, { before: [localeProxy] });

  return defaultProxy(req, ev);
}
