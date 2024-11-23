import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomIdentifier } from "@azem/testing/identifier";
import { randomInteger } from "@azem/testing/integer";

import { createError } from "./create-error";
import { isMezaError } from "./is-error";

let sample: {
  code: string;
  status: number;
  message: string;
};

describe("#isMezaError", () => {
  beforeEach(() => {
    sample = {
      code: randomAlpha(randomInteger(5, 25)),
      status: randomInteger(200, 599),
      message: randomAlpha(randomInteger(10, 50)),
    };
  });

  it("should report false for non Meza-errors", () => {
    const negative = [
      false,
      () => {
        /* empty */
      },
      [],
      new Error(),
      0,
      null,
      undefined,
      new Set(),
    ];

    for (const input of negative) {
      expect(isMezaError(input)).toBe(false);
    }
  });

  it("should report true for Meza error", () => {
    const SampleError = createError(sample.code, sample.message, sample.status);
    const error = new SampleError();
    expect(isMezaError(error)).toBe(true);
  });

  it("should check against optional error code", () => {
    const SampleError = createError(sample.code, sample.message, sample.status);
    const error = new SampleError();
    expect(isMezaError(error, sample.code)).toBe(true);
    expect(isMezaError(error, randomIdentifier())).toBe(false);
  });
});
