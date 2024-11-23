import type { PlopTypes } from "@turbo/gen";

import { createPackageGenerator } from "./pkg/generator";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  [createPackageGenerator].forEach((gen) => gen(plop));
}
