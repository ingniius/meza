import type { MezaField } from "../../../schemas/field";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteField
 * @description Deletes the given field in the given collection.
 * @param collection
 * @param field
 */
export const deleteField =
  <Schema>(collection: MezaField<Schema>["collection"], field: MezaField<Schema>["field"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/fields/${collection}/${field}`,
      method: "DELETE",
    };
  };
