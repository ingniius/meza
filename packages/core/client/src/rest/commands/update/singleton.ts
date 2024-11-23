import type { ApplyQueryFields, CollectionType, Query, SingletonCollections } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfCoreCollection, throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateSingletonOutput<
  Schema,
  Collection extends SingletonCollections<Schema>,
  TQuery extends Query<Schema, Schema[Collection]>,
> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateSingleton
 * @description Update a singleton item.
 * @param collection The collection of the items
 * @param query The query parameters
 */
export const updateSingleton =
  <
    Schema,
    Collection extends SingletonCollections<Schema>,
    const TQuery extends Query<Schema, Schema[Collection]>,
    Item = Schema[Collection],
  >(
    collection: Collection,
    item: Partial<Item>,
    query?: TQuery,
  ): RestCommand<UpdateSingletonOutput<Schema, Collection, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use updateSingleton for core collections");

    return {
      path: `/items/${collection as string}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
