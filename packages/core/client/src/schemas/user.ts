import type { MergeCoreCollection } from "../index";
import type { MezaFile } from "./file";
import type { MezaPolicy } from "./policy";
import type { MezaRole } from "./role";

/**
 * @publicApi
 */
export type MezaUser<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_users",
  {
    id: string; // uuid
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password: string | null; // will just be *s
    location: string | null;
    title: string | null;
    description: string | null;
    tags: string[] | null;
    avatar: MezaFile<Schema> | string | null;
    language: string | null;
    theme: string | null;
    tfa_secret: string | null;
    status: string;
    role: MezaRole<Schema> | string | null;
    token: string | null;
    last_access: "datetime" | null;
    last_page: string | null;
    provider: string;
    external_identifier: string | null;
    auth_data: Record<string, any> | null;
    email_notifications: boolean | null;
    appearance: string | null;
    theme_dark: string | null;
    theme_light: string | null;
    theme_light_overrides: Record<string, unknown> | null;
    theme_dark_overrides: Record<string, unknown> | null;
    policies: string[] | MezaPolicy<Schema>[];
  }
>;
