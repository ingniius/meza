import type { MezaRelation } from "../../../schemas/relation";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteRoles
 * @description Delete an existing relation.
 * @param collection
 * @param field
 */
export const deleteRelation =
  <Schema>(
    collection: MezaRelation<Schema>["collection"],
    field: MezaRelation<Schema>["field"],
  ): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/relations/${collection}/${field}`,
      method: "DELETE",
    };
  };
