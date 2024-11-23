import { describe, expect, it } from "vitest";

import { isIn, isTypeIn, moveInArray } from "./array";

describe("#moveInArray", () => {
  const testArray = [1, 2, 3, 4, 5, 6];

  it("should return the original array if the item is undefined", () => {
    expect(moveInArray(testArray, 6, 2)).toStrictEqual(testArray);
  });

  it("should move the item to the right to the specified index", () => {
    expect(moveInArray(testArray, 1, 2)).toStrictEqual([1, 3, 2, 4, 5, 6]);
  });

  it("should move the item to the left to the specified index", () => {
    expect(moveInArray(testArray, 5, -3)).toStrictEqual([1, 2, 3, 6, 4, 5]);
  });

  it("should return the original array when passed the same toIndex and fromIndex", () => {
    expect(moveInArray(testArray, 0, 0)).toStrictEqual(testArray);
  });
});

describe("#isIn", () => {
  const array = ["foo", "bar"] as const;

  it("should return true when string is inside array", () => {
    expect(isIn("foo", array)).toBe(true);
  });

  it("should return false when string is not inside array", () => {
    expect(isIn("baz", array)).toBe(false);
  });
});

describe("#isIn", () => {
  const array = ["foo", "bar"] as const;

  it("should return true when object type string is inside array", () => {
    expect(isTypeIn({ type: "bar" }, array)).toBe(true);
  });

  it("should return false when object type string is not inside array", () => {
    expect(isTypeIn({ type: "baz" }, array)).toBe(false);
  });

  it("should return false when object has no type", () => {
    expect(isTypeIn({}, array)).toBe(false);
  });
});
