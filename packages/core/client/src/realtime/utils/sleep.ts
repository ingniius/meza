/**
 * @publicApi
 * @name sleep
 * @description Wait for a certain amount of ms.
 * @param delay number in MS
 */
export const sleep = (delay: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
