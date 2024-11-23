import type { MezaActivity } from "./activity";
import type { MezaCollection } from "./collection";
import type { MezaComment } from "./comment";
import type { MezaDashboard } from "./dashboard";
import type { MezaExtension } from "./extension";
import type { MezaField } from "./field";
import type { MezaFile } from "./file";
import type { MezaFlow } from "./flow";
import type { MezaFolder } from "./folder";
import type { MezaNotification } from "./notification";
import type { MezaOperation } from "./operation";
import type { MezaPanel } from "./panel";
import type { MezaPermission } from "./permission";
import type { MezaPreset } from "./preset";
import type { MezaRelation } from "./relation";
import type { MezaRole } from "./role";
import type { MezaSettings } from "./settings";
import type { MezaShare } from "./share";
import type { MezaUser } from "./user";
import type { MezaVersion } from "./version";
import type { MezaWebhook } from "./webhook";

/**
 * @publicApi
 */
export interface CoreSchema<Schema = any> {
  meza_activity: MezaActivity<Schema>[];
  meza_collections: MezaCollection<Schema>[];
  meza_comments: MezaComment<Schema>[];
  meza_dashboards: MezaDashboard<Schema>[];
  meza_extensions: MezaExtension<Schema>[];
  meza_fields: MezaField<Schema>[];
  meza_files: MezaFile<Schema>[];
  meza_flows: MezaFlow<Schema>[];
  meza_folders: MezaFolder<Schema>[];
  meza_notifications: MezaNotification<Schema>[];
  meza_operations: MezaOperation<Schema>[];
  meza_panels: MezaPanel<Schema>[];
  meza_permissions: MezaPermission<Schema>[];
  meza_presets: MezaPreset<Schema>[];
  meza_relations: MezaRelation<Schema>[];
  meza_roles: MezaRole<Schema>[];
  meza_settings: MezaSettings<Schema>;
  meza_shares: MezaShare<Schema>[];
  meza_users: MezaUser<Schema>[];
  meza_versions: MezaVersion<Schema>[];
  meza_webhooks: MezaWebhook<Schema>[];
}
