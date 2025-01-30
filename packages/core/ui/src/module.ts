import {
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
  installModule,
  useLogger,
  useNuxt,
} from "@nuxt/kit";

import { UI_KEY } from "@azem/tokens/key";

import { defu } from "defu";

import { name, version } from "../package.json";
import { colors, icons } from "./defaults";

export interface ModuleOptions {
  enabled?: boolean;
  prefix?: string;
  colorMode?: boolean;
  fonts?: boolean;
  image?: boolean;
  theme?: {
    colors?: string[];
    transitions?: boolean;
  };
  devtools?: {
    enabled?: boolean;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: UI_KEY,
    compatibility: { nuxt: ">=3.13.0" },
  },
  defaults: {
    enabled: true,
    prefix: "U",
    colorMode: true,
    fonts: true,
    image: true,
    theme: {
      colors: undefined,
      transitions: true,
    },
    devtools: {
      enabled: true,
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const { info } = useLogger(UI_KEY);

    if (!options.enabled) {
      info(`Skipping ${name} setup, as module is disabled`);
      return;
    }

    // 0. SETUP
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, { colors, icons });
    nuxt.options.router.options.scrollBehaviorType = "smooth";

    // 1. RUNTIME
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    // 2. CONFIGURATION
    if (hasNuxtModule("@nuxt/image") || options.image) await registerModule("@nuxt/image");
    await registerModule(
      "@nuxt/ui",
      defu(nuxt.options.ui || {}, {
        prefix: options.prefix,
        colorMode: options.colorMode,
        fonts: options.fonts,
        theme: defu(
          { colors: nuxt.options.appConfig.ui.colors, icons: nuxt.options.appConfig.ui.icons },
          options.theme,
        ),
        devtools: options.devtools,
      }),
    );

    // 3. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
      config.optimizeDeps.include.push("@vueuse/core", "es-toolkit", "reka-ui");
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
