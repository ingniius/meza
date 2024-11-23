import type { ActionHandler, EmbedHandler, FilterHandler, InitHandler, ScheduleHandler } from "@azem/types/event";

import type { ApiExtensionContext } from "./api-extension-context";

/**
 * @publicApi
 */
export type HookConfig = (register: RegisterFunctions, context: HookExtensionContext) => void;

/**
 * @publicApi
 */
export type HookExtensionContext = ApiExtensionContext & {
  emitter: any;
};

/**
 * @publicApi
 */
export type RegisterFunctions = {
  filter: <T = unknown>(event: string, handler: FilterHandler<T>) => void;
  action: (event: string, handler: ActionHandler) => void;
  init: (event: string, handler: InitHandler) => void;
  schedule: (cron: string, handler: ScheduleHandler) => void;
  embed: (position: "head" | "body", code: string | EmbedHandler) => void;
};
