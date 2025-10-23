import type { NextFetchEvent, NextRequest } from "next/server";

import { createNEMO } from "@rescale/nemo";
import { isFunction } from "es-toolkit";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, PREFIX } from "./lib/constants";
import { parse } from "./lib/utils";

type NextProxyResult = NextResponse | Response | null | undefined | void;
type NextProxyHandler = (req: NextRequest) => NextProxyResult | Promise<NextProxyResult>;

interface ProxyOptions {
  before?: NextProxyHandler[];
}

function createProxy(prefixOrHandler: string | NextProxyHandler, opts?: ProxyOptions) {
  return (request: NextRequest, event: NextFetchEvent) => {
    const { fullPath } = parse(request);

    const builtInBefore: NextProxyHandler
      = isFunction(prefixOrHandler)
        ? prefixOrHandler
        : async (req) => {
          req.nextUrl.pathname = `/${prefixOrHandler}${fullPath}`;
          return NextResponse.rewrite(req.nextUrl);
        };

    const mergedBefore: NextProxyHandler[] = [
      builtInBefore,
      ...(Array.isArray(opts?.before) ? opts.before : []),
    ];

    return createNEMO({}, { before: mergedBefore })(request, event);
  };
}

export function adminProxy(req: NextRequest, ev: NextFetchEvent, opts?: ProxyOptions) {
  return createProxy(PREFIX.ADMIN, opts)(req, ev);
}

export function apiProxy(req: NextRequest, ev: NextFetchEvent, opts?: ProxyOptions) {
  return createProxy(PREFIX.API, opts)(req, ev);
}

export function appProxy(req: NextRequest, ev: NextFetchEvent, opts?: ProxyOptions) {
  return createProxy(PREFIX.DASHBOARD, opts)(req, ev);
}

export function webProxy(req: NextRequest, ev: NextFetchEvent, opts?: ProxyOptions) {
  return createProxy(async (req) => {
    const { fullPath, path } = parse(req);

    if (path.startsWith(`/${PREFIX.ADMIN}`) || path.startsWith(`/${PREFIX.DASHBOARD}`))
      return NextResponse.rewrite(req.nextUrl);

    req.nextUrl.pathname = path === "/" ? `/${PREFIX.WEB}/${DEFAULT_LOCALE}` : `/${PREFIX.WEB}${fullPath}`;
    return NextResponse.rewrite(req.nextUrl);
  }, opts)(req, ev);
}

export function defaultProxy(req: NextRequest, ev: NextFetchEvent, opts?: ProxyOptions) {
  return createProxy(async (req) => {
    const { domain, fullPath } = parse(req);

    req.nextUrl.pathname = `/${domain}${fullPath}`;
    return NextResponse.rewrite(req.nextUrl);
  }, opts)(req, ev);
}
