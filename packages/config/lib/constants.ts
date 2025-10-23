import { keys } from "../keys";
import { withLocalAliases } from "./utils";

export const PREFIX = Object.freeze({ ADMIN: "admin", API: "api", APP: "app", DASHBOARD: "dashboard", WEB: "www" });

const BASE_HOSTS = {
  admin: [`${PREFIX.ADMIN}.${keys().NEXT_PUBLIC_DOMAIN}`, `${PREFIX.ADMIN}.localhost:3000`, `${PREFIX.ADMIN}.localhost`],
  api: [`${PREFIX.API}.${keys().NEXT_PUBLIC_DOMAIN}`, `${PREFIX.API}.localhost:3000`, `${PREFIX.API}.localhost`],
  app: [`${PREFIX.APP}.${keys().NEXT_PUBLIC_DOMAIN}`, `${PREFIX.APP}.localhost:3000`, `${PREFIX.APP}.localhost`],
  web: [keys().NEXT_PUBLIC_DOMAIN, "localhost:3000", "localhost"],
};

export const ADMIN_HOSTNAMES = new Set(withLocalAliases(BASE_HOSTS.admin));

export const API_HOSTNAMES = new Set(withLocalAliases(BASE_HOSTS.api));

export const APP_HOSTNAMES = new Set(withLocalAliases(BASE_HOSTS.app));

export const WEB_HOSTNAMES = new Set(withLocalAliases(BASE_HOSTS.web));

export const COOKIE = Object.freeze({ LOCALE: "Next-Locale" });

export const EXCLUDED_PATHS = [`/${PREFIX.ADMIN}`, `/${PREFIX.DASHBOARD}`];

export const INTERNAL_PACKAGES = ["@azem/config", "@azem/locale", "@azem/seo", "@azem/ui"];
