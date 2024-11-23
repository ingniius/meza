import type { MezaField } from "../../../schemas/field";
import type { ApplyQueryFields } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadFieldOutput<Schema, Item extends object = MezaField<Schema>> = ApplyQueryFields<Schema, Item, "*">;

/**
 * @publicApi
 * @name readFields
 * @description List the available fields.
 * @param query The query parameters
 */
export const readFields =
  <Schema>(): RestCommand<ReadFieldOutput<Schema>[], Schema> =>
  () => ({
    path: `/fields`,
    method: "GET",
  });

/**
 * @publicApi
 * @name readFieldsByCollection
 * @description List the available fields in a given collection.
 * @param collection The primary key of the field
 */
export const readFieldsByCollection =
  <Schema>(collection: MezaField<Schema>["collection"]): RestCommand<ReadFieldOutput<Schema>[], Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");

    return {
      path: `/fields/${collection}`,
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readField
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readField =
  <Schema>(
    collection: MezaField<Schema>["collection"],
    field: MezaField<Schema>["field"],
  ): RestCommand<ReadFieldOutput<Schema>, Schema> =>
  () => {
    throwIfEmpty(collection, "Collection cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/fields/${collection}/${field}`,
      method: "GET",
    };
  };
