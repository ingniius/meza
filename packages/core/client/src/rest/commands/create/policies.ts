import type { MezaPolicy } from "../../../schemas/policy";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreatePolicyOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPolicy<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createPolicies
 * @description Create multiple new policies.
 * @param items The policies to create
 * @param query Optional return data query
 */
export const createPolicies =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    items: Partial<MezaPolicy<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreatePolicyOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/policies`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createPolicy
 * @description Create a new policy.
 * @param item The policy to create
 * @param query Optional return data query
 */
export const createPolicy =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    item: Partial<MezaPolicy<Schema>>,
    query?: TQuery,
  ): RestCommand<CreatePolicyOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/policies`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
