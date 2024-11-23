import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import type { InvalidQueryErrorExtensions } from "./invalid-query";
import { messageConstructor } from "./invalid-query";

let sample: InvalidQueryErrorExtensions;

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      reason: randomAlpha(randomInteger(2, 500)),
    };
  });

  it("should construct message", () => {
    expect(messageConstructor(sample)).toBe(`Invalid query. ${sample.reason}.`);
  });
});
