import type { MezaRelation } from "../../../schemas/relation";
import type { ApplyQueryFields, NestedPartial } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateRelationOutput<Schema, Item extends object = MezaRelation<Schema>> = ApplyQueryFields<
  Schema,
  Item,
  "*"
>;

/**
 * @publicApi
 * @name createRelation
 * @description Create a new relation.
 * @param item The relation to create
 * @param query Optional return data query
 */
export const createRelation =
  <Schema>(item: NestedPartial<MezaRelation<Schema>>): RestCommand<CreateRelationOutput<Schema>, Schema> =>
  () => ({
    path: `/relations`,
    body: JSON.stringify(item),
    method: "POST",
  });
