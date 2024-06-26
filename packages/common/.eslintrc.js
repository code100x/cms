/** @type {import("eslint").Linter.Config} */
module.exports = {
  "ignorePatterns": [
    "node_modules",
    "dist/",
    "tsconfig.json"
  ],
  "extends": [
    "@repo/eslint-config/library.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  }
}
