import preset from "@azem/eslint/next.mjs";

export default preset([{
  ignores: ["**/.cache/", "**/.next/", "**/out/", "**/.turbo/"],
  settings: {
    "better-tailwindcss": {
      entryPoint: "app/styles.css",
    },
  },
}]);
