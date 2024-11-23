import type { MezaRole } from "../../../schemas/role";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateRoleOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaRole<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createRoles
 * @description Create multiple new roles.
 * @param items The roles to create
 * @param query Optional return data query
 */
export const createRoles =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    items: Partial<MezaRole<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateRoleOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/roles`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createRole
 * @description Create a new role.
 * @param item The role to create
 * @param query Optional return data query
 */
export const createRole =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    item: Partial<MezaRole<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateRoleOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/roles`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
