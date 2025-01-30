export { isBoolean, isEqual, isFunction, isNull, isNil, isUndefined } from "es-toolkit";

export const isDefined = <T>(n: T): n is Exclude<T, undefined | null> => n !== undefined && n !== null;

export const isNumber = (n: unknown): n is number => typeof n === "number" && !Number.isNaN(n);

export const isObject = (n: unknown): n is Record<string | number | symbol, unknown> =>
  typeof n === "object" && n !== null && !Array.isArray(n);

export const isString = (n: unknown): n is Exclude<string, ""> => typeof n === "string" && n !== "";
