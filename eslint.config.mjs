import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/typings/storyblok.d.ts',
      'src/services/*',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    rules: {
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': 'off',
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
          allow: ['_id', '_uid'],
        },
      ],

      'react/no-array-index-key': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'no-confusing-arrow': 'off',
      'function-paren-newline': 'off',
    },
  },
];

export default eslintConfig;
