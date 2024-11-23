import type { AuthenticationData, AuthenticationMode } from "../../../index";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name refresh
 * @description Retrieve a new access token using a refresh token.
 * @param mode Whether to submit and retrieve the refresh token in theON response, or in a httpOnly cookie
 * @param refresh_token The refresh token to use. If you have the refresh token in a cookie through /auth/login, you don't have to submit it here
 */
export const refresh =
  <Schema>(mode: AuthenticationMode = "cookie", refresh_token?: string): RestCommand<AuthenticationData, Schema> =>
  () => ({
    path: "/auth/refresh",
    method: "POST",
    body: JSON.stringify(mode === "json" ? { refresh_token, mode } : { mode }),
  });
