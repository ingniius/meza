import type { Component, ComponentOptions } from "vue";

import type { Field } from "@azem/types/field";
import type { Query } from "@azem/types/query";
import type { DeepPartial, Dict } from "@azem/types/util";

/**
 * @publicApi
 */
export type Panel = {
  id: string;
  dashboard: string;
  show_header: boolean;
  name: string;
  icon: string;
  color: string;
  note: string;
  type: string;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  options: Dict;
  date_created: string;
  user_created: string;
};

/**
 * @publicApi
 */
export interface PanelConfig {
  id: string;
  name: string;
  icon: string;
  description?: string;

  query?: (options: Dict) => PanelQuery | PanelQuery[] | undefined;
  variable?: true; // Mark the panel as a global variable
  component: Component;
  options:
    | DeepPartial<Field>[]
    | { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] }
    | ((
        ctx: Partial<Panel>,
      ) => DeepPartial<Field>[] | { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] })
    | Exclude<ComponentOptions, any>
    | null;
  minWidth: number;
  minHeight: number;
  skipUndefinedKeys?: string[];
}

/**
 * @publicApi
 */
export type PanelQuery = { collection: string; query: Query; key?: string };
