import type { MezaField } from "../../../schemas/field";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateFieldOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaField<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateField
 * @description Updates the given field in the given collection.
 * @param collection
 * @param field
 * @param item
 * @param query
 */
export const updateField =
  <Schema, const TQuery extends Query<Schema, MezaField<Schema>>>(
    collection: MezaField<Schema>["collection"],
    field: MezaField<Schema>["field"],
    item: NestedPartial<MezaField<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFieldOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(collection, "Keys cannot be empty");
    throwIfEmpty(field, "Field cannot be empty");

    return {
      path: `/fields/${collection}/${field}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
