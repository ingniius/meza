import type { ApplyQueryFields, CollectionType, Query, QueryItem, RegularCollections } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfCoreCollection, throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadItemOutput<
  Schema,
  Collection extends RegularCollections<Schema>,
  TQuery extends Query<Schema, CollectionType<Schema, Collection>>,
> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery["fields"]>;

/**
 * @publicApi
 * @name readItems
 * @description List all items that exist in Meza.
 * @param collection The collection of the items
 * @param query The query parameters
 */
export const readItems =
  <
    Schema,
    Collection extends RegularCollections<Schema>,
    const TQuery extends Query<Schema, CollectionType<Schema, Collection>>,
  >(
    collection: Collection,
    query?: TQuery,
  ): RestCommand<ReadItemOutput<Schema, Collection, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use readItems for core collections");

    return {
      path: `/items/${collection as string}`,
      params: query ?? {},
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readItem
 * @description Get an item that exists in Meza.
 * @param collection The collection of the item
 * @param key The primary key of the item
 * @param query The query parameters
 */
export const readItem =
  <
    Schema,
    Collection extends RegularCollections<Schema>,
    const TQuery extends QueryItem<Schema, CollectionType<Schema, Collection>>,
  >(
    collection: Collection,
    key: string | number,
    query?: TQuery,
  ): RestCommand<ReadItemOutput<Schema, Collection, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use readItem for core collections");
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/items/${collection as string}/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
