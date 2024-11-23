import type { Dict } from "@azem/types/util";

/**
 * Functions to communicate with the Meza API internals
 */

declare module "meza:api" {
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Endpoints

  export interface SandboxEndpointRequest {
    url: string;
    headers: Dict<string, string>;
    body: any;
  }

  export interface SandboxEndpointResponse {
    status: number;
    body: string | Dict<string, unknown>;
  }

  export type SandboxEndpointRouteHandlerFn = (
    request: SandboxEndpointRequest,
  ) => Promise<SandboxEndpointResponse> | SandboxEndpointResponse;

  export type SandboxEndpointRegisterFn = (path: string, handler: SandboxEndpointRouteHandlerFn) => void;

  export interface SandboxEndpointRouter {
    get: SandboxEndpointRegisterFn;
    patch: SandboxEndpointRegisterFn;
    put: SandboxEndpointRegisterFn;
    post: SandboxEndpointRegisterFn;
    delete: SandboxEndpointRegisterFn;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Hooks

  export type SandboxHookHandlerFn = (payload: unknown) => any;

  export type SandboxHookRegisterFn = (event: string, handler: SandboxHookHandlerFn) => void;

  export interface SandboxHookRegisterContext {
    action: SandboxHookRegisterFn;
    filter: SandboxHookRegisterFn;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Operations

  export type SandboxOperationHandlerFn = (data: Dict) => any;

  export interface SandboxOperationConfig {
    id: string;
    handler: SandboxOperationHandlerFn;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // API functions

  export interface SandboxRequestResponse {
    status: number;
    statusText: string;
    headers: Dict<string, string>;
    data: string | Dict<string, unknown>;
  }

  export type SandboxRequestFn = (
    url: string,
    options: {
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      body?: Dict | string;
      headers?: Dict<string, string>;
    },
  ) => Promise<SandboxRequestResponse>;

  export type SandboxSleepFn = (milliseconds: number) => Promise<void>;

  export type SandboxLogFn = (message: string) => void;

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Module Exports

  export const request: SandboxRequestFn;
  export const sleep: SandboxSleepFn;
  export const log: SandboxLogFn;
}
