import { PERMISSION_ACTIONS } from "@azem/tokens/permission";

import type { Filter } from "./filter";
import type { Dict } from "./util";

/**
 * @publicApi
 */
export type CollectionAccess = {
  [collection: string]: CollectionPermissions;
};

/**
 * @publicApi
 */
export type CollectionPermissions = {
  [action in PermissionsAction]: {
    access: "none" | "partial" | "full";
    fields?: string[];
    presets?: Dict;
  };
};

/**
 * @publicApi
 */
export type ItemPermissions = {
  update: { access: boolean; presets?: Permission["presets"]; fields?: Permission["fields"] };
  delete: { access: boolean };
  share: { access: boolean };
};

/**
 * @publicApi
 */
export type Permission = {
  id?: number;
  policy: string | null;
  collection: string;
  action: PermissionsAction;
  permissions: Filter | null;
  validation: Filter | null;
  presets: Dict | null;
  fields: string[] | null;
  system?: true;
};

/**
 * @publicApi
 */
export type PermissionsAction = (typeof PERMISSION_ACTIONS)[number];
