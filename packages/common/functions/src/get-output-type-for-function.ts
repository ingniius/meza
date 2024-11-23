import type { FieldFunction, Type } from "@azem/types/field";
import type { Dict } from "@azem/types/util";

/**
 * @publicApi
 * @name getOutputTypeForFunction
 * @param type
 */
export function getOutputTypeForFunction(fn: FieldFunction): Type {
  const typeMap: Dict<FieldFunction, Type> = {
    year: "integer",
    month: "integer",
    week: "integer",
    day: "integer",
    weekday: "integer",
    hour: "integer",
    minute: "integer",
    second: "integer",
    count: "integer",
  };

  return typeMap[fn];
}
