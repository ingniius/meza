import { obj } from "@azem/utils/assertion";

import type { ExtensionsMap, MezaError } from "./types";

/**
 * @publicApi
 * @name isMezaError
 * @description Check whether or not a passed value is a valid Meza error.
 * @param value - Any value
 * @param code - Error code to check for
 */
export const isMezaError = <T = never, C extends string = string>(
  value: unknown,
  code?: C,
): value is MezaError<[T] extends [never] ? (C extends keyof ExtensionsMap ? ExtensionsMap[C] : unknown) : T> => {
  const isMezaError =
    obj(value) && value !== null && Array.isArray(value) === false && "name" in value && value.name === "MezaError";
  if (code) return isMezaError && "code" in value && value.code === code.toUpperCase();
  return isMezaError;
};
