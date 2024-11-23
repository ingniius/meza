/**
 * @publicApi
 * @name parseJSON
 * @param input
 */
export function isValidJSON(input: string) {
  try {
    parseJSON(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * @publicApi
 * @name noproto
 * @param key
 * @param value
 */
export function noproto<T>(key: string, value: T): T | void {
  if (key !== "__proto__") return value;
}

/**
 * @publicApi
 * @name parseJSON
 * @param input
 */
export function parseJSON(input: string): any {
  if (String(input).includes("__proto__")) return JSON.parse(input, noproto);
  return JSON.parse(input);
}
