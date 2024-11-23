import { afterEach, describe, expect, it, vi } from "vitest";

import { getNodeEnv } from "./env";

describe("#getNodeEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return a configured NODE_ENV", () => {
    vi.stubEnv("NODE_ENV", "testing");
    expect(getNodeEnv()).toBe("testing");
  });
});
