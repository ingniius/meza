import type { MergeCoreCollection } from "../index";

/**
 * @publicApi
 */
export type MezaExtension<Schema = any> = {
  name: string;
  bundle: string | null;
  schema: ExtensionSchema | null;
  meta: MergeCoreCollection<Schema, "meza_extensions", { enabled: boolean }>;
};

/**
 * @publicApi
 */
export type ExtensionSchema = {
  type: ExtensionTypes;
  local: boolean;
  version?: string;
};

/**
 * @publicApi
 */
export type ExtensionTypes =
  | "interface"
  | "display"
  | "layout"
  | "module"
  | "panel"
  | "hook"
  | "endpoint"
  | "operation"
  | "bundle";
