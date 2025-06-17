// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'eqeqeq': ['error', 'always'],
      'default-case': 'error',
      'no-eval': 'error',
      'max-len': ['warn', { 'code': 100 }],
      'prefer-const': 'warn',
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-var': 'error'
    }
  },
]);
