module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    "comma-dangle": "off",
    "no-console": "warn",
    "no-alert": "error",
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "react/jsx-key": "error",
    "react/no-array-index-key": "warn",
    "react/no-unused-prop-types": "error",
    "react/no-unknown-property": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
