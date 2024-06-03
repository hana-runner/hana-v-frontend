module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/quotes": ["error", "double"],
    "linebreak-style": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
    ],
    "react/function-component-definition": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/jsx-boolean-value": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-indent": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["htmlFor"],
      },
    ],
  },
};
