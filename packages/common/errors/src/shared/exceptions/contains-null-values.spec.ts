import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import { messageConstructor } from "./contains-null-values";

let sample: {
  collection: string;
  field: string;
};

describe("#messageConstructor", () => {
  beforeEach(() => {
    sample = {
      collection: randomAlpha(randomInteger(2, 50)),
      field: randomAlpha(randomInteger(2, 50)),
    };
  });

  it("should construct the message using the provided field name", () => {
    const result = messageConstructor(sample);
    expect(result).toBe(`Field "${sample.field}" in collection "${sample.collection}" contains null values.`);
  });
});
