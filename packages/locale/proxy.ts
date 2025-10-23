import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { createI18nMiddleware } from "next-international/middleware";

import { EXCLUDED_PATHS } from "@azem/config/lib/constants";

import languine from "./languine.json" with { type: "json" };

const locales = [languine.locale.source, ...languine.locale.targets];

export function localeProxy(request: NextRequest) {
  if (EXCLUDED_PATHS.some(prefix => request.nextUrl.pathname.startsWith(prefix)))
    return;

  return createI18nMiddleware({
    locales,
    defaultLocale: languine.locale.source,
    urlMappingStrategy: "rewriteDefault",
    resolveLocaleFromRequest: (request: NextRequest) => {
      const headers = Object.fromEntries(request.headers.entries());
      const negotiator = new Negotiator({ headers });
      const acceptedLanguages = negotiator.languages();
      return matchLocale(acceptedLanguages, locales, languine.locale.source);
    },
  })(request);
}
