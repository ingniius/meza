import type { MezaUser } from "../../../schemas/user";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateUserOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaUser<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateUsers
 * @description Update multiple existing users.
 * @param keys The primary key of the users
 * @param item The user data to update
 * @param query Optional return data query
 */
export const updateUsers =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    keys: MezaUser<Schema>["id"][],
    item: Partial<MezaUser<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateUserOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/users`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateUsersBatch
 * @description Update multiple users as batch.
 * @param items The user data to update
 * @param query Optional return data query
 */
export const updateUsersBatch =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    items: NestedPartial<MezaUser<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateUserOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/users`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateUser
 * @description Update an existing user.
 * @param key The primary key of the user
 * @param item The user data to update
 * @param query Optional return data query
 */
export const updateUser =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    key: MezaUser<Schema>["id"],
    item: Partial<MezaUser<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateUserOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/users/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateMe
 * @description Update the authenticated user.
 * @param item The user data to update
 * @param query Optional return data query
 */
export const updateMe =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    item: Partial<MezaUser<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateUserOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/users/me`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "PATCH",
  });
