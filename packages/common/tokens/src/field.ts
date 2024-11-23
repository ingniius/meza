/**
 * @publicApi
 * @name FUNCTIONS
 */
export const FUNCTIONS = ["year", "month", "week", "day", "weekday", "hour", "minute", "second", "count"] as const;

/**
 * @publicApi
 * @name GEOMETRY_FORMATS
 */
export const GEOMETRY_FORMATS = ["native", "geojson", "wkt", "lnglat"] as const;

/**
 * @publicApi
 * @name GEOMETRY_TYPES
 */
export const GEOMETRY_TYPES = [
  "Point",
  "LineString",
  "Polygon",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon",
] as const;

/**
 * @publicApi
 * @name KNEX_TYPES
 */
export const KNEX_TYPES = [
  "bigInteger",
  "boolean",
  "date",
  "dateTime",
  "decimal",
  "float",
  "integer",
  "json",
  "string",
  "text",
  "time",
  "timestamp",
  "binary",
  "uuid",
] as const;

/**
 * @publicApi
 * @name LOCAL_TYPES
 */
export const LOCAL_TYPES = [
  "standard",
  "file",
  "files",
  "m2o",
  "o2m",
  "m2m",
  "m2a",
  "presentation",
  "translations",
  "group",
] as const;

/**
 * @publicApi
 * @name NUMERIC_TYPES
 */
export const NUMERIC_TYPES = ["bigInteger", "decimal", "float", "integer"] as const;

/**
 * @publicApi
 * @name RELATIONAL_TYPES
 */
export const RELATIONAL_TYPES = [
  "file",
  "files",
  "m2o",
  "o2m",
  "m2m",
  "m2a",
  "presentation",
  "translations",
  "group",
] as const;

/**
 * @publicApi
 * @name TYPES
 */
export const TYPES = [
  ...KNEX_TYPES,
  "alias",
  "hash",
  "csv",
  "geometry",
  "geometry.Point",
  "geometry.LineString",
  "geometry.Polygon",
  "geometry.MultiPoint",
  "geometry.MultiLineString",
  "geometry.MultiPolygon",
  "unknown",
] as const;
