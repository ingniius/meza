import { randomAlpha } from "./alpha";
import { randomInteger } from "./integer";

/**
 * @publicApi
 * @name randomIdentifier
 * @description A wrapper to generate a random identifier.
 */
export const randomIdentifier = () => {
  return randomAlpha(randomInteger(3, 25));
};
