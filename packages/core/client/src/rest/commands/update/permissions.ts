import type { MezaPermission } from "../../../schemas/permission";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdatePermissionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPermission<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updatePermissions
 * @description Update multiple existing permissions rules.
 * @param keys
 * @param item
 * @param query
 */
export const updatePermissions =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    keys: MezaPermission<Schema>["id"][],
    item: Partial<MezaPermission<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePermissionOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/permissions`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updatePermissionsBatch
 * @description Update multiple permissions rules as batch.
 * @param items
 * @param query
 */
export const updatePermissionsBatch =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    items: NestedPartial<MezaPermission<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdatePermissionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/permissions`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updatePermission
 * @description Update an existing permissions rule.
 * @param key
 * @param item
 * @param query
 */
export const updatePermission =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    key: MezaPermission<Schema>["id"],
    item: Partial<MezaPermission<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePermissionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/permissions/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
