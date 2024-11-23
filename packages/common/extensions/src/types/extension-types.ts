import type { ExtensionSandboxOptions, SplitEntrypoint } from "../schemas";
import type {
  API_EXTENSION_TYPES,
  APP_EXTENSION_TYPES,
  BUNDLE_EXTENSION_TYPES,
  EXTENSION_TYPES,
  HYBRID_EXTENSION_TYPES,
  NESTED_EXTENSION_TYPES,
} from "../tokens";

/**
 * @publicApi
 */
export type AppExtensionType = (typeof APP_EXTENSION_TYPES)[number];

/**
 * @publicApi
 */
export type ApiExtensionType = (typeof API_EXTENSION_TYPES)[number];

/**
 * @publicApi
 */
export type HybridExtensionType = (typeof HYBRID_EXTENSION_TYPES)[number];

/**
 * @publicApi
 */
export type BundleExtensionType = (typeof BUNDLE_EXTENSION_TYPES)[number];

/**
 * @publicApi
 */
export type NestedExtensionType = (typeof NESTED_EXTENSION_TYPES)[number];

/**
 * @publicApi
 */
export type ExtensionType = (typeof EXTENSION_TYPES)[number];

/**
 * @private
 */
type ExtensionBase = {
  path: string;
  name: string;
  local: boolean;
  version?: string;
  host?: string;
};

/**
 * @publicApi
 */
export type ApiExtension = ExtensionBase & {
  type: ApiExtensionType;
  entrypoint: string;
  sandbox?: ExtensionSandboxOptions;
};

/**
 * @publicApi
 */
export type AppExtension = ExtensionBase & {
  type: AppExtensionType;
  entrypoint: string;
};

/**
 * @publicApi
 */
export type HybridExtension = ExtensionBase & {
  type: HybridExtensionType;
  entrypoint: SplitEntrypoint;
  sandbox?: ExtensionSandboxOptions;
};

/**
 * @publicApi
 */
export interface BundleExtensionEntry {
  name: string;
  type: AppExtensionType | ApiExtensionType | HybridExtensionType;
}

/**
 * @publicApi
 */
export type BundleExtension = ExtensionBase & {
  type: BundleExtensionType;
  partial: boolean | undefined;
  entrypoint: SplitEntrypoint;
  entries: BundleExtensionEntry[];
};

/**
 * @publicApi
 */
export type Extension = AppExtension | ApiExtension | HybridExtension | BundleExtension;
