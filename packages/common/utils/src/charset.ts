import { is } from "./assertion";

/**
 * @publicApi
 * @name extractMaxLength
 * @description Extracts the length value out of a given datatype.
 * For example: `varchar(32)` => 32
 */
export function extractMaxLength(type: string): null | number {
  const regex = /\(([^)]+)\)/;
  const matches = regex.exec(type);

  if (matches && matches.length > 0 && matches[1]) return Number(matches[1]);
  return null;
}

/**
 * @publicApi
 * @name stripQuotes
 * @description Strip leading/trailing quotes from a string and handle null values.
 */
export function stripQuotes(value?: string | null): string | null {
  if (!is(value)) return null;

  const trimmed = value.trim();
  if ((trimmed.startsWith(`'`) && trimmed.endsWith(`'`)) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1);
  }

  return value;
}

/**
 * @publicApi
 * @name extractType
 * @description Extracts the type out of a given datatype.
 * For example: `varchar(32)` => varchar
 */
export function extractType(type: string): string {
  return type.replace(/[^a-zA-Z]/g, "").toLowerCase();
}
