import type { QueryDeep } from "./deep";
import type { HasNestedFields, QueryFields } from "./fields";
import type { QueryFilter } from "./filters";
import type { ItemType } from "./schema";
import type { IfAny, UnpackList } from "./utils";

/**
 * @publicApi
 * @description Returns Item types that are available in the root Schema.
 */
export type ExtractItem<Schema, Item> = Extract<UnpackList<Item>, ItemType<Schema>>;

/**
 * @publicApi
 * @description Returns the relation type from the current item by key.
 */
export type ExtractRelation<Schema, Item extends object, Key> = Key extends keyof Item
  ? ExtractItem<Schema, Item[Key]>
  : never;

/**
 * @publicApi
 * @description Merge separate relational objects together.
 */
export type MergeFields<FieldList> =
  HasNestedFields<FieldList> extends never
    ? Extract<UnpackList<FieldList>, string>
    : Extract<UnpackList<FieldList>, string> | MergeRelationalFields<FieldList>;

/**
 * @publicApi
 */
export type MergeObjects<A, B> = object extends A ? (object extends B ? A & B : A) : object extends B ? B : never;

/**
 * @publicApi
 * @description Merge union of optional objects.
 */
export type MergeRelationalFields<FieldList> =
  Exclude<UnpackList<FieldList>, string> extends infer RelatedFields
    ? {
        [Key in RelatedFields extends any ? keyof RelatedFields : never]-?: Exclude<RelatedFields[Key], undefined>;
      }
    : never;

/**
 * @publicApi
 * @description All query options available
 */
export interface Query<Schema, Item> {
  readonly fields?: IfAny<Schema, (string | Record<string, any>)[], QueryFields<Schema, Item>> | undefined;
  filter?: IfAny<Schema, Record<string, any>, QueryFilter<Schema, Item>> | undefined;
  search?: string | undefined;
  sort?: IfAny<Schema, string | string[], QuerySort<Schema, Item> | QuerySort<Schema, Item>[]> | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  page?: number | undefined;
  deep?: IfAny<Schema, Record<string, any>, QueryDeep<Schema, Item>> | undefined;
  readonly alias?: IfAny<Schema, Record<string, string>, QueryAlias<Schema, Item>> | undefined;
}

/**
 * @publicApi
 * @TODO somehow include these aliases in the Field Types!!
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryAlias<_Schema, Item> = Record<string, keyof Item>;

/**
 * @publicApi
 * @description All query options with an additional version query option for readItem and readSingleton.
 */
export interface QueryItem<Schema, Item> extends Query<Schema, Item> {
  readonly version?: string | undefined;
  readonly versionRaw?: boolean | undefined;
}

/**
 * @publicApi
 * @TODO expand to relational sorting (same object notation as fields i guess)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QuerySort<_Schema, Item> =
  UnpackList<Item> extends infer FlatItem
    ? {
        [Field in keyof FlatItem]: Field | `-${Field & string}`;
      }[keyof FlatItem]
    : never;
