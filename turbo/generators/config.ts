import type { PlopTypes } from "@turbo/gen";

import { createNuxtGenerator } from "./nuxt/generator";
import { createPackageGenerator } from "./package/generator";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  [createNuxtGenerator, createPackageGenerator].forEach((gen) => gen(plop));
}
