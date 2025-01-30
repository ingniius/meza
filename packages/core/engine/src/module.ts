import {
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
  installModule,
  useLogger,
  useNuxt,
} from "@nuxt/kit";

import { CORE_KEY } from "@azem/tokens/key";

import { defu } from "defu";

import { name, version } from "../package.json";

export interface ModuleOptions {
  enabled?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: CORE_KEY,
    compatibility: { nuxt: ">=3.13.0" },
  },
  defaults: {
    enabled: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const { info } = useLogger(CORE_KEY);

    if (!options.enabled) {
      info(`Skipping ${name} setup, as module is disabled`);
      return;
    }

    // 1. RUNTIME
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    // 2. CONFIGURATION
    await registerModule("@pinia/nuxt");

    // 3. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
      config.optimizeDeps.include.push("es-toolkit", "pinia");
    });
  },
});

async function registerModule(name: string, options: Record<string, any> = {}, nuxt = useNuxt()) {
  if (!hasNuxtModule(name)) {
    await installModule(name, options);
  } else {
    (nuxt.options as any)[name] = defu((nuxt.options as any)[name], options);
  }
}
