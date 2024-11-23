import type { Ref } from "vue";

/**
 * @publicApi
 */
export type RefRecord<T> = { [k in keyof T]: Ref<T[k]> };
