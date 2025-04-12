import TypescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import TypescriptEslintParser from "@typescript-eslint/parser";

export default [
  {
    files: [ "src/**/*.ts"],
    plugins: {
      TsEslintPlugin: TypescriptEslintPlugin,
    },
    rules: {
      "TsEslintPlugin/no-unused-vars": ["error"],
    },
  },
  {
    languageOptions: {
      parser: TypescriptEslintParser,
      sourceType: "module",
    },
  },
  {
    rules: {
      "quotes": ["error", "double"],
      "semi-style": ["error", "last"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "camelcase": "error",
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
      "indent": ["error", 2],
      "no-unused-vars": "off",
    },
  }
];
