import { describe, expect, it } from "vitest";

import { messageConstructor } from "./unsupported-media-type";

describe("#messageConstructor", () => {
  it("should construct message from extensions", () => {
    const mediaType = "application/json";
    const where = "Content-Type header";

    const message = messageConstructor({ mediaType, where });
    expect(message).toMatchInlineSnapshot(`"Unsupported media type "application/json" in Content-Type header."`);
  });
});
