/**
 * @publicApi
 * @name throwIfEmpty
 * @description Throws an error if an empty array or string is provided.
 * @param value
 * @param message
 */
export function throwIfEmpty(value: string | unknown[], message: string) {
  if (value.length === 0) {
    throw new Error(message);
  }
}
