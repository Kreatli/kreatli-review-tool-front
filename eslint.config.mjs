import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['src/services/**/*']),
  {
    extends: fixupConfigRules(
      compat.extends(
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended'
      ),
    ),

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react/jsx-props-no-spreading': 'off',
      'object-curly-newline': 'off',
      'arrow-body-style': 'off',
      'operator-linebreak': 'off',

      'react/jsx-wrap-multilines': [
        'error',
        {
          prop: false,
        },
      ],

      'react/function-component-definition': 'off',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      'implicit-arrow-linebreak': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'react/jsx-no-constructed-context-values': 'off',

      'max-len': [
        'error',
        {
          code: 120,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
        },
      ],

      'consistent-return': 'off',
      'react/jsx-one-expression-per-line': 'off',

      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],

      'react/no-array-index-key': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'no-confusing-arrow': 'off',
      'function-paren-newline': 'off',
    },
  },
]);
