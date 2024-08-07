/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module'
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-redeclare': 'error'
  },
  ignorePatterns: ["taiwind.config.js", "*.js"],
  settings: {
    react: {
      version: 'detect',
    }
  }
};
