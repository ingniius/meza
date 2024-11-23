import { createRequire } from "node:module";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);

/**
 * @publicApi
 * @name resolvePackage
 * @param name
 * @param root
 */
export function resolvePackage(name: string, root?: string): string {
  return dirname(require.resolve(`${name}/package.json`, root !== undefined ? { paths: [root] } : undefined));
}
