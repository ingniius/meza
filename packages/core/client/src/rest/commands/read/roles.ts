import type { MezaRole } from "../../../schemas/role";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadRoleOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaRole<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readRoles
 * @description List all Roles that exist in Meza.
 * @param query The query parameters
 */
export const readRoles =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadRoleOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/roles`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readRole
 * @description List an existing Role by primary key.
 * @param key The primary key of the role
 * @param query The query parameters */
export const readRole =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    key: MezaRole<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadRoleOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/roles/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readRolesMe
 * @description List the attached roles for the current user.
 * @param query The query parameters
 */
export const readRolesMe =
  <Schema, const TQuery extends Query<Schema, MezaRole<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadRoleOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/roles/me`,
    params: query ?? {},
    method: "GET",
  });
