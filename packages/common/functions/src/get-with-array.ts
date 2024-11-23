import type { Dict } from "@azem/types/util";

/**
 * @publicApi
 * @name get
 * @description Basically the same as `get` from `lodash`, but will convert nested array values to arrays, so for example:
 * @example
 * ```js
 * const obj = { value: [{ example: 1 }, { example: 2 }]}
 * get(obj, 'value.example');
 * // => [1, 2]
 * ```
 * @param object
 * @param path
 * @param defaultValue
 */
export function get(object: Dict<string, any> | any[], path: string, defaultValue?: unknown): any {
  let key = path.split(".")[0]!;
  const follow = path.split(".").slice(1);

  if (key.includes(":")) key = key.split(":")[0]!;
  const result = Array.isArray(object) ? getArrayResult(object, key) : object?.[key];

  if (result !== undefined && follow.length > 0) return get(result, follow.join("."), defaultValue);
  return result ?? defaultValue;
}

/**
 * @private
 * @param object
 * @param key
 */
function getArrayResult(object: unknown[], key: string): unknown[] | undefined {
  const result = object.map((entry) => entry?.[key as keyof unknown]).filter((entry) => entry);
  return result.length > 0 ? result.flat() : undefined;
}
