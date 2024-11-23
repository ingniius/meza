import type { Dict, Prettify } from "@azem/types/util";

import type {
  DisplayConfig,
  EndpointConfig,
  HookConfig,
  InterfaceConfig,
  LayoutConfig,
  ModuleConfig,
  OperationApiConfig,
  OperationAppConfig,
  PanelConfig,
} from "./types";

/**
 * @private
 */
type CustomConfig<T extends object> = { [K in string]: K extends keyof T ? never : unknown };

/**
 * @private
 */
type ExtendedConfig<T extends object, C> = Prettify<T & Omit<C, keyof T>>;

/**
 * @publicApi
 * @name defineDisplay
 * @param config
 */
export function defineDisplay<Custom extends CustomConfig<DisplayConfig>>(
  config: ExtendedConfig<DisplayConfig, Custom>,
): ExtendedConfig<DisplayConfig, Custom> {
  return config;
}

/**
 * @publicApi
 * @name defineEndpoint
 * @param config
 */
export function defineEndpoint(config: EndpointConfig): EndpointConfig {
  return config;
}

/**
 * @publicApi
 * @name defineHook
 * @param config
 */
export function defineHook(config: HookConfig): HookConfig {
  return config;
}

/**
 * @publicApi
 * @name defineInterface
 * @param config
 */
export function defineInterface<Custom extends CustomConfig<InterfaceConfig>>(
  config: ExtendedConfig<InterfaceConfig, Custom>,
): ExtendedConfig<InterfaceConfig, Custom> {
  return config;
}

/**
 * @publicApi
 * @name defineLayout
 * @param config
 */
export function defineLayout<Options = any, Query = any>(
  config: LayoutConfig<Options, Query>,
): LayoutConfig<Options, Query> {
  return config;
}

/**
 * @publicApi
 * @name defineModule
 * @param config
 */
export function defineModule<Custom extends CustomConfig<ModuleConfig>>(
  config: ExtendedConfig<ModuleConfig, Custom>,
): ExtendedConfig<ModuleConfig, Custom> {
  return config;
}

/**
 * @publicApi
 * @name definePanel
 * @param config
 */
export function definePanel<Custom extends CustomConfig<PanelConfig>>(
  config: ExtendedConfig<PanelConfig, Custom>,
): ExtendedConfig<PanelConfig, Custom> {
  return config;
}

/**
 * @publicApi
 * @name defineOperationApi
 * @param config
 */
export function defineOperationApi<Options = Dict<string, unknown>>(
  config: OperationApiConfig<Options>,
): OperationApiConfig<Options> {
  return config;
}

/**
 * @publicApi
 * @name defineOperationApp
 * @param config
 */
export function defineOperationApp<Custom extends CustomConfig<OperationAppConfig>>(
  config: ExtendedConfig<OperationAppConfig, Custom>,
): ExtendedConfig<OperationAppConfig, Custom> {
  return config;
}
