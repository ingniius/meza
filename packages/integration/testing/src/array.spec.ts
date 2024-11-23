import { beforeEach, describe, expect, it } from "vitest";

import { randomAlpha } from "./alpha";
import { randomArray } from "./array";
import { randomInteger } from "./integer";

let sample: {
  input: string[];
};

describe("#randomArray", () => {
  beforeEach(() => {
    const length = randomInteger(1, 25);
    sample = { input: Array.from(Array(length)).map(() => randomAlpha(randomInteger(1, 10))) };
  });

  it("should return a random item from the given array", () => {
    const item = randomArray(sample.input);
    expect(sample.input.includes(item)).toBe(true);
  });
});
