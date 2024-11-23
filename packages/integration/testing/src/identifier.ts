import { randomAlpha } from "./alpha";
import { randomInteger } from "./integer";

/**
 * @publicApi
 * @name randomIdentifier
 * @description A wrapper to generate a random identifier.
 * @returns A random identifier with 3 to 25 characters.
 */
export const randomIdentifier = () => {
  return randomAlpha(randomInteger(3, 25));
};
