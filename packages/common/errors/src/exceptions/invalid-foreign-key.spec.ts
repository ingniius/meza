import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import type { InvalidForeignKeyErrorExtensions } from "./invalid-foreign-key";
import { messageConstructor } from "./invalid-foreign-key";

let sample: InvalidForeignKeyErrorExtensions;

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      collection: randomAlpha(randomInteger(2, 50)),
      field: randomAlpha(randomInteger(2, 50)),
    };
  });

  it("should construct the message using the provided field name and collection", () => {
    const result = messageConstructor(sample);
    expect(result).toBe(`Invalid foreign key for field "${sample.field}" in collection "${sample.collection}".`);
  });

  it("should construct the message using the provided field name only", () => {
    sample.collection = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Invalid foreign key for field "${sample.field}".`);
  });

  it("should construct the message using the provided field name only", () => {
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Invalid foreign key in collection "${sample.collection}".`);
  });

  it("should construct the message using without field/collection", () => {
    sample.collection = null;
    sample.field = null;

    const result = messageConstructor(sample);
    expect(result).toBe(`Invalid foreign key.`);
  });
});
