import type { Knex } from "knex";

import type { Accountability } from "./accountability";
import type { PromiseCallback } from "./generic";
import type { Dict } from "./generic";
import type { Overview } from "./schema";

/**
 * @publicApi
 */
export type ActionHandler = (meta: Dict<string, any>, context: EventContext) => void;

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
export type FilterHandler<T = unknown> = (payload: T, meta: Dict<string, any>, context: EventContext) => T | Promise<T>;

/**
 * @publicApi
 */
export type InitHandler = (meta: Dict<string, any>) => void;

/**
 * @publicApi
 */
export type ScheduleHandler = PromiseCallback;
