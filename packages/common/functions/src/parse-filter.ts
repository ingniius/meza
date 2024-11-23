import { REGEX_BETWEEN_PARENS } from "@azem/tokens/regex";
import type { Accountability } from "@azem/types/accountability";
import type { Filter } from "@azem/types/filter";
import type { Policy } from "@azem/types/policy";
import type { Role, User } from "@azem/types/user";
import type { Dict } from "@azem/types/util";
import { obj } from "@azem/utils/assertion";
import { parseJSON } from "@azem/utils/json";
import { isObjectLike } from "@azem/utils/lodash";
import { toArray } from "@azem/utils/transform";

import { adjustDate } from "./adjust-date";
import { deepMap } from "./deep-map";
import { get } from "./get-with-array";
import { isDynamicVariable } from "./is-dynamic-variable";

/**
 * @private
 */
type ParseFilterContext = {
  // The user can add any custom fields to any of them
  $CURRENT_USER?: User & Dict;
  $CURRENT_ROLE?: Role & Dict;
  $CURRENT_ROLES?: (Role & Dict)[];
  $CURRENT_POLICIES?: (Policy & Dict)[];
};

/**
 * @private
 */
type BasicAccountability = Pick<Accountability, "user" | "role" | "roles">;

/**
 * @publicApi
 * @name parseFilter
 * @param filter
 * @param accountability
 * @param context
 */
export function parseFilter(
  filter: Filter | null,
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext = {},
): Filter | null {
  let parsedFilter = parseFilterRecursive(filter, accountability, context);

  if (parsedFilter) {
    parsedFilter = shiftLogicalOperatorsUp(parsedFilter);
  }

  return parsedFilter;
}

/**
 * @private
 */
function parseFilterRecursive(
  filter: Filter | null,
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext = {},
): Filter | null {
  if (filter === null || filter === undefined) return null;

  if (!isObjectLike(filter)) return { _eq: parseFilterValue(filter, accountability, context) };
  const filters = Object.entries(filter).map((entry) => parseFilterEntry(entry, accountability, context));

  if (filters.length === 0) {
    return {};
  } else if (filters.length === 1) {
    return filters[0] ?? null;
  } else {
    return { _and: filters };
  }
}

/**
 * @private
 */
function parseDynamicVariable(
  value: any,
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext,
) {
  if (value.startsWith("$NOW")) {
    if (value.includes("(") && value.includes(")")) {
      const adjustment = value.match(REGEX_BETWEEN_PARENS)?.[1];
      if (!adjustment) return new Date();
      return adjustDate(new Date(), adjustment);
    }
    return new Date();
  }

  if (value.startsWith("$CURRENT_USER")) {
    if (value === "$CURRENT_USER") return accountability?.user ?? null;
    return get(context, value, null);
  }

  if (value.startsWith("$CURRENT_ROLES")) {
    if (value === "$CURRENT_ROLES") return accountability?.roles ?? null;
    return get(context, value, null);
  }

  if (value.startsWith("$CURRENT_ROLE")) {
    if (value === "$CURRENT_ROLE") return accountability?.role ?? null;
    return get(context, value, null);
  }

  if (value.startsWith("$CURRENT_POLICIES")) {
    if (value === "$CURRENT_POLICIES")
      return (get(context, value, null) as Policy[] | null)?.map(({ id }) => id) ?? null;
    return get(context, value, null);
  }
}

/**
 * @private
 */
function parseFilterEntry(
  [key, value]: [string, any],
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext,
): Filter {
  if (["_or", "_and"].includes(String(key))) {
    return { [key]: value.map((filter: Filter) => parseFilterRecursive(filter, accountability, context)) };
  } else if (["_in", "_nin", "_between", "_nbetween"].includes(String(key))) {
    // When array indices are above 20 (default value),
    // the query parser (qs) parses them as a key-value pair object instead of an array,
    // so we will need to convert them back to an array
    const val = obj(value) ? Object.values(value) : value;
    return { [key]: toArray(val).flatMap((value) => parseFilterValue(value, accountability, context)) } as Filter;
  } else if (["_intersects", "_nintersects", "_intersects_bbox", "_nintersects_bbox"].includes(String(key))) {
    // Geometry filters always expect to operate against a GeoJSON object. Parse the
    // value to JSON in case a stringified JSON blob is passed
    return { [key]: parseFilterValue(typeof value === "string" ? parseJSON(value) : value, accountability, context) };
  } else if (String(key).startsWith("_") && !bypassOperators.includes(key)) {
    return { [key]: parseFilterValue(value, accountability, context) };
  } else if (String(key).startsWith("item__") && isObjectLike(value)) {
    return { [`item:${String(key).split("item__")[1]}`]: parseFilter(value, accountability, context) } as Filter;
  } else {
    return { [key]: parseFilterRecursive(value, accountability, context) } as Filter;
  }
}

/**
 * @private
 */
function parseFilterValue(
  value: any,
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext,
) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null" || value === "NULL") return null;
  if (isDynamicVariable(value)) return parseDynamicVariable(value, accountability, context);
  return value;
}

/**
 * @publicApi
 * @name parsePreset
 * @param preset
 * @param accountability
 * @param context
 */
export function parsePreset(
  preset: Dict | null,
  accountability: Partial<BasicAccountability> | null,
  context: ParseFilterContext,
) {
  if (!preset) return preset;
  return deepMap(preset, (value) => parseFilterValue(value, accountability, context));
}

const logicalFilterOperators = ["_and", "_or"];
const bypassOperators = ["_none", "_some"];

/**
 * @private
 */
function shiftLogicalOperatorsUp(filter: any): any {
  const key = Object.keys(filter)[0];
  if (!key) return filter;

  if (logicalFilterOperators.includes(key)) {
    for (const childKey of Object.keys(filter[key])) {
      filter[key][childKey] = shiftLogicalOperatorsUp(filter[key][childKey]);
    }

    return filter;
  } else if (key.startsWith("_")) {
    return filter;
  } else {
    const childKey = Object.keys(filter[key])[0];
    if (!childKey) return filter;

    if (logicalFilterOperators.includes(childKey)) {
      return {
        [childKey]: toArray(filter[key][childKey]).map((childFilter) => {
          return { [key]: shiftLogicalOperatorsUp(childFilter) };
        }),
      };
    } else if (bypassOperators.includes(childKey)) {
      return { [key]: { [childKey]: shiftLogicalOperatorsUp(filter[key][childKey]) } };
    } else if (childKey.startsWith("_")) {
      return filter;
    } else {
      return { [key]: shiftLogicalOperatorsUp(filter[key]) };
    }
  }
}
