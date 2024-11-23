import { inject } from "vue";

import type { MezaClient, RestClient } from "@azem/client";
import type { AppExtensionConfigs } from "@azem/extensions/types";
import type { RefRecord } from "@azem/helpers/types";
import { API_INJECT, EXTENSIONS_INJECT, SDK_INJECT, STORES_INJECT } from "@azem/tokens/injector";

import type { AxiosInstance } from "axios";

/**
 * @publicApi
 * @name useApi
 */
export function useApi(): AxiosInstance {
  const api = inject<AxiosInstance>(API_INJECT);
  if (!api) throw new Error("[useApi]: The api could not be found.");
  return api;
}

/**
 * @publicApi
 * @name useExtensions
 */
export function useExtensions(): RefRecord<AppExtensionConfigs> {
  const extensions = inject<RefRecord<AppExtensionConfigs>>(EXTENSIONS_INJECT);
  if (!extensions) throw new Error("[useExtensions]: The extensions could not be found.");
  return extensions;
}

/**
 * @publicApi
 * @name useSdk
 */
export function useSdk<Schema extends object = any>(): MezaClient<Schema> & RestClient<Schema> {
  const sdk = inject<MezaClient<Schema> & RestClient<Schema>>(SDK_INJECT);
  if (!sdk) throw new Error("[useSdk]: The sdk could not be found.");
  return sdk;
}

/**
 * @publicApi
 * @name useStores
 */
export function useStores(): Record<string, any> {
  const stores = inject<Record<string, any>>(STORES_INJECT);
  if (!stores) throw new Error("[useStores]: The stores could not be found.");
  return stores;
}
