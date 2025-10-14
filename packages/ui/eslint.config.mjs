import preset from "@azem/eslint/react.mjs";

export default preset([{
  ignores: ["**/.cache/", "**/.turbo/"],
  settings: {
    "better-tailwindcss": {
      entryPoint: "styles/globals.css",
    },
  },
}]);
