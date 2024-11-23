import { expect, it } from "vitest";

import { get } from "./get-with-array";

it("should return static value", () => {
  const input = { test: { path: "example" } };
  expect(get(input, "test.path")).toBe("example");
});

it("should return static array", () => {
  const input = { test: [] };
  expect(get(input, "test")).toEqual([]);
});

it("should return default value if path inside object does not exist", () => {
  const input = { test: { path: "example" } };
  expect(get(input, "test.wrong", "default value")).toBe("default value");
});

it("should return default value if path inside array does not exist", () => {
  const input = { test: [{ path: "example" }] };
  expect(get(input, "test.wrong", "default value")).toEqual("default value");
});

it("should return values in array path as flattened array", () => {
  const input = { test: [{ path: "example" }, { path: "another" }] };
  expect(get(input, "test.path")).toEqual(["example", "another"]);
});

it("should return values in array path as flattened array", () => {
  const input = { test: [{ path: "example" }, { falsePath: "another" }] };
  expect(get(input, "test:collection.path")).toEqual(["example"]);
});

it("should return values in multi-array path as flattened array", () => {
  const input = { test: [{ path: [{ test: "example" }, { falsePath: "another" }] }, { falsePath: "falseAnother" }] };
  expect(get(input, "test.path.test")).toEqual(["example"]);
});

it("should return values spread across multiple places in multi-array path as flattened array", () => {
  const input = { test: [{ path: [{ test: "example" }, { test: "example2" }] }, { path: [{ test: "another" }] }] };
  expect(get(input, "test.path.test")).toEqual(["example", "example2", "another"]);
});
