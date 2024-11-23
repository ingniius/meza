import type { FunctionFields } from "./functions";
import type { ExtractItem } from "./query";
import type { ItemType, RelationalFields, RemoveRelationships } from "./schema";
import type { IfNever, UnpackList } from "./utils";

/**
 * @private
 */
type AllKeys<T> = T extends any ? keyof T : never;

/**
 * @publicApi
 * @description Return all keys if Fields is undefined or contains '*'.
 */
export type FieldsWildcard<Item extends object, Fields> = unknown extends Fields
  ? keyof Item
  : UnpackList<Fields> extends infer Field
    ? Field extends undefined
      ? keyof Item
      : Field extends "*"
        ? keyof Item
        : Field extends string
          ? Field
          : never
    : never;

/**
 * @publicApi
 * @description Determine whether a field definition has a many-to-any relation.
 * @TODO try making this dynamic somehow instead of relying on "item" as key
 */
export type HasManyToAnyRelation<Item> =
  UnpackList<Item> extends infer TItem
    ? TItem extends object
      ? "collection" extends keyof TItem
        ? "item" extends keyof TItem
          ? true
          : never
        : never
      : never
    : never;

/**
 * @publicApi
 * @description Returns true if the Fields has any nested field.
 */
export type HasNestedFields<Fields> =
  UnpackList<Fields> extends infer Field ? (Field extends object ? true : never) : never;

/**
 * @publicApi
 * @description Extract a specific literal type from a collection.
 */
export type LiteralFields<Item, Type extends string> = {
  [Key in keyof Item]: Extract<Item[Key], Type>[] extends never[] ? never : Key;
}[keyof Item];

/**
 * @publicApi
 * @description Deal with many-to-any relational fields.
 */
export type ManyToAnyFields<Schema, Item> =
  ExtractItem<Schema, Item> extends infer TItem
    ? TItem extends object
      ? "collection" extends keyof TItem
        ? "item" extends keyof TItem
          ? WrapQueryFields<
              Schema,
              TItem,
              Omit<QueryFieldsRelational<Schema, UnpackList<Item>>, "item"> & {
                item?: {
                  [Collection in keyof Schema as Collection extends TItem["collection"]
                    ? Collection
                    : never]?: QueryFields<Schema, Schema[Collection]>;
                };
              }
            >
          : never
        : never
      : never
    : never;

/**
 * @private
 */
type MergeRelations<RelationalFields extends object | never> = {
  [Key in AllKeys<RelationalFields>]: PickType<RelationalFields, Key>;
};

/**
 * @publicApi
 * @description Extract the required fields from an item.
 */
export type PickFlatFields<Schema, Item, Fields> =
  Extract<Fields, keyof Item> extends never
    ? never
    : Pick<RemoveRelationships<Schema, Item>, Extract<Fields, keyof Item>>;

/**
 * @publicApi
 * @description Returns the relational fields from the fields list.
 */
export type PickRelationalFields<Fields> = MergeRelations<
  UnpackList<Fields> extends infer Field ? (Field extends object ? Field : never) : never
>;

/**
 * @private
 */
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any } ? T[K] : undefined;

/**
 * @publicApi
 * @description Fields querying, including nested relational fields.
 */
export type QueryFields<Schema, Item> = WrapQueryFields<Schema, Item, QueryFieldsRelational<Schema, UnpackList<Item>>>;

/**
 * @publicApi
 * @description Object of nested relational fields in a given Item with it's own fields available for selection.
 */
export type QueryFieldsRelational<Schema, Item> = IfNever<
  RelationalFields<Schema, Item>,
  never,
  {
    [Key in RelationalFields<Schema, Item>]?: Extract<Item[Key], ItemType<Schema>> extends infer RelatedCollection
      ? RelatedCollection extends any[]
        ? HasManyToAnyRelation<RelatedCollection> extends never
          ? QueryFields<Schema, RelatedCollection> // many-to-many or one-to-many
          : ManyToAnyFields<Schema, RelatedCollection> // many to any
        : QueryFields<Schema, RelatedCollection> // many-to-one
      : never;
  }
>;

/**
 * @publicApi
 * @description Wrap array of fields.
 */
export type WrapQueryFields<Schema, Item, NestedFields> = readonly (
  | "*"
  | keyof UnpackList<Item>
  | NestedFields
  | FunctionFields<Schema, UnpackList<Item>>
)[];
