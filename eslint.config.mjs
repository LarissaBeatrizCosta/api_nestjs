// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      quotes: ['error', 'single'], 
      camelcase: 'error', 
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ], 
      curly: ['error', 'all'], 
      'prefer-template': 'error', 
      'no-useless-concat': 'error', 
      'prefer-const': 'error', 
      'no-extra-bind': 'error', 
      'no-useless-return': 'warn', 
      'no-duplicate-imports': 'error',
      'no-trailing-spaces': 'warn',
      'object-shorthand': 'warn', 
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'no-console': 'warn',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-types': 'warn',
      eqeqeq: ['error', 'always'],
    },
  },
);
