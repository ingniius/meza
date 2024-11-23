/**
 * @publicApi
 */
export type ConsoleInterface = {
  [level in LogLevels]: (...args: any) => any;
};

/**
 * @publicApi
 * @description Using "| any" to ensure compatibility with various "Fetch" alternative function signatures.
 */
export type FetchInterface = (input: string | any, init?: RequestInit | any) => Promise<unknown>;

/**
 * @publicApi
 */
export type LogLevels = "log" | "info" | "warn" | "error";

/**
 * @publicApi
 */
export type UrlInterface = typeof URL;

/**
 * @publicApi
 * @description While the standard says 'string | URL' for the 'url' parameter, some implementations (e.g. React Native) only accept 'string'.
 */
export type WebSocketConstructor = {
  new (url: string, protocols?: string | string[]): WebSocketInterface;
};

/**
 * @publicApi
 */
export type WebSocketInterface = {
  readonly readyState: number;

  addEventListener(type: string, listener: (this: WebSocketInterface, ev: any) => any): void;
  removeEventListener(type: string, listener: (this: WebSocketInterface, ev: any) => any): void;

  send(data: string): void;
  close(code?: number, reason?: string): void;
};
