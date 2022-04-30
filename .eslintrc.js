module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-duplicates': 'off',
    'no-console': 'warn',
    'no-nested-ternary': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'import/prefer-default-export': 'off'
  }
};
