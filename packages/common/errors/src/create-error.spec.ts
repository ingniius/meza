import { beforeEach, describe, expect, it, vi } from "vitest";

import { randomAlpha } from "@azem/testing/alpha";
import { randomInteger } from "@azem/testing/integer";

import { createError } from "./create-error";

let sample: {
  code: string;
  status: number;
  message: string;
  extensionKey: string;
  extensionValue: string;
};

describe("#createError", () => {
  beforeEach(() => {
    sample = {
      code: randomAlpha(randomInteger(1, 25)),
      status: randomInteger(200, 599),
      message: randomAlpha(randomInteger(10, 50)),
      extensionKey: randomAlpha(randomInteger(1, 10)),
      extensionValue: randomAlpha(randomInteger(1, 10)),
    };
  });

  it("should return a enhanced error object", () => {
    const TestError = createError(sample.code, sample.message, sample.status);
    const error = new TestError();

    expect(error.name).toBe("MezaError");
    expect(error.code).toBe(sample.code.toUpperCase());
    expect(error.message).toBe(sample.message);
    expect(error.status).toBe(sample.status);
  });

  it("should allow passing message as callback function", () => {
    const TestError = createError(sample.code, () => sample.message, sample.status);
    const error = new TestError();
    expect(error.message).toBe(sample.message);
  });

  it("should pass extensions to custom message function", () => {
    const messageGenerator = vi.fn().mockReturnValue(sample.message);
    const extensions = { [sample.extensionKey]: sample.extensionValue };
    const TestError = createError<{ [key: string]: unknown }>(sample.code, messageGenerator, sample.status);

    new TestError(extensions);

    expect(messageGenerator).toHaveBeenCalledWith(extensions);
  });

  it("should make extensions available", () => {
    const messageGenerator = vi.fn().mockReturnValue(sample.message);
    const extensions = { [sample.extensionKey]: sample.extensionValue };
    const TestError = createError<{ [key: string]: unknown }>(sample.code, messageGenerator, sample.status);

    const error = new TestError(extensions);

    expect(error.extensions).toBe(extensions);
  });

  it("should override toString", () => {
    const TestError = createError(sample.code, sample.message, sample.status);
    const error = new TestError();
    expect(error.toString()).toBe(`MezaError [${sample.code.toUpperCase()}]: ${sample.message}`);
  });
});
