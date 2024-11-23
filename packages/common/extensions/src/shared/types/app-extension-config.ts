// import type { Theme } from '@azem/themes';
import type { DisplayConfig } from "./displays";
import type { InterfaceConfig } from "./interfaces";
import type { LayoutConfig } from "./layouts";
import type { ModuleConfig } from "./modules";
import type { OperationAppConfig } from "./operations";
import type { PanelConfig } from "./panels";

/**
 * @publicApi
 */
export type AppExtensionConfigs = {
  interfaces: InterfaceConfig[];
  displays: DisplayConfig[];
  layouts: LayoutConfig[];
  modules: ModuleConfig[];
  panels: PanelConfig[];
  /** @NOTE themes: Theme[]; */
  operations: OperationAppConfig[];
};
