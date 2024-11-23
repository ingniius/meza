import { describe, expect, it } from "vitest";

import { join, resolve } from "node:path";
import { dirname } from "node:path/posix";
import { fileURLToPath } from "node:url";

import { pathToRelativeUrl } from "./url";

describe("#pathToRelativeUrl", () => {
  const filePath = resolve(join("foo", "bar.txt"));

  it("should return a URL relative to the current working directory", async () => {
    const relativeUrl = pathToRelativeUrl(filePath);
    expect(relativeUrl).toBe("foo/bar.txt");
  });

  it("should return a URL relative to the given path if it is passed as the second argument", async () => {
    const relativeUrl = pathToRelativeUrl(filePath, dirname(fileURLToPath(import.meta.url)));
    expect(relativeUrl).toBe("../foo/bar.txt");
  });
});
