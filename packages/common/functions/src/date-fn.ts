import type { FieldFunction } from "@azem/types/field";

import { getDate, getDay, getWeek, parseISO } from "date-fns";

/**
 * @publicApi
 * @name functions
 */
export const functions: Record<FieldFunction, (val: any) => any> = {
  year,
  month,
  week,
  day,
  weekday,
  hour,
  minute,
  second,
  count,
};

/**
 * @private
 * @description Extract the year from a given ISO-8601 date
 */
function year(value: string): number {
  return parseISO(value).getUTCFullYear();
}

/**
 * @private
 */
function month(value: string): number {
  // Match DB by using 1-indexed months
  return parseISO(value).getUTCMonth() + 1;
}

/**
 * @private
 */
function week(value: string): number {
  return getWeek(parseISO(value));
}

/**
 * @private
 */
function day(value: string): number {
  return getDate(parseISO(value));
}

/**
 * @private
 */
function weekday(value: string): number {
  return getDay(parseISO(value));
}

/**
 * @private
 */
function hour(value: string): number {
  return parseISO(value).getUTCHours();
}

/**
 * @private
 */
function minute(value: string): number {
  return parseISO(value).getUTCMinutes();
}

/**
 * @private
 */
function second(value: string): number {
  return parseISO(value).getUTCSeconds();
}

/**
 * @private
 */
function count(value: any): number | null {
  return Array.isArray(value) ? value.length : null;
}
