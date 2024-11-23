import type { MezaUser } from "../../../schemas/user";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadUserOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaUser<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readUsers
 * @description List all users that exist in Meza.
 * @param query The query parameters
 */
export const readUsers =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadUserOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/users`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readUser
 * @description List an existing user by primary key.
 * @param key The primary key of the user
 * @param query The query parameters
 */
export const readUser =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    key: MezaUser<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadUserOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/users/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readMe
 * @description Retrieve the currently authenticated user.
 * @param query The query parameters
 */
export const readMe =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadUserOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/users/me`,
    params: query ?? {},
    method: "GET",
  });
