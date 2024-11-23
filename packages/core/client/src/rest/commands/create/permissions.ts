import type { MezaPermission } from "../../../schemas/permission";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreatePermissionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPermission<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createPermissions
 * @description Create multiple new permission rules.
 * @param items The permission rules to create
 * @param query Optional return data query
 */
export const createPermissions =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    items: Partial<MezaPermission<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreatePermissionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/permissions`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createPermission
 * @description Create a new permission rule
 * @param item The permission rule to create
 * @param query Optional return data query
 */
export const createPermission =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    item: Partial<MezaPermission<Schema>>,
    query?: TQuery,
  ): RestCommand<CreatePermissionOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/permissions`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
