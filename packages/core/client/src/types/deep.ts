import type { MergeObjects, Query } from "./query";
import type { ItemType, RelationalFields } from "./schema";
import type { UnpackList } from "./utils";

/**
 * @private
 */
type ExtractCollection<Schema, Item> = Extract<Item, ItemType<Schema>>;

/**
 * @publicApi
 * @description Deep filter object.
 */
export type QueryDeep<Schema, Item> =
  UnpackList<Item> extends infer FlatItem
    ? RelationalFields<Schema, FlatItem> extends never
      ? never
      : {
          [Field in RelationalFields<Schema, FlatItem> as ExtractCollection<Schema, FlatItem[Field]> extends any[]
            ? Field
            : never]?: ExtractCollection<Schema, FlatItem[Field]> extends infer CollectionItem
            ? Query<Schema, CollectionItem> extends infer TQuery
              ? MergeObjects<
                  QueryDeep<Schema, CollectionItem>,
                  {
                    [Key in keyof Omit<TQuery, "deep" | "alias" | "fields"> as `_${string & Key}`]: TQuery[Key];
                  }
                >
              : never
            : never;
        }
    : never;
