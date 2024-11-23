import type { AuthenticationData, AuthenticationStorage } from "../types";

/**
 * @publicApi
 * @name memoryStorage
 * @description Simple memory storage implementation.
 */
export function memoryStorage() {
  let store: AuthenticationData | null = null;

  return {
    get: async () => store,
    set: async (value: AuthenticationData | null) => {
      store = value;
    },
  } as AuthenticationStorage;
}
