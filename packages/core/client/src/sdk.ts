import type { ClientGlobals, ClientOptions, MezaClient } from "./types/client";

/**
 * @private
 * @description The default globals supplied to the client
 */
const defaultGlobals: ClientGlobals = {
  fetch: globalThis.fetch,
  WebSocket: globalThis.WebSocket,
  URL: globalThis.URL,
  logger: globalThis.console,
};

/**
 * @publicApi
 * @description Creates a client to communicate with a Meza app.
 * @param url The URL to the Meza app
 * @param options The client options. Defaults to the standard implementation of `globals`
 */
export function createMeza<Schema = any>(url: string, options: ClientOptions = {}): MezaClient<Schema> {
  const globals = options.globals ? { ...defaultGlobals, ...options.globals } : defaultGlobals;
  return {
    globals,
    url: new globals.URL(url),
    with(createExtension) {
      return {
        ...this,
        ...createExtension(this),
      };
    },
  };
}
