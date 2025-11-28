// eslint.config.mjs
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "semi": ["error", "always"],  // base ESLint rule
      "quotes": ["error", "single"],
    },
  },
];
