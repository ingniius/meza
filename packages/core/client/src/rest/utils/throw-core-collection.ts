import { isSystemCollection } from "./is-system-collection.js";

/**
 * @publicApi
 * @name throwIfCoreCollection
 * @description Throws an error if the collection starts with the `meza_` prefix.
 * @param value
 * @param message
 */
export function throwIfCoreCollection(value: string | number | symbol, message: string) {
  if (isSystemCollection(String(value))) {
    throw new Error(message);
  }
}
