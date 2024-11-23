import type { AllCollections } from "../../../index";
import type { AggregationOptions, AggregationOutput } from "../../../types/aggregate";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";
import { isSystemCollection } from "../../utils/is-system-collection";

/**
 * @publicApi
 * @name aggregate
 * @description Aggregate allow you to perform calculations on a set of values, returning a single result.
 * @param collection The collection to aggregate
 * @param options The aggregation options
 */
export const aggregate =
  <Schema, Collection extends AllCollections<Schema>, Options extends AggregationOptions<Schema, Collection>>(
    collection: Collection,
    options: Options,
  ): RestCommand<AggregationOutput<Schema, Collection, Options>, Schema> =>
  () => {
    const collectionName = String(collection);
    throwIfEmpty(collectionName, "Collection cannot be empty");

    const path = isSystemCollection(collectionName) ? `/${collectionName.substring(9)}` : `/items/${collectionName}`;

    return {
      path,
      method: "GET",
      params: {
        ...(options.query ?? {}),
        ...(options.groupBy ? { groupBy: options.groupBy } : {}),
        aggregate: options.aggregate,
      },
    };
  };
