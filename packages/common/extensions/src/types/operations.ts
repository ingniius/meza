import type { ComponentOptions } from "vue";

import type { Accountability } from "@azem/types/accountability";
import type { Field } from "@azem/types/field";
import type { FlowRaw } from "@azem/types/flow";
import type { DeepPartial, Dict } from "@azem/types/util";

import type { ApiExtensionContext } from "./api-extension-context";

/**
 * @publicApi
 */
export interface OperationAppConfig {
  id: string;
  name: string;
  icon: string;
  description?: string;

  overview:
    | ((options: Dict, { flow }: { flow: FlowRaw }) => { label: string; text: string; copyable?: boolean }[])
    | ComponentOptions
    | null;
  options: DeepPartial<Field>[] | ((options: Dict) => DeepPartial<Field>[]) | Exclude<ComponentOptions, any> | null;
}

/**
 * @publicApi
 */
export interface OperationApiConfig<Options = Dict<string, unknown>> {
  id: string;
  handler: OperationHandler<Options>;
}

/**
 * @publicApi
 */
export type OperationContext = ApiExtensionContext & {
  data: Dict<string, unknown>;
  accountability: Accountability | null;
};

/**
 * @publicApi
 */
export type OperationHandler<Options = Dict<string, unknown>> = (
  options: Options,
  context: OperationContext,
) => unknown | Promise<unknown> | void;
