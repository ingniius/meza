import type { Component, ComponentOptions } from "vue";

import type { Field, LocalType, Type } from "@azem/types/field";
import type { DeepPartial, Dict } from "@azem/types/util";

import type { ExtensionOptionsContext } from "./options";

/**
 * @publicApi
 */
export interface DisplayConfig {
  id: string;
  name: string;
  icon: string;
  description?: string;

  component: Component;
  handler?: (
    value: any,
    options: Dict,
    ctx: { interfaceOptions?: Dict; field?: Field; collection?: string },
  ) => string | null;
  options:
    | DeepPartial<Field>[]
    | { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] }
    | ((
        ctx: ExtensionOptionsContext,
      ) => DeepPartial<Field>[] | { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] })
    | Exclude<ComponentOptions, any>
    | null;
  types: readonly Type[];
  localTypes?: readonly LocalType[];
  fields?: string[] | DisplayFieldsFunction;
}

/**
 * @publicApi
 */
export type DisplayFieldsFunction = (
  options: any,
  context: {
    collection: string;
    field: string;
    type: string;
  },
) => string[];
