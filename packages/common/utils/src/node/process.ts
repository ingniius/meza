import { createHash } from "node:crypto";
import { hostname } from "node:os";

/**
 * @internal
 */
export const _cache: { id: string | undefined } = { id: undefined };

/**
 * @publicApi
 * @name processId
 * @description Return a unique hash for the current process on the current machine. Will be different after a restart.
 */
export function processId() {
  if (_cache.id) return _cache.id;

  const parts = [hostname(), process.pid, new Date().getTime()];
  const hash = createHash("md5").update(parts.join(""));

  _cache.id = hash.digest("hex");

  return _cache.id;
}
