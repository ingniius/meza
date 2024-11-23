/**
 * @publicApi
 * @name getRedactedString
 * @param key
 */
export const getRedactedString = (key?: string) => `--redacted${key ? `:${key}` : ""}--`;

/**
 * @publicApi
 * @name REDACTED_TEXT
 */
export const REDACTED_TEXT = getRedactedString();
