import type {
  FUNCTIONS,
  GEOMETRY_FORMATS,
  GEOMETRY_TYPES,
  LOCAL_TYPES,
  NUMERIC_TYPES,
  TYPES,
} from "@azem/tokens/field";

import type { Filter, FilterOperator } from "./filter";
import type { Column } from "./schema";
import type { DeepPartial, Dict } from "./util";

/**
 * @publicApi
 */
export type Condition = {
  name: string;
  rule: Dict;
  readonly?: boolean;
  hidden?: boolean;
  options?: Dict;
  required?: boolean;
};

/**
 * @publicApi
 */
export type GeometryType = (typeof GEOMETRY_TYPES)[number] | "GeometryCollection" | undefined;

/**
 * @publicApi
 */
export type GeometryFormat = (typeof GEOMETRY_FORMATS)[number];

/**
 * @publicApi
 */
export interface Field extends FieldRaw {
  name: string;
  children?: Field[] | null;
}

/**
 * @publicApi
 */
export type FieldFunction = (typeof FUNCTIONS)[number];

/**
 * @publicApi
 */
export type FieldMeta = {
  id: number;
  collection: string;
  field: string;
  group: string | null;
  hidden: boolean;
  interface: string | null;
  display: string | null;
  options: Dict | null;
  display_options: Dict | null;
  readonly: boolean;
  required: boolean;
  sort: number | null;
  special: string[] | null;
  translations: Translations[] | null;
  width: Width | null;
  note: string | null;
  conditions: Condition[] | null;
  validation: Filter | null;
  validation_message: string | null;
  system?: true;
};

/**
 * @publicApi
 */
export interface FieldRaw {
  collection: string;
  field: string;
  type: Type;
  schema: Column | null;
  meta: FieldMeta | null;
}

/**
 * @publicApi
 */
export type LocalType = (typeof LOCAL_TYPES)[number];

/**
 * @publicApi
 */
export type NumericValue = number | bigint;

/**
 * @publicApi
 */
export type NumericType = (typeof NUMERIC_TYPES)[number];

/**
 * @publicApi
 */
export type RawField = DeepPartial<Field> & { field: string; type: Type };

/**
 * @publicApi
 */
export type Type = (typeof TYPES)[number];

/**
 * @publicApi
 */
export type ValidationError = {
  code: string;
  collection: string;
  field: string;
  type: FilterOperator;
  hidden?: boolean;
  group: string | null;
  valid?: number | string | (number | string)[];
  invalid?: number | string | (number | string)[];
  substring?: string;
};

/**
 * @publicApi
 */
export type Width = "half" | "half-left" | "half-right" | "full" | "fill";

/**
 * @private
 */
type Translations = {
  language: string;
  translation: string;
};
