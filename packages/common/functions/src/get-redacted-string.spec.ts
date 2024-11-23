import { describe, expect, it } from "vitest";

import { getRedactedString } from "./get-redacted-string";

describe("#getRedactedString", () => {
  it("should redact without a key", () => {
    expect(getRedactedString()).toBe("--redacted--");
  });

  it("should redact with a key", () => {
    expect(getRedactedString("A_KEY")).toBe("--redacted:A_KEY--");
  });
});
