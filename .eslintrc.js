// module.exports = {
//   root: true,
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     // project: "./tsconfig.json",
//     project: [
//         "./packages/monster-js/tsconfig.json",
//         "./packages/monster-js-cli/tsconfig.json"
//     ],
//     tsconfigRootDir: __dirname,
//   },
//   extends: [
//     "airbnb-base",
//     "airbnb-typescript/base",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:import/typescript",
//   ],
//   rules: {
//     // Customize rules as needed
//     "import/prefer-default-export": "off", // Allow named exports
//     "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignore unused variables starting with _
//     "no-console": "warn", // Warn but allow console logs
//     "@typescript-eslint/explicit-module-boundary-types": "off", // Allow inferred return types
//   },
//   ignorePatterns: ["node_modules/", "dist/", "build/"],
// };
