import type { MezaPolicy } from "../../../schemas/policy";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadPolicyGlobalsOutput = {
  app_access: boolean;
  admin_access: boolean;
  enforce_tfa: boolean;
};

/**
 * @publicApi
 */
export type ReadPolicyOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPolicy<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readPolicies
 * @description List all policies that exist in the project.
 * @param query The query parameters
 */
export const readPolicies =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadPolicyOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/policies`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readPolicy
 * @description Read a specific policy.
 * @param key The primary key of the permission
 * @param query The query parameters
 */
export const readPolicy =
  <Schema, const TQuery extends Query<Schema, MezaPolicy<Schema>>>(
    key: MezaPolicy<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadPolicyOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/policies/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readPolicyGlobals
 * @description Check the current user's policy globals.
 */
export const readPolicyGlobals =
  <Schema>(): RestCommand<ReadPolicyGlobalsOutput, Schema> =>
  () => ({
    path: `/policies/me/globals`,
    method: "GET",
  });
