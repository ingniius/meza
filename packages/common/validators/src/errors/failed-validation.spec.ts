import { describe, expect, it } from "vitest";

import type { FilterOperator } from "@azem/types/filter";

import { messageConstructor } from "./failed-validation";

/** Can't be randomized, as we're using snapshot tests */
const field = "test_field";

describe("#messageConstructor", () => {
  describe("No value", () => {
    const types: (FilterOperator | "required" | "regex")[] = ["null", "nnull", "empty", "nempty", "required", "regex"];

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type });
      expect(message).toMatchSnapshot();
    });
  });

  describe("Valid value (primitive)", () => {
    const types: FilterOperator[] = ["eq", "lt", "lte", "gt", "gte"];
    /** Can't be randomized, as we're using snapshot tests */
    const valid = 15;

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type, valid });
      expect(message).toMatchSnapshot();
    });
  });

  describe("Valid value (list)", () => {
    const types: FilterOperator[] = ["in"];
    /** Can't be randomized, as we're using snapshot tests */
    const valid = ["valA", "valB", "valC"];

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type, valid });
      expect(message).toMatchSnapshot();
    });
  });

  describe("Invalid value (primitive)", () => {
    const types: FilterOperator[] = ["neq"];
    /** Can't be randomized, as we're using snapshot tests */
    const invalid = 15;

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type, invalid });
      expect(message).toMatchSnapshot();
    });
  });

  describe("Invalid value (list)", () => {
    const types: FilterOperator[] = ["nin"];
    /** Can't be randomized, as we're using snapshot tests */
    const invalid = ["valA", "valB", "valC"];

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type, invalid });
      expect(message).toMatchSnapshot();
    });
  });

  describe("Substring", () => {
    const types: FilterOperator[] = ["contains", "icontains", "ncontains"];
    /** Can't be randomized, as we're using snapshot tests */
    const substring = "test_substring";

    it.each(types)('should construct message for "%s"', (type) => {
      const message = messageConstructor({ field, type, substring });
      expect(message).toMatchSnapshot();
    });
  });
});
