/**
 * @publicApi
 * @name API_EXTENSION_TYPES
 */
export const API_EXTENSION_TYPES = ["hook", "endpoint"] as const;

/**
 * @publicApi
 * @name APP_EXTENSION_TYPES
 */
export const APP_EXTENSION_TYPES = ["interface", "display", "layout", "module", "panel", "theme"] as const;

/**
 * @publicApi
 * @name HYBRID_EXTENSION_TYPES
 */
export const HYBRID_EXTENSION_TYPES = ["operation"] as const;

/**
 * @publicApi
 * @name BUNDLE_EXTENSION_TYPES
 */
export const BUNDLE_EXTENSION_TYPES = ["bundle"] as const;

/**
 * @publicApi
 * @name EXTENSION_TYPES
 */
export const EXTENSION_TYPES = [
  ...APP_EXTENSION_TYPES,
  ...API_EXTENSION_TYPES,
  ...HYBRID_EXTENSION_TYPES,
  ...BUNDLE_EXTENSION_TYPES,
] as const;

/**
 * @publicApi
 * @name NESTED_EXTENSION_TYPES
 */
export const NESTED_EXTENSION_TYPES = [
  ...APP_EXTENSION_TYPES,
  ...API_EXTENSION_TYPES,
  ...HYBRID_EXTENSION_TYPES,
] as const;

/**
 * @publicApi
 * @name APP_OR_HYBRID_EXTENSION_TYPES
 */
export const APP_OR_HYBRID_EXTENSION_TYPES = [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES] as const;

/**
 * @publicApi
 * @name APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES
 */
export const APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES = [
  ...APP_OR_HYBRID_EXTENSION_TYPES,
  ...BUNDLE_EXTENSION_TYPES,
] as const;
