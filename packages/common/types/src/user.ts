import type { Policy } from "./policy";
import type { Dict } from "./util";

/**
 * @publicApi
 */
export type Avatar = {
  id: string;
};

/**
 * @publicApi
 */
export type Role = {
  id: string;
  name: string;
  description: string;
  icon: string;
  users: string[];
  parent: string | null;
};

/**
 * @publicApi
 */
export type User = {
  id: string;
  status: "draft" | "invited" | "unverified" | "active" | "suspended" | "archived";
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
  last_access: string | null;
  last_page: string | null;
  external_identifier: string | null;
  tfa_secret: string | null;
  auth_data: Dict | null;
  provider: string;
  appearance: "auto" | "dark" | "light" | null;
  theme_light: string | null;
  theme_dark: string | null;
  theme_light_overrides: Dict<string, unknown> | null;
  theme_dark_overrides: Dict<string, unknown> | null;
  role: Role | null;
  policies: Policy[];
  language: string | null;
  avatar: Avatar | null;
  title: string | null;
  description: string | null;
  location: string | null;
  tags: string[] | null;
  email_notifications: boolean;
};

/**
 * @publicApi
 */
export type RegisterUserInput = {
  email: NonNullable<User["email"]>;
  password: NonNullable<User["password"]>;
  verification_url?: string | null;
  first_name?: User["first_name"];
  last_name?: User["last_name"];
};
