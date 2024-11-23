import { z } from "zod";

import { API_EXTENSION_TYPES, APP_EXTENSION_TYPES, HYBRID_EXTENSION_TYPES } from "../tokens";

/**
 * @publicApi
 * @name SplitEntrypoint
 */
export const SplitEntrypoint = z.object({
  app: z.string(),
  api: z.string(),
});

/**
 * @publicApi
 */
export type SplitEntrypoint = z.infer<typeof SplitEntrypoint>;

/**
 * @publicApi
 * @name ExtensionSandboxRequestedScopes
 */
export const ExtensionSandboxRequestedScopes = z.object({
  request: z.optional(
    z.object({
      urls: z.array(z.string()),
      methods: z.array(
        z.union([z.literal("GET"), z.literal("POST"), z.literal("PATCH"), z.literal("PUT"), z.literal("DELETE")]),
      ),
    }),
  ),
  log: z.optional(z.object({})),
  sleep: z.optional(z.object({})),
});

/**
 * @publicApi
 */
export type ExtensionSandboxRequestedScopes = z.infer<typeof ExtensionSandboxRequestedScopes>;

/**
 * @publicApi
 * @name ExtensionSandboxOptions
 */
export const ExtensionSandboxOptions = z.optional(
  z.object({
    enabled: z.boolean(),
    requestedScopes: ExtensionSandboxRequestedScopes,
  }),
);

/**
 * @publicApi
 */
export type ExtensionSandboxOptions = z.infer<typeof ExtensionSandboxOptions>;

/**
 * @publicApi
 * @name ExtensionOptionsBundleEntry
 */
export const ExtensionOptionsBundleEntry = z.union([
  z.object({
    type: z.enum(API_EXTENSION_TYPES),
    name: z.string(),
    source: z.string(),
  }),
  z.object({
    type: z.enum(APP_EXTENSION_TYPES),
    name: z.string(),
    source: z.string(),
  }),
  z.object({
    type: z.enum(HYBRID_EXTENSION_TYPES),
    name: z.string(),
    source: SplitEntrypoint,
  }),
]);

/**
 * @publicApi
 */
export type ExtensionOptionsBundleEntry = z.infer<typeof ExtensionOptionsBundleEntry>;

/**
 * @publicApi
 * @name ExtensionOptionsBase
 */
export const ExtensionOptionsBase = z.object({
  host: z.string(),
  hidden: z.boolean().optional(),
});

/**
 * @publicApi
 * @name ExtensionOptionsApp
 */
export const ExtensionOptionsApp = z.object({
  type: z.enum(APP_EXTENSION_TYPES),
  path: z.string(),
  source: z.string(),
});

/**
 * @publicApi
 * @name ExtensionOptionsApi
 */
export const ExtensionOptionsApi = z.object({
  type: z.enum(API_EXTENSION_TYPES),
  path: z.string(),
  source: z.string(),
  sandbox: ExtensionSandboxOptions,
});

/**
 * @publicApi
 * @name ExtensionOptionsHybrid
 */
export const ExtensionOptionsHybrid = z.object({
  type: z.enum(HYBRID_EXTENSION_TYPES),
  path: SplitEntrypoint,
  source: SplitEntrypoint,
  sandbox: ExtensionSandboxOptions,
});

/**
 * @publicApi
 * @name ExtensionOptionsBundle
 */
export const ExtensionOptionsBundle = z.object({
  type: z.literal("bundle"),
  partial: z.boolean().optional(),
  path: SplitEntrypoint,
  entries: z.array(ExtensionOptionsBundleEntry),
});

/**
 * @publicApi
 * @name ExtensionOptionsBundleEntries
 */
export const ExtensionOptionsBundleEntries = z.array(ExtensionOptionsBundleEntry);

/**
 * @publicApi
 */
export type ExtensionOptionsBundleEntries = z.infer<typeof ExtensionOptionsBundleEntries>;

/**
 * @publicApi
 * @name ExtensionOptions
 */
export const ExtensionOptions = ExtensionOptionsBase.and(
  z.union([ExtensionOptionsApp, ExtensionOptionsApi, ExtensionOptionsHybrid, ExtensionOptionsBundle]),
);

/**
 * @publicApi
 */
export type ExtensionOptions = z.infer<typeof ExtensionOptions>;
