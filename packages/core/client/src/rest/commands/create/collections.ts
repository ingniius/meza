import type { MezaCollection } from "../../../schemas/collection";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateCollectionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaCollection<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createCollection
 * @description Create a new Collection. This will create a new table in the database as well.
 * @param item This endpoint doesn't currently support any query parameters
 * @param query Optional return data query
 */
export const createCollection =
  <Schema, const TQuery extends Query<Schema, MezaCollection<Schema>>>(
    item: NestedPartial<MezaCollection<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateCollectionOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/collections`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
