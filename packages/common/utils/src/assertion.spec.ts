import { describe, expect, it } from "vitest";

import {
  isBoolean,
  isDefined,
  isEqual,
  isFunction,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "./assertion";

describe("#isBoolean", () => {
  it("should check if value is a boolean", () => {
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });
});

describe("#isDefined", () => {
  it("should check if value is not undefined and not null", () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
  });
});

describe("#isFunction", () => {
  it("should check if value is a function", () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(() => {})).toBe(true);
  });
});

describe("#isEqual", () => {
  it("tests if two values are deeply equal", () => {
    expect(isEqual(undefined, null)).toBe(false);
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ key: "value" }, { key: "value" })).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });
});

describe("#isNumber", () => {
  it("should check if value is a valid number", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber("")).toBe(false);
    expect(isNumber("1")).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
  });
});

describe("#isNull", () => {
  it("should check if value is null", () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull({})).toBe(false);
  });
});

describe("#isNil", () => {
  it("should check if value is null or undefined", () => {
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil({})).toBe(false);
  });
});

describe("#isObject", () => {
  it("should check if value is a plain object", () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
  });
});

describe("#isString", () => {
  it("should check if value is a non-empty string", () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString("")).toBe(false);
    expect(isString("1")).toBe(true);
  });
});

describe("#isUndefined", () => {
  it("should check if value is undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined({})).toBe(false);
  });
});
