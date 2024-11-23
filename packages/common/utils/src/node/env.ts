/**
 * @publicApi
 * @name getNodeEnv
 * @description Get the configured Node Environment (eg "production", "development", etc).
 */
export function getNodeEnv() {
  return process.env["NODE_ENV"];
}
