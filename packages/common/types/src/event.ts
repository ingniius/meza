import type { Knex } from "knex";

import type { Accountability } from "./accountability";
import type { Overview } from "./schema";
import type { PromiseCallback } from "./util";
import type { Dict } from "./util";

/**
 * @publicApi
 */
export type ActionHandler = (meta: Dict, context: EventContext) => void;

/**
 * @publicApi
 */
export type EventContext = {
  database: Knex;
  schema: Overview | null;
  accountability: Accountability | null;
};

/**
 * @publicApi
 */
export type EmbedHandler = () => string;

/**
 * @publicApi
 */
export type FilterHandler<T = unknown> = (payload: T, meta: Dict, context: EventContext) => T | Promise<T>;

/**
 * @publicApi
 */
export type InitHandler = (meta: Dict) => void;

/**
 * @publicApi
 */
export type ScheduleHandler = PromiseCallback;
