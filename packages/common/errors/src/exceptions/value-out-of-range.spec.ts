import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import type { ValueOutOfRangeErrorExtensions } from "./value-out-of-range";
import { messageConstructor } from "./value-out-of-range";

let sample: ValueOutOfRangeErrorExtensions;

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      collection: randomAlpha(randomInteger(2, 50)),
      field: randomAlpha(randomInteger(2, 50)),
    };
  });

  it("should construct the message using the provided field name and collection", () => {
    const result = messageConstructor(sample);

    expect(result).toBe(
      `Numeric value for field "${sample.field}" in collection "${sample.collection}" is out of range.`,
    );
  });

  it("should construct the message using the provided field name only", () => {
    sample.collection = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Numeric value for field "${sample.field}" is out of range.`);
  });

  it("should construct the message using the provided field name only", () => {
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Numeric value in collection "${sample.collection}" is out of range.`);
  });

  it("should construct the message using without field/collection", () => {
    sample.collection = null;
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Numeric value is out of range.`);
  });
});
