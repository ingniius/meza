import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// import stripAnsi from "strip-ansi";
import { updateCheck } from "./check";

const axiosMock = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("axios", () => ({ default: { create: () => ({ get: axiosMock.get }) } }));
vi.mock("./cache");

let consoleMock: MockInstance;

describe("#updateCheck", () => {
  beforeEach(() => {
    consoleMock = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // it("should print banner if update is available", async () => {
  //   const manifest = {
  //     "dist-tags": { latest: "0.0.1" },
  //     "versions": {
  //       "0.0.0": {},
  //       "0.0.1": {},
  //     },
  //   };

  //   axiosMock.get.mockResolvedValue({ data: manifest });

  //   const currentVersion = "0.0.1";
  //   await updateCheck(currentVersion);

  //   const output = consoleMock.mock.calls?.[0]?.[0];

  //   /**
  //    * @TODO 'vi.StubEnv' doesn't seem to work, which means we cannot use 'FORCE_COLOR' to ensure output is the same on every platform.
  //    * Therefore stripping away ANSI codes for now.
  //    */
  //   const cleanOutput = output ? stripAnsi(output) : output;

  //   expect(cleanOutput).toMatchInlineSnapshot(`
  // 	"
  //   ╭───────────────────────────────────────────────────╮
  //   │                                                   │
  //   │                 Update available!                 │
  //   │                                                   │
  //   │                  0.0.0 → 0.0.1                    │
  //   │                 1 versions behind                 │
  // 	│                                                   │
  // 	│                 More information:                 │
  // 	│   https://github.com/ingniius/meza/releases       │
  // 	│                                                   │
  // 	╰───────────────────────────────────────────────────╯
  //   "
  // `);
  // });

  it("should not fail on empty response", async () => {
    axiosMock.get.mockResolvedValue({ data: null });

    const currentVersion = "0.0.1";
    await updateCheck(currentVersion);

    expect(consoleMock).not.toHaveBeenCalled();
  });
});
