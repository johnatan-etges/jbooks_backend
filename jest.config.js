/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  collectCoverageFrom: ['**/src/**/*.ts'],
  testMatch: ["**/tests/**/*.spec.ts"]
};