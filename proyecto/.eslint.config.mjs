import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js.configs.recommended,
  ...next(),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      'no-console': 'warn'
    }
  }
];
