import type { MezaField } from "../../../schemas/field";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateFieldOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaField<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createField
 * @description Create a new field in the given collection.
 * @param collection The collection to create a field for
 * @param item The field to create
 * @param query Optional return data query
 */
export const createField =
  <Schema, const TQuery extends Query<Schema, MezaField<Schema>>>(
    collection: keyof Schema,
    item: NestedPartial<MezaField<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateFieldOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/fields/${collection as string}`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
