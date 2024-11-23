import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name passwordReset
 * @description The request a password reset endpoint sends an email with a link to the admin app (or a custom route) which in turn uses this endpoint to allow the user to reset their password.
 * @param token Password reset token, as provided in the email sent by the request endpoint
 * @param password New password for the user
 */
export const passwordReset =
  <Schema>(token: string, password: string): RestCommand<void, Schema> =>
  () => ({
    path: "/auth/password/reset",
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
