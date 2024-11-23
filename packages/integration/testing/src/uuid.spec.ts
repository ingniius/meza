import { describe, expect, it } from "vitest";

import { randomUUID } from "./uuid";

describe("#randomUUID", () => {
  it("should return a random string", () => {
    expect(randomUUID()).toBeTypeOf("string");
  });

  it("should return a string in UUID format", () => {
    const uuid = randomUUID();
    const regex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(regex.test(uuid)).toBe(true);
  });
});
