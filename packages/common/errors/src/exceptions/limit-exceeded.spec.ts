import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import type { LimitExceededErrorExtensions } from "./limit-exceeded";
import { messageConstructor } from "./limit-exceeded";

let sample: LimitExceededErrorExtensions;

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      category: randomAlpha(randomInteger(2, 500)),
    };
  });

  it("should construct message", () => {
    expect(messageConstructor(sample)).toBe(`${sample.category} limit exceeded.`);
  });
});
