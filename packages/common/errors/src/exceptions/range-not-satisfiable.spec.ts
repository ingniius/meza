import { describe, expect, it } from "vitest";

import { randomInteger } from "@azem/testing/integer";
import type { Range } from "@azem/types/storage";

import { messageConstructor } from "./range-not-satisfiable";

let range: Range;

describe("#messageConstructor", () => {
  it("should construct message with given range", () => {
    range = {
      start: randomInteger(0, 2500),
      end: randomInteger(2501, 5000),
    };

    expect(messageConstructor({ range })).toBe(
      `Range "${range.start}-${range.end}" is invalid or the file's size doesn't match the requested range.`,
    );
  });
});
