import type { LiteralFields } from "./fields";
import type { ItemType, RelationalFields } from "./schema";
import type { Merge } from "./utils";

/**
 * @publicApi
 */
export type ArrayFunctions = "count";

/**
 * @publicApi
 * @description Available query functions.
 */
export type DateTimeFunctions = "year" | "month" | "week" | "day" | "weekday" | "hour" | "minute" | "second";

/**
 * @publicApi
 * @description Combine the various function types.
 */
export type FunctionFields<Schema, Item> =
  | {
      [Type in keyof QueryFunctions]: TypeFunctionFields<Item, Type>;
    }[keyof QueryFunctions]
  | keyof TranslateFunctionFields<RelationalFunctions<Schema, Item>, ArrayFunctions>;

/**
 * @private
 * @description Create a map of function fields with its original field name.
 */
type FunctionFieldNames<Fields, Funcs> = {
  [F in PermuteFields<Fields, Funcs> as `${F[1]}(${F[0]})`]: F[0];
};

/**
 * @publicApi
 * @description Map all possible function fields to name on an item.
 */
export type MappedFieldNames<Schema, Item> = Merge<
  FunctionFieldNames<RelationalFunctions<Schema, Item>, ArrayFunctions>,
  FunctionFieldNames<LiteralFields<Item, "datetime">, DateTimeFunctions> &
    FunctionFieldNames<LiteralFields<Item, "json" | "csv">, ArrayFunctions>
>;

/**
 * @publicApi
 * @description Map all possible function fields on an item.
 */
export type MappedFunctionFields<Schema, Item> = Merge<
  TranslateFunctionFields<RelationalFunctions<Schema, Item>, ArrayFunctions>,
  TranslateFunctionFields<LiteralFields<Item, "datetime">, DateTimeFunctions> &
    TranslateFunctionFields<LiteralFields<Item, "json" | "csv">, ArrayFunctions>
>;

/**
 * @publicApi
 */
export type QueryFunctions = {
  datetime: DateTimeFunctions;
  json: ArrayFunctions;
  csv: ArrayFunctions;
};

/**
 * @publicApi
 * @description Permute [function, field] combinations.
 */
export type PermuteFields<Fields, Funcs> = Fields extends string
  ? Funcs extends string
    ? [Fields, Funcs]
    : never
  : never;

/**
 * @publicApi
 * @description Get all many relations on an item.
 */
type RelationalFunctions<Schema, Item> = keyof {
  [Key in RelationalFields<Schema, Item> as Extract<Item[Key], ItemType<Schema>> extends any[] ? Key : never]: Key;
};

/**
 * @publicApi
 * @description Create a map of function fields and their resulting output names.
 */
type TranslateFunctionFields<Fields, Funcs> = {
  [F in PermuteFields<Fields, Funcs> as `${F[1]}(${F[0]})`]: `${F[0]}_${F[1]}`;
};

/**
 *@publicApi
 */
export type TypeFunctionFields<Item, Type extends keyof QueryFunctions> = keyof TranslateFunctionFields<
  LiteralFields<Item, Type>,
  QueryFunctions[Type]
>;
