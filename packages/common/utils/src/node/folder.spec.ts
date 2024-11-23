import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { sep } from "node:path";

import type { DirResult } from "tmp";
import { dirSync } from "tmp";

import { listFolders } from "./folder";

describe("#listFolders", () => {
  let rootDir: DirResult;
  let childDir: DirResult;

  beforeEach(() => {
    rootDir = dirSync({ unsafeCleanup: true, tmpdir: "./" });
    childDir = dirSync({ tmpdir: rootDir.name });
  });

  afterEach(() => {
    rootDir.removeCallback();
  });

  it("should return all the subdirectories of the current directory", async () => {
    const childPath = childDir.name.split(sep);
    expect(await listFolders(rootDir.name)).toStrictEqual([childPath[childPath?.length - 1]]);
  });
});
