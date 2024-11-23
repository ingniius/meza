import { describe, expect, it } from "vitest";

import { toArray, toBoolean } from "./transform";

describe("toArray", () => {
  it("should take a string and returns an array", () => {
    expect(toArray("1,2,3,4,5")).toStrictEqual(["1", "2", "3", "4", "5"]);
  });

  it("should pass an array returns the array", () => {
    expect(toArray(["1", "2", "3", "4", "5"])).toStrictEqual(["1", "2", "3", "4", "5"]);
  });
});

describe("#toBoolean", () => {
  it.each([
    ["true", true],
    [true, true],
    ["1", true],
    [1, true],
    ["false", false],
    ["anything", false],
    [123, false],
    [{}, false],
    [["{}"], false],
    [true, true],
    [false, false],
  ])("toBoolean(%s) -> %s", (value, expected) => {
    expect(toBoolean(value)).toBe(expected);
  });
});
