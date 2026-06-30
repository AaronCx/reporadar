import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // eslint-config-next sets `react.version: "detect"`, whose runtime
    // detection relies on `context.getFilename()` — a method removed in
    // ESLint 10. Pin the version explicitly to use the same rule set
    // without invoking the removed detection path.
    settings: {
      react: {
        version: "19.2.7",
      },
    },
  },
];

export default config;
