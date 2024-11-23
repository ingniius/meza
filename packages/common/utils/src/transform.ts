import { str } from "./assertion";

/**
 * @name processChunk
 * @param arr
 * @param size
 * @param callback
 */
export async function processChunk<T = unknown>(arr: T[], size: number, callback: (chunk: T[]) => Promise<void>) {
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    await callback(chunk);
  }
}

/**
 * @name toArray
 * @param value
 */
export function toArray<T = any>(value: T | T[]): T[] {
  if (str(value)) return value.split(",") as unknown as T[];
  return Array.isArray(value) ? value : [value];
}

/**
 * @name toBoolean
 * @description Convert environment variable to Boolean.
 * @param value
 */
export function toBoolean(value: any): boolean {
  return value === "true" || value === true || value === "1" || value === 1;
}
