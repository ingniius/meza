import type { RequestOptions, RequestTransformer, ResponseTransformer } from "../types/request.js";

/**
 * @publicApi
 */
export interface RestClient<Schema> {
  request<Output>(options: RestCommand<Output, Schema>): Promise<Output>;
}

/**
 * @publicApi
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RestCommand<_Output extends object | unknown, _Schema> {
  (): RequestOptions;
}

/**
 * @publicApi
 */
export interface RestConfig {
  credentials?: RequestCredentials;
  // onError?: (error: any) => any;
  onRequest?: RequestTransformer;
  onResponse?: ResponseTransformer;
}
