import { RelationMeta } from "../../types";
import systemData from "./relations.yaml";

/**
 * @publicApi
 * @name systemRelationRows
 */
export const systemRelationRows = (systemData["data"] as RelationMeta[]).map(
  (row) =>
    ({
      ...(systemData["defaults"] as Partial<RelationMeta>),
      ...row,
      system: true,
    }) as RelationMeta,
);
