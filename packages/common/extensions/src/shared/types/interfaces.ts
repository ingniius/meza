import type { Component, ComponentOptions } from "vue";

import type { Field, LocalType, Type } from "@azem/types/field";
import type { DeepPartial } from "@azem/types/util";

import type { ExtensionOptionsContext } from "./options";

/**
 * @publicApi
 */
export interface InterfaceConfig {
  id: string;
  name: string;
  icon: string;
  description?: string;

  component: Component;
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
  group?: "standard" | "selection" | "relational" | "presentation" | "group" | "other";
  order?: number;
  relational?: boolean;
  hideLabel?: boolean;
  hideLoader?: boolean;
  autoKey?: boolean;
  system?: boolean;
  recommendedDisplays?: string[];
  preview?: string;
}
