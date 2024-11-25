import type { AuthenticationData, AuthenticationMode } from "../../../index";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name authenticateShare
 * @description Authenticate as a share user.
 * @param share The ID of the share
 * @param password Password for the share, if one is configured
 * @param mode Whether to retrieve the refresh token in the JSON response, or in a httpOnly cookie. One of `json`, `cookie` or `session`. Defaults to `cookie`
 */
export const authenticateShare =
  <Schema>(
    share: string,
    password?: string,
    mode: AuthenticationMode = "cookie",
  ): RestCommand<AuthenticationData, Schema> =>
  () => {
    const data = { share, password, mode };
    return { path: "/shares/auth", method: "POST", body: JSON.stringify(data) };
  };

/**
 * @publicApi
 * @name inviteShare
 * @description Sends an email to the provided email addresses with a link to the share.
 * @param share Primary key of the share you're inviting people to
 * @param emails Array of email strings to send the share link to
 */
export const inviteShare =
  <Schema>(share: string, emails: string[]): RestCommand<void, Schema> =>
  () => ({
    path: `/shares/invite`,
    method: "POST",
    body: JSON.stringify({ share, emails }),
  });

/**
 * @publicApi
 * @name readShareInfo
 * @description Allows unauthenticated users to retrieve information about the share.
 * @param id Primary key of the share you're viewing
 */
export const readShareInfo =
  <Schema>(
    id: string,
  ): RestCommand<
    {
      id: string;
      collection: string;
      item: string;
      password: string | null;
      date_start: string | null;
      date_end: string | null;
      times_used: number | null;
      max_uses: number | null;
    },
    Schema
  > =>
  () => ({
    path: `/shares/info/${id}`,
    method: "GET",
  });
