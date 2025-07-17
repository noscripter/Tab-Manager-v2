import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
), 
{
    // Ignore patterns for files that shouldn't be linted
    ignores: [
        "**/build/**/*",
        "**/dist/**/*",
        "**/node_modules/**/*",
        "**/*.min.js",
        "**/*.bundle.js",
        "**/coverage/**/*",
        "**/__image_snapshots__/**/*",
        "**/screenshots/**/*",
        "**/promotional_tiles/**/*",
        "**/*.mdx"
    ]
},
{
    // Main config for source files
    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
    },

    languageOptions: {
        globals: {
            page: true,
            browser: true,
            context: true,
            jestPuppeteer: true,
            __dirname: true,
            require: true,
            module: true,
            process: true,
            Buffer: true,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "jest/no-disabled-tests": "off",
        "jest/no-jest-import": "off",

        "@typescript-eslint/no-unused-vars": [2, {
            argsIgnorePattern: "^_",
        }],
    },
},
{
    // Special config for Node.js build scripts
    files: [
        "**/webpack.config.js",
        "**/utils/*.js",
        "**/setup.js",
        "**/jest.config.js",
        "**/playwright.config.ts",
        "**/*.config.js",
        "**/*.config.mjs",
        "**/publish_edge.mjs"
    ],
    
    rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
    }
},
{
    // Special config for Storybook files
    files: [
        "**/.storybook/**/*.js",
        "**/*.stories.*"
    ],
    
    languageOptions: {
        globals: {
            global: true,
        }
    }
}];