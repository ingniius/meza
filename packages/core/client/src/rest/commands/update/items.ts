import type { ApplyQueryFields, CollectionType, Query, UnpackList } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfCoreCollection, throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateItemOutput<
  Schema,
  Collection extends keyof Schema,
  TQuery extends Query<Schema, Schema[Collection]>,
> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateItems
 * @description Update multiple items at the same time.
 * @param collection The collection of the items
 * @param keysOrQuery The primary keys or a query
 * @param item The item data to update
 * @param query Optional return data query
 */
export const updateItems =
  <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(
    collection: Collection,
    keysOrQuery: string[] | number[] | Query<Schema, Schema[Collection]>,
    item: Partial<UnpackList<Schema[Collection]>>,
    query?: TQuery,
  ): RestCommand<UpdateItemOutput<Schema, Collection, TQuery>[], Schema> =>
  () => {
    let payload: Record<string, any> = {};
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use updateItems for core collections");

    if (Array.isArray(keysOrQuery)) {
      throwIfEmpty(keysOrQuery, "keysOrQuery cannot be empty");
      payload = { keys: keysOrQuery };
    } else {
      throwIfEmpty(Object.keys(keysOrQuery), "keysOrQuery cannot be empty");
      payload = { query: keysOrQuery };
    }

    payload["data"] = item;

    return {
      path: `/items/${collection as string}`,
      params: query ?? {},
      body: JSON.stringify(payload),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateItemsBatch
 * @description Update multiple items as batch.
 * @param collection The collection of the items
 * @param items The items to update
 * @param query Optional return data query
 */
export const updateItemsBatch =
  <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(
    collection: Collection,
    items: Partial<UnpackList<Schema[Collection]>>[],
    query?: TQuery,
  ): RestCommand<UpdateItemOutput<Schema, Collection, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use updateItems for core collections");

    return {
      path: `/items/${collection as string}`,
      params: query ?? {},
      body: JSON.stringify(items),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateItem
 * @description Update an existing item.
 * @param collection The collection of the item
 * @param key The primary key of the item
 * @param item The item data to update
 * @param query Optional return data query
 */
export const updateItem =
  <
    Schema,
    Collection extends keyof Schema,
    const TQuery extends Query<Schema, Schema[Collection]>,
    Item = UnpackList<Schema[Collection]>,
  >(
    collection: Collection,
    key: string | number,
    item: Partial<Item>,
    query?: TQuery,
  ): RestCommand<UpdateItemOutput<Schema, Collection, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use updateItem for core collections");

    return {
      path: `/items/${collection as string}/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
