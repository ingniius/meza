import { randomSequence } from "./sequence";

/**
 * @internal
 */
export const CHARACTERS_ALPHA = "abcdefghijklmnopqrstuvwxyz";

/**
 * @publicApi
 * @name randomAlpha
 * @description Return random string of alphabetic characters.
 * @param length - Length of the string to generate
 */
export const randomAlpha = (length: number) => {
  return randomSequence(length, CHARACTERS_ALPHA);
};
