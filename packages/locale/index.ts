import "server-only";

import { DEFAULT_LOCALE } from "@azem/config/lib/constants";

import type en from "./dictionaries/en.json";

import languine from "./languine.json" with { type: "json" };

export const locales = [languine.locale.source, ...languine.locale.targets] as const;

export type Dictionary = typeof en;

const dictionaries: Record<string, () => Promise<Dictionary>>
  = Object.fromEntries(
    locales.map(locale => [
      locale,
      () =>
        import(`./dictionaries/${locale}.json`)
          .then(mod => mod.default)
          .catch(_err =>
            import(`./dictionaries/${DEFAULT_LOCALE}.json`).then(mod => mod.default),
          ),
    ]),
  );

export async function getDictionary(locale: string): Promise<Dictionary> {
  const normalizedLocale = locale.split("-")[0];

  if (!locales.includes(normalizedLocale as any))
    return dictionaries.en();

  try {
    return await dictionaries[normalizedLocale]();
  // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_e) {
    return dictionaries.en();
  }
}

export function $t(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => vars[key.trim()] ?? "");
}
