import { beforeEach, describe, expect, it } from "vitest";

import { randomArray } from "./array";
import { randomInteger } from "./integer";
import { randomSequence } from "./sequence";

let sample: {
  length: number;
  characters: string;
};

describe("#randomSequence", () => {
  beforeEach(() => {
    sample = {
      length: randomInteger(0, 15),
      characters: randomArray(["abcdefg", "hijklmnop", "qrstuvwxyz", "0123456789"]),
    };
  });

  it("should return a random sequence of given length", () => {
    const output = randomSequence(sample.length, sample.characters);
    expect(output.length).toBe(sample.length);
  });

  it("should only return a characters from given set", () => {
    const output = randomSequence(sample.length, sample.characters);
    output.split("").every((char) => expect(sample.characters.includes(char)).toBe(true));
  });
});
