import type { Component } from "vue";

import { func, obj } from "@azem/utils/assertion";

/**
 * @publicApi
 * @name isVueComponent
 * @param input
 */
export function isVueComponent(input: unknown): input is Component {
  if (!obj(input)) return false;
  // A Vue component usually provides a 'setup' and/or 'render' function
  // (unfortunately there is no more accurate way to find out, but this should be enough for most cases)
  return func(input["setup"]) || func(input["render"]);
}
