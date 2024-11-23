import { describe, expect, it } from "vitest";

import { normalizePath, parseFilterFunctionPath } from "./path";

describe("#get", () => {
  it("should return a single / for given \\", () => {
    expect(normalizePath("\\")).toBe("/");
  });

  it("should return a single / for given /", () => {
    expect(normalizePath("/")).toBe("/");
  });

  it("should return a single character paths immediately", () => {
    expect(normalizePath("r")).toBe("r");
  });

  const cases: [string, string][] = [
    ["../test/path", "../test/path"],
    ["..\\test\\path", "../test/path"],
    ["/test/path/", "/test/path"],
    ["C:\\\\test\\path", "C:/test/path"],
    ["\\?\\C:\\test\\path", "/?/C:/test/path"],
    ["\\\\.\\CdRomX", "//./CdRomX"],
  ];

  for (const [before, after] of cases) {
    it(before, () => {
      expect(normalizePath(before)).toBe(after);
    });
  }

  it("should strip leading when option is set", () => {
    expect(normalizePath("/test", { removeLeading: true })).toBe("test");
  });
});

describe("#parseFilterFunctionPath", () => {
  it("should parse an empty input", () => {
    const input = "";
    expect(parseFilterFunctionPath(input)).toBe(input);
  });

  it("should parse strings without functions", () => {
    let input = "noFunction";
    expect(parseFilterFunctionPath(input)).toBe(input);

    input = "a.b.noFunction";
    expect(parseFilterFunctionPath(input)).toBe(input);
  });

  it("should parse functions without nested columns", () => {
    const input = "function(field)";
    expect(parseFilterFunctionPath(input)).toBe(input);
  });

  it("should parse functions with nested columns", () => {
    const input = "function(a.b.field)";
    expect(parseFilterFunctionPath(input)).toBe("a.b.function(field)");
  });

  it("should parse nested functions without nested columns", () => {
    const input = "a.b.function(field)";
    expect(parseFilterFunctionPath(input)).toBe(input);
  });

  it("should parse nested functions with nested columns", () => {
    const input = "a.b.function(c.d.field)";
    expect(parseFilterFunctionPath(input)).toBe("a.b.c.d.function(field)");
  });
});
