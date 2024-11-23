import type { ConsoleInterface, FetchInterface, UrlInterface, WebSocketConstructor } from "./globals";

/**
 * @publicApi
 * @description All used globals for the client.
 */
export type ClientGlobals = {
  fetch: FetchInterface;
  WebSocket: WebSocketConstructor;
  URL: UrlInterface;
  logger: ConsoleInterface;
};

/**
 * @publicApi
 * @description Available options on the client.
 */
export type ClientOptions = {
  globals?: Partial<ClientGlobals>;
};

/**
 * @publicApi
 * @description Empty Meza Client.
 */
export interface MezaClient<Schema> {
  url: URL;
  globals: ClientGlobals;
  with: <Extension extends object>(createExtension: (client: MezaClient<Schema>) => Extension) => this & Extension;
}
