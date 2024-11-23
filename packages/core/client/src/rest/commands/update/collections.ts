import type { MezaCollection } from "../../../schemas/collection";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateCollectionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaCollection<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateCollection
 * @description Update the metadata for an existing collection.
 * @param collection
 * @param item
 * @param query
 */
export const updateCollection =
  <Schema, const TQuery extends Query<Schema, MezaCollection<Schema>>>(
    collection: MezaCollection<Schema>["collection"],
    item: NestedPartial<MezaCollection<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateCollectionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");

    return {
      path: `/collections/${collection}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateCollectionsBatch
 * @description Update multiple collections as batch.
 * @param items
 * @param query
 */
export const updateCollectionsBatch =
  <Schema, const TQuery extends Query<Schema, MezaCollection<Schema>>>(
    items: NestedPartial<MezaCollection<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateCollectionOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/collections`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });
