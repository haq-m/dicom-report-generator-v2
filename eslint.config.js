// @ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';
import * as svelteParser from 'svelte-eslint-parser';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));
const extraFileExtensions = ['.svelte'];

export default tseslint.config(
    includeIgnoreFile(gitignorePath),
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            svelte: eslintPluginSvelte
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        // Files that are in the root but not in the tsconfig or .gitignore
                        'cypress.config.ts',
                        'postcss.config.cjs',
                        'tailwind.config.ts',
                        'vite.test.config.ts'
                    ]
                },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        rules: {
            // https://eslint.org/docs/latest/rules/
            // https://typescript-eslint.io/rules/
            curly: 'error',
            'no-console': 'error',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { destructuredArrayIgnorePattern: '^_' }]
        }
    },
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked]
    },
    {
        files: [
            'src/**/*.svelte',
            'src/*.svelte',
            'src/**/*.svelte.ts',
            'src/*.svelte.ts',
            'src/**/*.svelte.js',
            'src/*.svelte.js'
        ],
        extends: [
            eslintPluginSvelte.configs['flat/recommended'],
            // https://www.npmjs.com/package/sv with prettier.
            prettier,
            eslintPluginSvelte.configs['flat/prettier'],
        ],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tseslint.parser,
                project: './tsconfig.json',
                svelteConfig,
                extraFileExtensions
            }
        },
        rules: {
            // https://sveltejs.github.io/eslint-plugin-svelte/rules/
            'svelte/block-lang': ['error', { script: 'ts' }],
            curly: 'error',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off'
        }
    },
    {
        files: ['**/+page.ts'],
        rules: {
            '@typescript-eslint/unbound-method': 'off'
        }
    }
);
