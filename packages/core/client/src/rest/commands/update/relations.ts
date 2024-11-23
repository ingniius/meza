import type { MezaRelation } from "../../../schemas/relation";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateRelationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaRelation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateRelation
 * @description Update an existing relation.
 * @param collection
 * @param field
 * @param item
 * @param query
 */
export const updateRelation =
  <Schema, const TQuery extends Query<Schema, MezaRelation<Schema>>>(
    collection: MezaRelation<Schema>["collection"],
    field: MezaRelation<Schema>["field"],
    item: NestedPartial<MezaRelation<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateRelationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/relations/${collection}/${field}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
