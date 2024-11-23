import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Hash } from "node:crypto";
import { createHash } from "node:crypto";
import { hostname } from "node:os";

import { _cache, processId } from "./process";

vi.mock("node:crypto");
vi.mock("node:os");

describe("#processId", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    _cache.id = undefined;
    vi.useRealTimers();
  });

  it("should return a cached value if exists", () => {
    const val = "test-value";
    _cache.id = val;
    expect(processId()).toBe(val);
  });

  it("should generate and return a hash if value does not exist yet", () => {
    const mockHash = { update: vi.fn().mockReturnThis(), digest: vi.fn() } as unknown as Hash;
    vi.mocked(createHash).mockReturnValue(mockHash);
    vi.mocked(hostname).mockReturnValue("test-hostname");
    vi.setSystemTime(new Date("2023-11-14T22:13:20Z"));

    processId();

    expect(createHash).toHaveBeenCalledWith("md5");
    expect(hostname).toHaveBeenCalled();
    expect(mockHash.update).toHaveBeenCalledWith(`test-hostname${process.pid}1700000000000`);
  });
});
