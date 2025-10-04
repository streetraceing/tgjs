// @ts-check

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    {
        ignores: ['eslint.config.mjs', "node_modules/**", "dist/**"],
    },
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
            }
        }
    }
);