import type { FieldFunction, Type } from "@azem/types/field";

/**
 * @publicApi
 * @name getFunctionsForType
 * @param type
 */
export function getFunctionsForType(type: Type): FieldFunction[] {
  switch (type) {
    case "dateTime":
    case "timestamp":
      return ["year", "month", "week", "day", "weekday", "hour", "minute", "second"];
    case "date":
      return ["year", "month", "week", "day", "weekday"];
    case "time":
      return ["hour", "minute", "second"];
    case "json":
      return ["count"];
    case "alias": // o2m/m2m/m2a
      return ["count"];
    default:
      return [];
  }
}
