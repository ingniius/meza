import { posix, relative, sep } from "node:path";

/**
 * @publicApi
 * @name pathToRelativeUrl
 * @param filePath
 * @param root
 */
export function pathToRelativeUrl(filePath: string, root = ".") {
  return relative(root, filePath).split(sep).join(posix.sep);
}
