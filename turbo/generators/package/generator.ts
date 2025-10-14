import { execSync } from "node:child_process";
import type { PlopTypes } from "@turbo/gen";

type PackageJson = {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export function createPackageGenerator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("pkg", {
    description: "Generate a new package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package? (You can skip the `@azem/` prefix)",
      },
      {
        type: "input",
        name: "path",
        message: "What is the path of the package?",
      },
      {
        type: "input",
        name: "deps",
        message: "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      (answers) => {
        if (
          "name" in answers &&
          typeof answers.name === "string" &&
          answers.name.startsWith("@azem/")
        ) {
          answers.name = answers.name.replace("@azem/", "");
        }
        return "Config sanitized";
      },
      // TEMPLATES
      {
        type: "add",
        path: "{{ path }}/{{ name }}/eslint.config.mjs",
        templateFile: "package/eslint.config.mjs.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/package.json",
        templateFile: "package/package.json.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/tsconfig.json",
        templateFile: "package/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/vitest.config.ts",
        templateFile: "package/vitest.config.ts.hbs",
      },
      // WRITE
      {
        type: "add",
        path: "{{ path }}/{{ name }}/index.ts",
        template: `export function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
}
`,
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/index.spec.ts",
        template: `import { describe, expect, it } from "vitest";

import { isBrowser } from ".";

describe("#isBrowser", () => {
  it("should be defined", () => {
    expect(isBrowser).toBeDefined();
  });
});
`,
      },
      // DEPENDENCIES
      {
        type: "modify",
        path: "{{ path }}/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").sort().filter(Boolean)) {
              const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) {
                pkg.dependencies = {};
              }
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      async (answers) => {
        const { name, path } = answers as { name: string; path: string };
        execSync("pnpm i", { stdio: "inherit" });
        execSync(`pnpm prettier --write ${path}/${name}/**/*.{json,md,mjs,ts} --list-different`);
        return "Package scaffolded";
      },
    ],
  });
}
