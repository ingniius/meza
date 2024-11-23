import { describe, expect, it } from "vitest";

import { defu } from "./defu";

describe("#defu", () => {
  it("should returns defu with input properties assigned", () => {
    expect(defu({ input: true }, { default: "test" })).toEqual({ input: true, default: "test" });
  });

  it("should overwrite undefined values in input object", () => {
    type Input = { default: undefined | string };
    expect(defu({ default: undefined } as Input, { default: "test" })).toEqual({ default: "test" });
  });
});
