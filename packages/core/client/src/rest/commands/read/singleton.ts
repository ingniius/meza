import type { ApplyQueryFields, CollectionType, Query, QueryItem, SingletonCollections } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfCoreCollection, throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadSingletonOutput<
  Schema,
  Collection extends SingletonCollections<Schema>,
  TQuery extends Query<Schema, Schema[Collection]>,
> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery["fields"]>;

/**
 * @publicApi
 * @name readSingleton
 * @description List the singleton item in Meza.
 * @param collection The collection of the items
 * @param query The query parameters
 */
export const readSingleton =
  <Schema, Collection extends SingletonCollections<Schema>, const TQuery extends QueryItem<Schema, Schema[Collection]>>(
    collection: Collection,
    query?: TQuery,
  ): RestCommand<ReadSingletonOutput<Schema, Collection, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");
    throwIfCoreCollection(collection, "Cannot use readSingleton for core collections");

    return {
      path: `/items/${collection as string}`,
      params: query ?? {},
      method: "GET",
    };
  };
