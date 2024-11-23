import { describe, expect, it, vi } from "vitest";

import { randomInteger } from "@azem/testing/integer";

import { messageConstructor } from "./hit-rate-limit";

vi.useFakeTimers();
vi.setSystemTime("2023-05-31T14:45:00Z");

describe("#messageConstructor", () => {
  it("should construct message", () => {
    expect(
      messageConstructor({
        limit: randomInteger(5, 250),
        reset: new Date("2023-05-31T14:45:30Z"),
      }),
    ).toMatchInlineSnapshot('"Too many requests, retry after 30s."');
  });
});
