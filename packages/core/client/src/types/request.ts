/**
 * @publicApi
 */
export type HttpMethod = "GET" | "SEARCH" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * @publicApi
 */
export type ResponseTransformer<Output = any> = (data: any, request: RequestInit) => Output | Promise<Output>;

/**
 * @publicApi
 */
export interface RequestOptions {
  path: string;
  method?: HttpMethod;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: string | FormData;
  onRequest?: RequestTransformer;
  onResponse?: ResponseTransformer;
}

/**
 * @publicApi
 */
export type RequestTransformer = (options: RequestInit) => RequestInit | Promise<RequestInit>;
