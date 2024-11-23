import type { Dict, JsonValue } from "@azem/types/util";
import { parseJSON } from "@azem/utils/json";

import type { ResolveFn, Scope } from "micromustache";
import { get, renderFn } from "micromustache";

/**
 * @private
 */
type Mustache<T> = T extends string
  ? JsonValue
  : T extends Array<infer U>
    ? Array<Mustache<U>>
    : T extends Record<any, any>
      ? { [K in keyof T]: Mustache<T[K]> }
      : T;

/**
 * @publicApi
 * @name applyOptionsData
 * @param options
 * @param data
 * @param skipUndefinedKeys
 */
export function applyOptionsData(options: Dict, data: Dict, skipUndefinedKeys: string[] = []): Dict {
  return Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, renderMustache(value, data, skipUndefinedKeys.includes(key))]),
  );
}

/**
 * @private
 */
function resolveFn(skipUndefined: boolean): (path: string, scope: Scope) => any {
  return (path, scope) => {
    const value = get(scope, path);

    if (value !== undefined || !skipUndefined) {
      return typeof value === "object" ? JSON.stringify(value) : value;
    } else {
      return `{{ ${path} }}`;
    }
  };
}

/**
 * @private
 */
function renderMustache<T extends JsonValue>(item: T, scope: Scope, skipUndefined: boolean): Mustache<T> {
  if (typeof item === "string") {
    const raw = item.match(/^\{\{\s*([^}\s]+)\s*\}\}$/);

    if (raw !== null) {
      const value = get(scope, raw[1]!);
      if (value !== undefined) return value;
    }

    return renderFn(item, resolveFn(skipUndefined) as ResolveFn, scope, { explicit: true }) as Mustache<T>;
  } else if (Array.isArray(item)) {
    return item.map((element) => renderMustache(element, scope, skipUndefined)) as Mustache<T>;
  } else if (typeof item === "object" && item !== null) {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [key, renderMustache(value, scope, skipUndefined)]),
    ) as Mustache<T>;
  } else {
    return item as Mustache<T>;
  }
}

/**
 * @publicApi
 * @name optionToString
 * @param option
 */
export function optionToObject<T>(option: T): Exclude<T, string> {
  return typeof option === "string" ? parseJSON(option) : option;
}

/**
 * @publicApi
 * @name optionToString
 * @param option
 */
export function optionToString(option: unknown): string {
  return typeof option === "object" ? JSON.stringify(option) : String(option);
}
