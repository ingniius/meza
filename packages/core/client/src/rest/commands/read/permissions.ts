import type { MezaPermission } from "../../../schemas/permission";
import type { AllCollections, ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadItemPermissionsOutput = {
  update: { access: boolean; presets?: Record<string, any> | null; fields?: string[] | null };
  delete: { access: boolean };
  share: { access: boolean };
};

/**
 * @publicApi
 */
export type ReadPermissionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPermission<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 */
export type ReadUserPermissionsOutput = Record<
  string,
  Record<
    "create" | "update" | "delete" | "read" | "share",
    {
      access: "none" | "partial" | "full";
      fields?: string[];
      presets?: Record<string, any>;
    }
  >
>;

/**
 * @publicApi
 * @name readPermissions
 * @description List all Permissions that exist in Meza.
 * @param query The query parameters
 */
export const readPermissions =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadPermissionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/permissions`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readPermission
 * @description List all Permissions that exist in Meza.
 * @param key The primary key of the permission
 * @param query The query parameters
 */
export const readPermission =
  <Schema, const TQuery extends Query<Schema, MezaPermission<Schema>>>(
    key: MezaPermission<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadPermissionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/permissions/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readItemPermissions
 * @description Check the current user's permissions on a specific item.
 * @param collection The collection of the item
 * @param key The primary key of the item
 */
export const readItemPermissions =
  <Schema, Collection extends AllCollections<Schema>>(
    collection: Collection,
    key?: string | number,
  ): RestCommand<ReadItemPermissionsOutput, Schema> =>
  () => {
    throwIfEmpty(String(collection), "Collection cannot be empty");

    const item = key ? `${collection as string}/${key}` : `${collection as string}`;

    return {
      path: `/permissions/me/${item}`,
      method: "GET",
    };
  };

/**
 * @publicApi
 * @name readUserPermissions
 * @description Check the current user's permissions.
 */
export const readUserPermissions =
  <Schema>(): RestCommand<ReadUserPermissionsOutput, Schema> =>
  () => ({
    path: `/permissions/me`,
    method: "GET",
  });
