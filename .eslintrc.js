module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'vitest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:vitest/recommended',
    'prettier',
  ],
  rules: {
    'no-console': [1],
    '@typescript-eslint/ban-ts-comment': [1],
    '@typescript-eslint/no-explicit-any': [1],
  },
}
