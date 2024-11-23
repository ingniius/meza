import { describe, expect, it } from "vitest";

import { getFieldsFromTemplate } from "./get-fields-from-template";

describe("#getFieldsFromTemplate", () => {
  it("should return an empty array when no value passed", () => {
    expect(getFieldsFromTemplate("")).toStrictEqual([]);
    expect(getFieldsFromTemplate(undefined)).toStrictEqual([]);
    expect(getFieldsFromTemplate(null)).toStrictEqual([]);
  });

  it("should return fields as an array of strings", () => {
    expect(getFieldsFromTemplate("{{ field }}")).toStrictEqual(["field"]);
  });
});
