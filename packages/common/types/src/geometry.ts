import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "geojson";

import type { GeometryFormat, GeometryType } from "./field";

/**
 * @publicApi
 */
export type AllGeoJSON = Geometry & GeometryCollection & Feature & FeatureCollection;

/**
 * @publicApi
 */
export type AnyGeometry = Geometry | GeometryCollection;

/**
 * @publicApi
 */
export type Coordinate = [number, number];

/**
 * @publicApi
 */
export type GeoJSONParser = (entry: any) => AnyGeometry | undefined;

/**
 * @publicApi
 */
export type GeoJSONSerializer = (entry: AllGeoJSON) => any;

/**
 * @publicApi
 */
export type GeometryOptions = {
  geometryField: string;
  geometryFormat: GeometryFormat;
  geometryType?: GeometryType;
};

/**
 * @publicApi
 */
export type MultiGeometry = MultiPoint | MultiPolygon | MultiLineString;

/**
 * @publicApi
 */
export type SimpleGeometry = Point | Polygon | LineString;
