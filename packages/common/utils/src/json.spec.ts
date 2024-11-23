import { describe, expect, it } from "vitest";

import { isValidJSON, noproto, parseJSON } from "./json";

describe("#isValidJSON", () => {
  it("should return true if JSON is valid", () => {
    const result = isValidJSON(`{"name": "Meza"}`);
    expect(result).toEqual(true);
  });

  it("should return false if JSON is invalid", () => {
    const result = isValidJSON(`{"name: Meza"}`);
    expect(result).toEqual(false);
  });
});

describe("noproto", () => {
  it("should return the value if the key is not __proto__", () => {
    let result = noproto("anything", "value");
    expect(result).toBe("value");

    result = noproto("__proto__", "malicious");
    expect(result).toBe(undefined);
  });
});

describe("parseJSON", () => {
  it("should parse JSON strings", () => {
    const result = parseJSON(`{"name": "Meza"}`);
    expect(result).toEqual({ name: "Meza" });
  });

  it("should ignore __proto__ properties", () => {
    const result = parseJSON(`{"name": "Meza", "__proto__": "malicious" }`);
    expect(result).toEqual({ name: "Meza" });
  });
});
