import type { AuthenticationData, LoginOptions } from "../../../index";
import type { RestCommand } from "../../types";
import { getAuthEndpoint } from "../../utils/get-auth-endpoint";

/**
 * @publicApi
 * @name login
 * @description Authenticate as a user.
 * @param email Email address of the user
 * @param password Password of the user
 * @param options Optional login settings
 */
export const login =
  <Schema>(email: string, password: string, options: LoginOptions = {}): RestCommand<AuthenticationData, Schema> =>
  () => {
    const path = getAuthEndpoint(options.provider);
    const data: Record<string, string> = { email, password };
    if ("otp" in options) data["otp"] = options.otp!;
    data["mode"] = options.mode ?? "cookie";
    return { path, method: "POST", body: JSON.stringify(data) };
  };
