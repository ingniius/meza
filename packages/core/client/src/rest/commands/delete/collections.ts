import type { MezaCollection } from "../../../schemas/collection";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name deleteCollection
 * @description Delete a collection.
 * @param collection
 */
export const deleteCollection =
  <Schema>(collection: MezaCollection<Schema>["collection"]): RestCommand<void, Schema> =>
  () => ({
    path: `/collections/${collection}`,
    method: "DELETE",
  });
