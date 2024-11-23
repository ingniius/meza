import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Filter } from "@azem/types/filter";
import type { Policy } from "@azem/types/policy";
import type { User } from "@azem/types/user";

import { parseFilter } from "./parse-filter";

describe("#parseFilter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(1632431505992));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should accept empty filter object", () => {
    const filter = {};
    const parsedFilter = parseFilter(filter, null);
    expect(parsedFilter).toEqual({});
  });

  it("should accept empty object for key", () => {
    const filter = { field_a: {} };
    const parsedFilter = parseFilter(filter, null);
    expect(parsedFilter).toEqual({ field_a: {} });
  });

  it("should return the filter when passed accountability with only a role", () => {
    const mockFilter = { _and: [{ field: { _eq: "field" } }] } as Filter;
    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockFilter);
  });

  it("properly shifts up implicit logical operator", () => {
    const mockFilter = {
      date_field: {
        _and: [{ _gte: "2023-10-01T00:00:00" }, { _lt: "2023-11-01T00:00:00" }],
      },
    } as Filter;

    const mockResult = {
      _and: [{ date_field: { _gte: "2023-10-01T00:00:00" } }, { date_field: { _lt: "2023-11-01T00:00:00" } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("leaves explicit logical operator as is", () => {
    const mockFilter = {
      _and: [{ date_field: { _gte: "2023-10-01T00:00:00" } }, { date_field: { _lt: "2023-11-01T00:00:00" } }],
    } as Filter;

    const mockResult = {
      _and: [{ date_field: { _gte: "2023-10-01T00:00:00" } }, { date_field: { _lt: "2023-11-01T00:00:00" } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should return the filter includes an _in it parses the filter with a deepMap", () => {
    const mockFilter = {
      _and: [{ status: { _in: "published" } }],
    } as Filter;

    const mockResult = {
      _and: [{ status: { _in: ["published"] } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should return the filter includes an _in it parses the filter with a deepMap", () => {
    const mockFilter = {
      _and: [{ status: { _in: "published,draft" } }],
    } as Filter;

    const mockResult = {
      _and: [{ status: { _in: ["published", "draft"] } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should return the date", () => {
    const mockFilter = {
      _and: [{ date: { _eq: "$NOW" } }],
    } as Filter;

    const mockResult = {
      _and: [{ date: { _eq: new Date() } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should return the filter includes an _in it parses the filter with a deepMap", () => {
    const mockFilter = {
      _and: [{ status: { _in: ["published", "draft"] } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockFilter);
  });

  it("should proper type casting", () => {
    const mockFilter = {
      _and: [{ status: { _eq: "true" } }, { field: { _eq: "false" } }, { field2: { _eq: "null" } }],
    } as Filter;

    const mockResult = {
      _and: [{ status: { _eq: true } }, { field: { _eq: false } }, { field2: { _eq: null } }],
    };

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should replace the user from accountability to $CURRENT_USER", () => {
    const mockFilter = {
      _and: [{ owner: { _eq: "$CURRENT_USER" } }],
    } as Filter;

    const mockResult = {
      _and: [{ owner: { _eq: "user" } }],
    } as Filter;

    const mockAccountability = { role: "admin", user: "user" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should replace the role from accountability to $CURRENT_ROLE", () => {
    const mockFilter = {
      _and: [{ owner: { _eq: "$CURRENT_ROLE" } }],
    } as Filter;

    const mockResult = {
      _and: [{ owner: { _eq: "admin" } }],
    } as Filter;

    const mockAccountability = { role: "admin" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should replace the roles from accountability to $CURRENT_ROLES", () => {
    const mockFilter = {
      _and: [{ owner: { _in: "$CURRENT_ROLES" } }],
    } as Filter;

    const mockResult = {
      _and: [{ owner: { _in: ["admin"] } }],
    } as Filter;

    const mockAccountability = { roles: ["admin"] };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should adjust the date by 1 day", () => {
    const mockFilter = {
      date: { _eq: "$NOW(-1 day)" },
    } as Filter;

    const mockResult = {
      date: { _eq: new Date("2021-09-22T21:11:45.992Z") },
    } as Filter;

    const mockAccountability = { role: "admin", user: "user" };
    expect(parseFilter(mockFilter, mockAccountability)).toStrictEqual(mockResult);
  });

  it("should replace field from user using the $CURRENT_USER variable", () => {
    const mockFilter = {
      _and: [{ field: { _eq: "$CURRENT_USER.additional_field" } }],
    } as Filter;

    const mockResult = {
      _and: [{ field: { _eq: "example-value" } }],
    } as Filter;

    const mockAccountability = { role: "admin", user: "user" };
    const mockContext = { $CURRENT_USER: { additional_field: "example-value" } as unknown as User };
    expect(parseFilter(mockFilter, mockAccountability, mockContext)).toStrictEqual(mockResult);
  });

  it("should replace nested field from user using the $CURRENT_USER variable", () => {
    const mockFilter = {
      _and: [{ field: { _eq: "$CURRENT_USER.additional_relation.field" } }],
    } as Filter;

    const mockResult = {
      _and: [{ field: { _eq: "example-value" } }],
    } as Filter;

    const mockAccountability = { role: "admin", user: "user" };
    const mockContext = { $CURRENT_USER: { additional_relation: { field: "example-value" } } as unknown as User };
    expect(parseFilter(mockFilter, mockAccountability, mockContext)).toStrictEqual(mockResult);
  });

  it("should replace nested field from user using the $CURRENT_USER variable", () => {
    const mockFilter = {
      _and: [{ field: { _in: ["$CURRENT_USER.o2m.nested_o2m.field"] } }],
    } as Filter;

    const mockResult = {
      _and: [{ field: { _in: ["example-value"] } }],
    } as Filter;

    const mockAccountability = { role: "admin", user: "user" };
    const mockContext = {
      $CURRENT_USER: { o2m: [{ nested_o2m: [{ field: "example-value" }] }] } as unknown as User,
    };

    expect(parseFilter(mockFilter, mockAccountability, mockContext)).toStrictEqual(mockResult);
  });

  it("should replace the policies with the ids of the $CURRENT_POLICIES variable", () => {
    const mockFilter = {
      _and: [{ owner: { _in: "$CURRENT_POLICIES" } }],
    } as Filter;

    const mockResult = {
      _and: [{ owner: { _in: ["policy-1"] } }],
    } as Filter;

    const mockAccountability = {};
    const mockContext = { $CURRENT_POLICIES: [{ id: "policy-1" }] as unknown as Policy[] };
    expect(parseFilter(mockFilter, mockAccountability, mockContext)).toStrictEqual(mockResult);
  });

  it("should replace field from policies using the $CURRENT_POLICIES variable", () => {
    const mockFilter = {
      _and: [{ owner: { _in: "$CURRENT_POLICIES.key" } }],
    } as Filter;

    const mockResult = {
      _and: [{ owner: { _in: ["policy-key"] } }],
    } as Filter;

    const mockAccountability = {};
    const mockContext = { $CURRENT_POLICIES: [{ key: "policy-key" }] as unknown as Policy[] };
    expect(parseFilter(mockFilter, mockAccountability, mockContext)).toStrictEqual(mockResult);
  });
});
