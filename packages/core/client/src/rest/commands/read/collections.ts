import type { MezaCollection } from "../../../schemas/collection";
import type { ApplyQueryFields } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadCollectionOutput<Schema, Item extends object = MezaCollection<Schema>> = ApplyQueryFields<
  Schema,
  Item,
  "*"
>;

/**
 * @publicApi
 * @name readCollections
 * @description List the available collections.
 */
export const readCollections =
  <Schema>(): RestCommand<ReadCollectionOutput<Schema>[], Schema> =>
  () => ({
    path: `/collections`,
    method: "GET",
  });

/**
 * @publicApi
 * @name readCollection
 * @description Retrieve a single collection by table name.
 * @param collection The collection name
 */
export const readCollection =
  <Schema>(collection: MezaCollection<Schema>["collection"]): RestCommand<ReadCollectionOutput<Schema>, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");

    return {
      path: `/collections/${collection}`,
      method: "GET",
    };
  };
