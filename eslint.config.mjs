import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    // Definindo as opções de parser
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        'react-native/react-native': true,
        node: true,
        browser: true,
        jest: true,
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-native/no-inline-styles': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'eslint:recommended': 'error',
      'plugin:react/recommended': 'error',
      'plugin:react-native/all': 'error',
      'plugin:@typescript-eslint/recommended': 'error',
      'plugin:import/errors': 'error',
      'plugin:import/warnings': 'error',
      'plugin:jsx-a11y/recommended': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
        
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      '.expo/',
    ],
  },
];
