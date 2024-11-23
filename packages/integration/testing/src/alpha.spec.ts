import { beforeEach, describe, expect, it, vi } from "vitest";

import { CHARACTERS_ALPHA, randomAlpha } from "./alpha";
import { randomInteger } from "./integer";
import { randomSequence } from "./sequence";

vi.mock("./sequence");

let sample: {
  length: number;
};

describe("#randomAlpha", () => {
  beforeEach(() => {
    sample = {
      length: randomInteger(1, 25),
    };
  });

  it("should return a output of randomSequence with given length", () => {
    randomAlpha(sample.length);
    expect(randomSequence).toHaveBeenCalledWith(sample.length, CHARACTERS_ALPHA);
  });
});
