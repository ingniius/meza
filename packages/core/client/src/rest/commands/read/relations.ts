import type { MezaRelation } from "../../../schemas/relation";
import type { ApplyQueryFields } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadRelationOutput<Schema> = ApplyQueryFields<Schema, MezaRelation<Schema>, "*">;

/**
 * @publicApi
 * @name readRelations
 * @description List all Relations that exist in Meza.
 */
export const readRelations =
  <Schema>(): RestCommand<ReadRelationOutput<Schema>[], Schema> =>
  () => ({
    path: `/relations`,
    method: "GET",
  });

/**
 *@publicApi
 * @name readRelationByCollection
 * @description List all Relations of a collection.
 * @param collection The collection
 */
export const readRelationByCollection =
  <Schema>(collection: MezaRelation<Schema>["collection"]): RestCommand<ReadRelationOutput<Schema>[], Schema> =>
  () => ({
    path: `/relations/${collection}`,
    method: "GET",
  });

/**
 * @publicApi
 * @name readRelation
 * @description List an existing Relation by collection and field name.
 * @param collection The collection
 * @param field The field
 */
export const readRelation =
  <Schema>(
    collection: MezaRelation<Schema>["collection"],
    field: MezaRelation<Schema>["field"],
  ): RestCommand<ReadRelationOutput<Schema>, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/relations/${collection}/${field}`,
      method: "GET",
    };
  };
