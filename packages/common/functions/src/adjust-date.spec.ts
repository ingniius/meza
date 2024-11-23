import { describe, expect, it } from "vitest";

import { adjustDate } from "./adjust-date";

describe("#adjustDate", () => {
  const date = new Date("2021-09-20T21:06:51.517Z");

  it("should return undefined when the adjustment isnt in a supported format", () => {
    expect(adjustDate(date, "-ms1")).toBe(undefined);
  });

  it("should subtract a year from the date", () => {
    const adjustedDate = new Date("2020-09-20T21:06:51.517Z");
    expect(adjustDate(date, "-1.0y")).toStrictEqual(adjustedDate);
  });

  it("should subtract a month from the date", () => {
    const adjustedDate = new Date("2021-08-20T21:06:51.517Z");
    expect(adjustDate(date, "-1.0mo")).toStrictEqual(adjustedDate);
  });

  it("should subtract a week from the date", () => {
    const adjustedDate = new Date("2021-09-13T21:06:51.517Z");
    expect(adjustDate(date, "-1.0weeks")).toStrictEqual(adjustedDate);
  });

  it("should subtract a day from the date", () => {
    const adjustedDate = new Date("2021-09-19T21:06:51.517Z");
    expect(adjustDate(date, "-1.0")).toStrictEqual(adjustedDate);
  });

  it("should subtract an hour from the date", () => {
    const adjustedDate = new Date("2021-09-20T20:06:51.517Z");
    expect(adjustDate(date, "-1.0h")).toStrictEqual(adjustedDate);
  });

  it("should subtract a minute from the date", () => {
    const adjustedDate = new Date("2021-09-20T21:05:51.517Z");
    expect(adjustDate(date, "-1.0minutes")).toStrictEqual(adjustedDate);
  });

  it("should subtract a second from the date", () => {
    const adjustedDate = new Date("2021-09-20T21:06:50.517Z");
    expect(adjustDate(date, "-1.0secs")).toStrictEqual(adjustedDate);
  });

  it("should subtract a millisecond from the date", () => {
    const adjustedDate = new Date("2021-09-20T21:06:51.516Z");
    expect(adjustDate(date, "-1.0ms")).toStrictEqual(adjustedDate);
  });
});
