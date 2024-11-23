import { describe, expect, it } from "vitest";

import type { Collection } from "@azem/types/types";

import { getCollectionType } from "./get-collection-type";

const TableCollection: Collection = {
  collection: "table",
  schema: {
    name: "table",
  },
  meta: null,
};

const AliasCollection: Collection = {
  collection: "table",
  schema: null,
  meta: {
    collection: "table",
    note: "",
    hidden: true,
    singleton: true,
    icon: "box",
    color: "#abcabc",
    translations: null,
    display_template: null,
    preview_url: null,
    sort_field: null,
    archive_field: null,
    archive_value: null,
    unarchive_value: null,
    archive_app_filter: true,
    item_duplication_fields: null,
    accountability: null,
    sort: null,
    group: null,
    collapse: "open",
  },
};

const UnknownCollection: Collection = {
  collection: "unknown",
  schema: null,
  meta: null,
};

describe("#getCollectionType", () => {
  it('should return "table" when collection has schema information', () => {
    expect(getCollectionType(TableCollection)).toStrictEqual("table");
  });

  it('should return "alias" when collection has schema information', () => {
    expect(getCollectionType(AliasCollection)).toStrictEqual("alias");
  });

  it('should return "unknown" when collection has schema information', () => {
    expect(getCollectionType(UnknownCollection)).toStrictEqual("unknown");
  });
});
