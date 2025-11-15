// @ts-check
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig(
    {
        ignores: ['node_modules/**', 'dist/**'],

        plugins: {
            'simple-import-sort': simpleImportSort,
        },

        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\w', '^(@|src)(/.*|$)'],

                        ['^\\u0000'],

                        ['^\\*'],

                        ['^\\{'],
                    ],
                },
            ],

            'simple-import-sort/exports': 'error',

            'sort-imports': [
                'error',
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    memberSyntaxSortOrder: [
                        'none',
                        'all',
                        'multiple',
                        'single',
                    ],
                },
            ],
        },
    },
    eslintPluginPrettierRecommended,
);
