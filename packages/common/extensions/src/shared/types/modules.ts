import type { RouteRecordRaw } from "vue-router";

import type { CollectionAccess } from "@azem/types/permission";
import type { User } from "@azem/types/user";

/**
 * @publicApi
 */
export interface ModuleConfig {
  id: string;
  name: string;
  icon: string;

  routes: RouteRecordRaw[];
  hidden?: boolean;
  preRegisterCheck?: (user: AppUser, permissions: CollectionAccess) => Promise<boolean> | boolean;
}

/**
 * @private
 */
type AppUser = User & { app_access: boolean; admin_access: boolean };
