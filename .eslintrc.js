module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    // Jest globals (describe/test/expect/jest/beforeEach/afterEach) only in test files.
    // Without this, ESLint reports them as `no-undef` errors.
    {
      files: ['__tests__/**/*.{ts,tsx,js,jsx}', '**/*.test.{ts,tsx,js,jsx}', 'jest.setup.js'],
      env: { jest: true, node: true },
    },
    // Bitwise operators are required for the SHA-256-style hash in activation.ts.
    // Disabling per-file is more honest than disabling globally.
    {
      files: ['src/utils/activation.ts'],
      rules: { 'no-bitwise': 'off' },
    },
  ],
};
