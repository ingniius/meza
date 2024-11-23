import type { Dict } from "@azem/types/generic";

import { is, str } from "./assertion";

/**
 * @publicApi
 * @name get
 * @param object
 * @param path
 * @param defaultValue
 */
export function get(
  object: Record<string, any> | undefined,
  path: (string | number)[] | string,
  defaultValue?: any,
): any {
  if (str(path)) {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }

  let result: any = object;

  for (const key of path) {
    if (is(result)) return defaultValue;
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * @publicApi
 * @name omit
 * @param data
 * @param keys
 */
export function omit<Data extends Dict, Keys extends keyof Data>(data: Data, keys: Keys[]): Omit<Data, Keys> {
  const result = { ...data };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<Data, Keys>;
}

/**
 * @publicApi
 * @name pick
 * @param data
 * @param keys
 */
export function pick<Data extends Dict, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>;

  for (const key of keys) {
    result[key] = data[key];
  }

  return result;
}

/**
 * @publicApi
 * @name set
 * @param object
 * @param path
 * @param value
 */
export function set(object: Dict<string, any>, path: (string | number)[] | string, value: any): void {
  if (str(path)) {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }

  path.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === path.length - 1) acc[key] = value;
    return acc[key];
  }, object);
}
