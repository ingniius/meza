import { join, resolve } from "node:path";

import fse from "fs-extra";

/**
 * @private
 */
interface ListFoldersOptions {
  /**
   * @description Ignore folders starting with a period `.`
   */
  ignoreHidden?: boolean;
}

/**
 * @publicApi
 * @name listFolders
 * @param location
 * @param options
 */
export async function listFolders(location: string, options?: ListFoldersOptions): Promise<string[]> {
  const fullPath = resolve(location);
  const files = await fse.readdir(fullPath);

  const directories: string[] = [];

  for (const file of files) {
    if (options?.ignoreHidden && file.startsWith(".")) {
      continue;
    }

    const filePath = join(fullPath, file);

    const stats = await fse.stat(filePath);

    if (stats.isDirectory()) {
      directories.push(file);
    }
  }

  return directories;
}
