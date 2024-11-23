/**
 * @publicApi
 */
export type ClientFilterOperator =
  | FilterOperator
  | "starts_with"
  | "nstarts_with"
  | "istarts_with"
  | "nistarts_with"
  | "ends_with"
  | "nends_with"
  | "iends_with"
  | "niends_with"
  | "regex";

/**
 * @publicApi
 */
export type FieldFilter = {
  [field: string]: FieldFilterOperator | FieldValidationOperator | FieldFilter;
};

/**
 * @publicApi
 */
export type FieldFilterOperator = {
  _eq?: string | number | boolean | null;
  _neq?: string | number | boolean | null;
  _lt?: string | number;
  _lte?: string | number;
  _gt?: string | number;
  _gte?: string | number;
  _in?: (string | number)[];
  _nin?: (string | number)[];
  _null?: boolean;
  _nnull?: boolean;
  _contains?: string;
  _ncontains?: string;
  _icontains?: string;
  _starts_with?: string;
  _nstarts_with?: string;
  _istarts_with?: string;
  _nistarts_with?: string;
  _ends_with?: string;
  _nends_with?: string;
  _iends_with?: string;
  _niends_with?: string;
  _between?: (string | number)[];
  _nbetween?: (string | number)[];
  _empty?: boolean;
  _nempty?: boolean;
  _intersects?: string;
  _nintersects?: string;
  _intersects_bbox?: string;
  _nintersects_bbox?: string;
};

/**
 * @publicApi
 */
export type FieldValidationOperator = {
  _submitted?: boolean;
  _regex?: string;
};

/**
 * @publicApi
 */
export type Filter = LogicalFilter | FieldFilter;

/**
 * @publicApi
 */
export type FilterOperator =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "in"
  | "nin"
  | "null"
  | "nnull"
  | "contains"
  | "ncontains"
  | "icontains"
  | "between"
  | "nbetween"
  | "empty"
  | "nempty"
  | "intersects"
  | "nintersects"
  | "intersects_bbox"
  | "nintersects_bbox";

/**
 * @publicApi
 */
export type LogicalFilter = LogicalFilterOR | LogicalFilterAND;

/**
 * @publicApi
 */
export type LogicalFilterAND = { _and: Filter[] };

/**
 * @publicApi
 */
export type LogicalFilterOR = { _or: Filter[] };
