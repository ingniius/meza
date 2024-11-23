import { DataPermission, Permission } from "../types";
import permissions from "./app-access-permissions.yaml";
import schemaPermissionsRaw from "./schema-access-permissions.yaml";

/**
 * @private
 */
const defaults: Partial<Permission> = {
  policy: null,
  permissions: {},
  validation: null,
  presets: null,
  fields: ["*"],
  system: true,
};

/**
 * @publicApi
 * @name schemaPermissions
 */
export const schemaPermissions = (schemaPermissionsRaw as unknown as DataPermission[]).map(
  (row) => ({ ...defaults, ...row }) as Permission,
);

/**
 * @publicApi
 * @name appAccessMinimalPermissions
 */
export const appAccessMinimalPermissions = [...schemaPermissions, ...(permissions as unknown as DataPermission[])].map(
  (row) => ({ ...defaults, ...row }) as Permission,
);
