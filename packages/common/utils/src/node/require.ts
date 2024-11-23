import { readFileSync } from "node:fs";

import yaml from "js-yaml";

/**
 * @publicApi
 * @name requireYaml
 * @param filePath
 */
export function requireYaml(filepath: string) {
  const yamlRaw = readFileSync(filepath, "utf8");
  return yaml.load(yamlRaw);
}
