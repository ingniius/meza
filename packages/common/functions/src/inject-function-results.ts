import { REGEX_BETWEEN_PARENS } from "@azem/tokens/regex";
import type { FieldFunction } from "@azem/types/field";
import type { Filter } from "@azem/types/filter";
import type { Dict } from "@azem/types/util";
import { cloneDeep, get, isPlainObject, set } from "@azem/utils/lodash";

import { functions } from "./date-fn";

/**
 * @publicApi
 * @name injectFunctionResults
 * @description Inject function output fields into a given payload for accurate validation.
 * @param payload Any data payload
 * @param filter A single level filter rule to verify against
 * @example
 * ```js
 * const input = { date: '2022-03-29T11:37:56Z' };
 * const filter = { 'year(date)': { _eq: 2022 }}
 * const output = applyFunctions(input, filter);
 * // { date: '2022-03-29T11:37:56Z', 'year(date)': 2022 }
 * ```
 */
export function injectFunctionResults(payload: Dict, filter: Filter) {
  const newInput = cloneDeep(payload);
  processFilterLevel(filter);
  return newInput;

  function processFilterLevel(filter: Filter, parentPath?: string) {
    for (const [key, value] of Object.entries(filter)) {
      const path = parentPath ? parentPath + "." + key : key;

      if (key.startsWith("_") === false && isPlainObject(value)) {
        processFilterLevel(value, path);
      }

      if (key.includes("(") && key.includes(")")) {
        const functionName = key.split("(")[0] as FieldFunction;
        const fieldKey = key.match(REGEX_BETWEEN_PARENS)?.[1];
        if (!fieldKey || !functionName) continue;
        const currentValuePath = parentPath ? parentPath + "." + fieldKey : fieldKey;
        const currentValue = get(newInput, currentValuePath);
        set(newInput, path, functions[functionName](currentValue));
      }
    }
  }
}
