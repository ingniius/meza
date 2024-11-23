import type { Accountability, Dict, SchemaOverview } from "@azem/types";

import type { Knex } from "knex";
import type { Logger } from "pino";

/**
 * @publicApi
 */
export type ApiExtensionContext = {
  services: any;
  database: Knex;
  env: Dict;
  logger: Logger;
  getSchema: (options?: { accountability?: Accountability; database?: Knex }) => Promise<SchemaOverview>;
};
