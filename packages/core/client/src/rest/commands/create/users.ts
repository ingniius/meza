import type { MezaUser } from "../../../schemas/user";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateUserOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaUser<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createUsers
 * @description Create multiple new users.
 * @param items The items to create
 * @param query Optional return data query
 */
export const createUsers =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    items: Partial<MezaUser<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateUserOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/users`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createUser
 * @description Create a new user.
 * @param item The user to create
 * @param query Optional return data query
 */
export const createUser =
  <Schema, const TQuery extends Query<Schema, MezaUser<Schema>>>(
    item: Partial<MezaUser<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateUserOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/users`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
