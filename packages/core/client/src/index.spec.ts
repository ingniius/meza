import { assertType, describe, it } from "vitest";

import type { ApplyQueryFields, MergeCoreCollection, Query, RegularCollections } from "./index";

describe("#sdk", () => {
  it("should fallback using sensible types", () => {
    // collection fallback
    assertType<RegularCollections<any>>("string");

    // query fallbacks
    const fields: (string | Record<string, any>)[] = ["*", { string: ["*"] }] as const;
    const filter: Record<string, any> = { string: { _eq: "something" } };
    const sort: string | string[] = "-string";
    const deep: Record<string, any> = { string: { something: "value" } };
    const alias: Record<string, string> = { string: "alias" };
    // the rest are not based on the schema
    assertType<Query<any, any>>({ fields, filter, sort, deep, alias });

    // output fallback
    const output: Record<string, any> = { field: "value" };
    assertType<ApplyQueryFields<any, any, typeof fields>>(output);
  });

  it("should fallback core collection", () => {
    type CoreCollection = MergeCoreCollection<any, "meza_it", { test: string }>;

    assertType<CoreCollection>({ test: "string" });
    // @ts-expect-error
    assertType<CoreCollection>({ error: "string", test: "string" });
  });

  it("should fail for explicit invalid schema types", () => {
    // @ts-expect-error
    assertType<RegularCollections<null>>("test");
    // @ts-expect-error
    assertType<RegularCollections<undefined>>("test");
    // @ts-expect-error
    assertType<RegularCollections<string>>("test");
    // @ts-expect-error
    assertType<RegularCollections<number>>("test");
    // @ts-expect-error
    assertType<RegularCollections<unknown>>("test");
    // @ts-expect-error
    assertType<RegularCollections<unknown[]>>("test");
    // @ts-expect-error
    assertType<RegularCollections<string | boolean>>("test");
  });
});
