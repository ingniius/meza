import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import type { RecordNotUniqueErrorExtensions } from "./record-not-unique";
import { messageConstructor } from "./record-not-unique";

let sample: RecordNotUniqueErrorExtensions;

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      collection: randomAlpha(randomInteger(2, 50)),
      field: randomAlpha(randomInteger(2, 50)),
    };
  });

  it("should construct the message using the provided field name and collection", () => {
    const result = messageConstructor(sample);
    expect(result).toBe(`Value for field "${sample.field}" in collection "${sample.collection}" has to be unique.`);
  });

  it("should construct the message using the provided field name only", () => {
    sample.collection = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Value for field "${sample.field}" has to be unique.`);
  });

  it("should construct the message using the provided field name only", () => {
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Value in collection "${sample.collection}" has to be unique.`);
  });

  it("should construct the message using without field/collection", () => {
    sample.collection = null;
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Value has to be unique.`);
  });
});
