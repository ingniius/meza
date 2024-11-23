import type { Component } from "vue";

import type { Filter } from "@azem/types/filter";
import type { Dict } from "@azem/types/util";

/**
 * @publicApi
 */
export interface LayoutConfig<Options = any, Query = any> {
  id: string;
  name: string;
  icon: string;

  component: Component;
  slots: {
    options: Component;
    sidebar: Component;
    actions: Component;
  };
  smallHeader?: boolean;
  headerShadow?: boolean;
  sidebarShadow?: boolean;
  setup: (props: LayoutProps<Options, Query>, ctx: LayoutContext) => Dict<string, unknown>;
}

/**
 * @publicApi
 */
export interface LayoutProps<Options = any, Query = any> {
  collection: string | null;
  selection: (number | string)[];
  layoutOptions: Options;
  layoutQuery: Query;
  layoutProps: Dict<string, unknown>;
  filterUser: Filter | null;
  filterSystem: Filter | null;
  filter: Filter | null;
  search: string | null;
  selectMode: boolean;
  showSelect: ShowSelect;
  readonly: boolean;
  resetPreset?: () => Promise<void>;
  clearFilters?: () => void;
}

/**
 * @pri
 */
interface LayoutContext {
  emit: (event: "update:selection" | "update:layoutOptions" | "update:layoutQuery", ...args: any[]) => void;
}

/**
 * @publicApi
 */
export type LayoutState<T, Options, Query> = {
  props: LayoutProps<Options, Query>;
} & T;

/**
 * @publicApi
 */
export type ShowSelect = "none" | "one" | "multiple";
