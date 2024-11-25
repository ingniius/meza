import { describe, expect, it } from "vitest";

import { randomInteger } from "./integer";

describe("#randomInteger", () => {
  it("should return a random number in range", () => {
    const testInts = Array.from(Array(2)).map(() => Math.floor(Math.random() * 1000));
    const min = Math.min(...testInts);
    const max = Math.max(...testInts);
    const output = randomInteger(min, max);
    expect(output).toBeGreaterThanOrEqual(min);
    expect(output).toBeLessThanOrEqual(max);
  });
});
