/**
 * @publicApi
 */
export interface ExtensionSettings {
  id: string;
  source: "module" | "registry" | "local";
  enabled: boolean;
  bundle: string | null;
  folder: string;
  // options: Dict<string, unknown> | null;
  // permissions: Dict<string, unknown> | null;
}
