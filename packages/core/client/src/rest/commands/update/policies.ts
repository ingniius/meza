import type { MezaPolicy } from "../../../schemas/policy";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdatePolicyOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPolicy<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updatePreset
 * @description Update multiple existing policies.
 * @param keys
 * @param item
 * @param query
 */
export const updatePolicies =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    keys: MezaPolicy<Schema>["id"][],
    item: Partial<MezaPolicy<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePolicyOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/policies`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updatePoliciesBatch
 * @description Update multiple policies as batch.
 * @param items
 * @param query
 */
export const updatePoliciesBatch =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    items: NestedPartial<MezaPolicy<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdatePolicyOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/policies`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updatePolicy
 * @description Update an existing policy.
 * @param key
 * @param item
 * @param query
 */
export const updatePolicy =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    key: MezaPolicy<Schema>["id"],
    item: Partial<MezaPolicy<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePolicyOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/policies/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
