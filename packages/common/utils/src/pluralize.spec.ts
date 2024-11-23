import { describe, expect, it } from "vitest";

import { depluralize, pluralize } from "./pluralize";

describe("#pluralize", () => {
  it("should add an s to the end of the string", () => {
    expect(pluralize("test")).toBe("tests");
  });
});

describe("#depluralize", () => {
  it("should remove an s to the end of the string", () => {
    expect(depluralize("tests")).toBe("test");
  });
});
