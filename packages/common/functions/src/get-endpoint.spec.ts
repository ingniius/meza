import { describe, expect, it } from "vitest";

import { getEndpoint } from "./get-endpoint";

describe("#getEndpoint", () => {
  it('should hide "meza_" when a system collection is passed in', () => {
    expect(getEndpoint("meza_users")).toBe("/users");
  });

  it('should add "/items/" when a non-system collection is passed in', () => {
    expect(getEndpoint("user_collection")).toBe("/items/user_collection");
  });
});
