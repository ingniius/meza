import type { MezaRole } from "../../../schemas/role";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateRoleOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaRole<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateRoles
 * @description Update multiple existing roles.
 * @param keys
 * @param item
 * @param query
 */
export const updateRoles =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    keys: MezaRole<Schema>["id"][],
    item: Partial<MezaRole<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateRoleOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/roles`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateRolesBatch
 * @description Update multiple roles as batch.
 * @param items
 * @param query
 */
export const updateRolesBatch =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    items: Partial<MezaRole<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateRoleOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/roles`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateRole
 * @description Update an existing role.
 * @param key
 * @param item
 * @param query
 */
export const updateRole =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    key: MezaRole<Schema>["id"],
    item: Partial<MezaRole<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateRoleOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/roles/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
