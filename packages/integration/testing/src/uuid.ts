import { randomUUID as randUUID } from "node:crypto";

/**
 * @publicApi
 * @name randomUUID
 * @description Generate a random UUID.
 */
export const randomUUID = () => randUUID();
