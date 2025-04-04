import type { PlopTypes } from "@turbo/gen";

import { execSync } from "node:child_process";

interface PackageJson {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export function createPackageGenerator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("package", {
    description: "Generate a new package for the Workspace",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package? (You can skip the `@azem/` prefix)",
      },
      {
        type: "input",
        name: "scope",
        message: "What is the scope of the package?",
        default: "packages/common",
      },
      {
        type: "input",
        name: "deps",
        message: "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      // SANITIZATION
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@azem/")) {
            answers.name = answers.name.replace("@azem/", "");
          }
        }
        return "Config sanitized";
      },
      // TEMPLATES
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/package.json",
        templateFile: "package/package.json.hbs",
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/build.config.ts",
        templateFile: "package/build.config.ts.hbs",
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/eslint.config.mjs",
        templateFile: "package/eslint.config.mjs.hbs",
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/tsconfig.json",
        templateFile: "package/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/vitest.config.ts",
        templateFile: "package/vitest.config.ts.hbs",
      },
      // GENERATOR
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/.npmignore",
        template: `*
!dist/**
!package.json
!LICENSE.md
!README.md
`,
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/LICENSE.md",
        template: `MIT License

Copyright (c) 2025 @omaucf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/README.md",
        template: `# \`@azem/{{ name }}\`

## Installation

\`\`\`shell
pnpm i -D @azem/{{ name }}
\`\`\`

## License

See [LICENSE](./LICENSE.md) for more information.
`,
      },
      {
        type: "add",
        path: "{{ scope }}/{{ name }}/src/index.ts",
        template: `export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
`,
      },
      // TRANSFORMATIONS
      {
        type: "modify",
        path: "{{ scope }}/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) pkg.dependencies = {};
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      // EXECUTION
      async (answers) => {
        const { name, scope } = answers as { name: string; scope: string };
        execSync("pnpm exec manypkg fix", { stdio: "inherit" });
        execSync(`pnpm exec prettier ${scope}/${name}/** --write`);
        return "Package scaffolded";
      },
    ],
  });
}
