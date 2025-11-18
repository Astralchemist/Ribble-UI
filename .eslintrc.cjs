module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'storybook-static/',
    '*.config.js',
    '*.config.ts',
    'coverage/',
    'build/',
    '.storybook/',
  ],
  rules: {
    // Allow unused vars that start with underscore
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Allow explicit any in certain cases - can be tightened later
    '@typescript-eslint/no-explicit-any': 'warn',
    // Allow empty catch blocks - can be tightened later
    'no-empty': 'warn',
    // Turn off some overly strict rules for now
    'no-prototype-builtins': 'warn',
    'no-useless-escape': 'warn',
    'no-fallthrough': 'warn',
    'no-case-declarations': 'warn',
  },
  overrides: [
    {
      // CommonJS config files
      files: ['*.cjs', '*.config.js'],
      env: {
        node: true,
        commonjs: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off',
      },
    },
    {
      // Rollup config files
      files: ['**/rollup.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      // Test files
      files: ['**/__tests__/**/*', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
    {
      // Storybook files
      files: ['**/*.stories.ts', '**/*.stories.tsx', '.storybook/**/*'],
      rules: {
        'storybook/no-renderer-packages': 'off',
      },
    },
    {
      // Template files - allow more flexibility for example code
      files: ['templates/**/*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
};
