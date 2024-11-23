import type { CoreSchema } from "../schemas";
import type { IfAny, UnpackList } from "./utils";

/**
 * @publicApi
 * @description Merge custom schema with core schema.
 */
export type AllCollections<Schema> = RegularCollections<Schema> | RegularCollections<CoreSchema<Schema>>;

/**
 * @publicApi
 * @description Return singular collection type.
 */
export type CollectionType<Schema, Collection> = IfAny<
  Schema,
  any,
  Collection extends keyof Schema
    ? UnpackList<Schema[Collection]> extends object
      ? UnpackList<Schema[Collection]>
      : never
    : never
>;

/**
 * @publicApi
 * @description Merge custom and core schema objects.
 */
export type CompleteSchema<Schema> =
  CoreSchema<Schema> extends infer Core
    ? {
        [Collection in keyof Schema | keyof Core]: Collection extends keyof Core
          ? Core[Collection]
          : Collection extends keyof Schema
            ? Schema[Collection]
            : never;
      }
    : never;

/**
 * @publicApi
 * @description Helper to extract a collection with fallback to defaults.
 */
export type GetCollection<
  Schema,
  CollectionName extends AllCollections<Schema>,
> = CollectionName extends keyof CoreSchema<Schema>
  ? CoreSchema<Schema>[CollectionName]
  : CollectionName extends keyof Schema
    ? Schema[CollectionName]
    : never;

/**
 * @publicApi
 * @description Helper to extract a collection name.
 */
export type GetCollectionName<Schema, Collection, FullSchema = CompleteSchema<Schema>> = {
  [K in keyof FullSchema]: UnpackList<FullSchema[K]> extends Collection ? K : never;
}[keyof FullSchema];

/**
 * @publicApi
 * @description Get all available top level Item types from a given Schema.
 */
export type ItemType<Schema> =
  | Schema[keyof Schema]
  | {
      [K in keyof Schema]: Schema[K] extends any[] ? Schema[K][number] : never;
    }[keyof Schema];

/**
 * @publicApi
 * @description Merge a core collection from the schema with the builtin schema.
 */
export type MergeCoreCollection<Schema, Collection extends keyof Schema | string, BuiltinCollection> = IfAny<
  Schema,
  BuiltinCollection,
  Collection extends keyof Schema
    ? UnpackList<Schema[Collection]> extends infer Item
      ? {
          [Field in Exclude<keyof Item, keyof BuiltinCollection>]: Item[Field];
        } & BuiltinCollection
      : never
    : BuiltinCollection
>;

/**
 * @publicApi
 * @description Return string keys of all Primitive fields in the given schema Item.
 */
export type PrimitiveFields<Schema, Item> = {
  [Key in keyof Item]: Extract<Item[Key], ItemType<Schema>> extends never ? Key : never;
}[keyof Item];

/**
 * @publicApi
 * @description Returns a list of regular collections in the schema.
 */
export type RegularCollections<Schema> = IfAny<Schema, string, Exclude<keyof Schema, SingletonCollections<Schema>>>;

/**
 *@publicApi
 * @description  Return string keys of all Relational fields in the given schema Item.
 */
export type RelationalFields<Schema, Item> = {
  [Key in keyof Item]: Extract<Item[Key], ItemType<Schema>> extends never ? never : Key;
}[keyof Item];

/**
 * @publicApi
 * @description Remove the related Item types from relational m2o/a2o fields.
 */
export type RemoveRelationships<Schema, Item> = {
  [Key in keyof Item]: Exclude<Item[Key], ItemType<Schema>>;
};

/**
 * @publicApi
 * @description Returns a list of singleton collections in the schema.
 */
export type SingletonCollections<Schema> = {
  [Key in keyof Schema]: Schema[Key] extends any[] ? never : Key;
}[keyof Schema];
