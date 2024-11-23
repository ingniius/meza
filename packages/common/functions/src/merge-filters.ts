import type { Filter, LogicalFilterAND, LogicalFilterOR } from "@azem/types/filter";

/**
 * @publicApi
 * @name mergeFilters
 * @param filterA
 * @param filterB
 * @param strategy
 */
export function mergeFilters(
  filterA: Filter | null,
  filterB: Filter | null,
  strategy: "and" | "or" = "and",
): Filter | null {
  if (!filterA) return filterB;
  if (!filterB) return filterA;

  return {
    [`_${strategy}`]: [filterA, filterB],
  } as LogicalFilterAND | LogicalFilterOR;
}
