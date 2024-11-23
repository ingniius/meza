import { describe, expect, it, vi } from "vitest";

import { randomAlpha } from "./alpha";
import { randomIdentifier } from "./identifier";
import { randomInteger } from "./integer";

vi.mock("./alpha");
vi.mock("./integer");

describe("#randomIdentifier", () => {
  it("should use randomAlpha / randomInteger to generate a string", () => {
    vi.mocked(randomInteger).mockReturnValue(5);
    randomIdentifier();
    expect(randomInteger).toHaveBeenCalledWith(3, 25);
    expect(randomAlpha).toHaveBeenCalledWith(5);
  });
});
