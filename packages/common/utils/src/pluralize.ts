import type { Plural } from "@azem/types/util";

export function pluralize<T extends string>(str: T): Plural<T> {
  return `${str}s`;
}

export function depluralize<T extends string>(str: Plural<T>): T {
  return str.slice(0, -1) as T;
}
