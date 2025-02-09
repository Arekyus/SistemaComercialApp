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
      // Regras personalizadas e plugins
      'react/react-in-jsx-scope': 'off', // React não precisa ser importado em JSX com React 17+
      'react/prop-types': 'off', // Desativa a exigência de prop-types
      'jsx-a11y/anchor-is-valid': 'off', // Desativa a exigência de âncoras válidas
      '@typescript-eslint/no-explicit-any': 'off', // Permite 'any' no TypeScript
      '@typescript-eslint/no-unused-vars': 'warn', // Avisos de variáveis não usadas no TypeScript
      'react-native/no-inline-styles': 'off', // Desativa a restrição de estilos inline no React Native
      'import/no-unresolved': 'off', // Ignora problemas de importação não resolvidos
      'import/no-extraneous-dependencies': 'off', // Ignora dependências extra
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
        version: 'detect', // Detecta a versão do React automaticamente
      },
    },
    // Regras específicas para arquivos TypeScript, sem o uso de "overrides"
    
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
