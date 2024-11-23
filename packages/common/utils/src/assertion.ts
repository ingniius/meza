import type { UnknownObject } from "@azem/types/util";

/**
 * @publicApi
 * @name func
 * @param n
 */
export function func(n: unknown): n is (...args: any[]) => any {
  return typeof n === "function";
}

/**
 * @publicApi
 * @name is
 * @param n
 */
export function is<T>(n: T): n is Exclude<T, undefined | null> {
  return n !== undefined && n !== null;
}

/**
 * @publicApi
 * @name obj
 * @param n
 */
export function obj(n: unknown): n is UnknownObject {
  return typeof n === "object" && n !== null && !Array.isArray(n);
}

/**
 * @publicApi
 * @name str
 * @param n
 */
export function str(n: unknown): n is Exclude<string, ""> {
  return typeof n === "string" && n !== "";
}
