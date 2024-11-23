import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name generateHash
 * @description Generate a hash for a given string.
 * @param string String to hash
 */
export const generateHash =
  <Schema>(string: string): RestCommand<string, Schema> =>
  () => ({
    method: "POST",
    path: `/utils/hash/generate`,
    body: JSON.stringify({ string }),
  });

/**
 * @publicApi
 * @name verifyHash
 * @description Verify a string with a hash.
 * @param string Source string
 * @param hash Hash you want to verify against
 */
export const verifyHash =
  <Schema>(string: string, hash: string): RestCommand<boolean, Schema> =>
  () => ({
    method: "POST",
    path: `/utils/hash/verify`,
    body: JSON.stringify({ string, hash }),
  });
