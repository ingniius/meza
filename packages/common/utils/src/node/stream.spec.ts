import { expect, it } from "vitest";

import { Readable } from "node:stream";

import { readableStreamToString } from "./stream";

it.each([Readable.from("test", { encoding: "utf8" }), Readable.from(Buffer.from([0x74, 0x65, 0x73, 0x74]))])(
  "should return a readable stream as string",
  async (readableStream) => {
    expect(readableStreamToString(readableStream)).resolves.toBe("test");
  },
);
