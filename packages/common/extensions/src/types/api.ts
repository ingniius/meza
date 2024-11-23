import type { BundleExtensionEntry, Extension } from "./extension-types";
import type { ExtensionSettings } from "./settings";

/**
 * @publicApi
 * @description The API output structure used when engaging with the /extensions endpoints.
 */
export interface ApiOutput {
  id: string;
  bundle: string | null;
  schema: Partial<Extension> | BundleExtensionEntry | null;
  meta: ExtensionSettings;
}
