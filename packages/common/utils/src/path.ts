import { REGEX_BETWEEN_PARENS } from "@azem/tokens/regex";

/**
 * @publicApi
 * @name normalizePath
 * @description Replace windows style backslashes with unix forwards slashes.
 * @param path
 */
export const normalizePath = (path: string, { removeLeading } = { removeLeading: false }) => {
  if (path === "\\" || path === "/") return "/";
  if (path.length <= 1) return path;

  let prefix = "";
  if (path.length > 4 && path[3] === "\\") {
    if (["?", "."].includes(path[2]!) && path.slice(0, 2) === "\\\\") {
      path = path.slice(2);
      prefix = "//";
    }
  }

  const segments = path.split(/[/\\]+/);
  if (segments.at(-1) === "") {
    segments.pop();
  }

  const normalizedPath = prefix + segments.join("/");
  if (removeLeading && path.startsWith("/")) return normalizedPath.substring(1);
  return normalizedPath;
};

/**
 * @publicApi
 * @name parseFilterFunctionPath
 * @description Parse count(a.b.c) as a.b.count(c) and a.b.count(c.d) as a.b.c.count(d).
 * @param path
 */
export function parseFilterFunctionPath(path: string): string {
  if (path.includes("(") && path.includes(")")) {
    const pre = path.split("(")[0]!;
    const preHasColumns = pre.includes(".");
    const preColumns = preHasColumns ? pre.slice(0, pre.lastIndexOf(".") + 1) : "";
    const functionName = preHasColumns ? pre.slice(pre.lastIndexOf(".") + 1) : pre;

    const matched = path.match(REGEX_BETWEEN_PARENS);

    if (matched) {
      const fields = matched[1]!;
      const fieldsHasColumns = fields.includes(".");
      const columns = fieldsHasColumns ? fields.slice(0, fields.lastIndexOf(".") + 1) : "";
      const field = fieldsHasColumns ? fields.slice(fields.lastIndexOf(".") + 1) : fields;

      return `${preColumns}${columns}${functionName}(${field})`;
    }
  }

  return path;
}
