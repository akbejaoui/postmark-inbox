/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["dotenv/config"],
    moduleNameMapper: {
      '^@models/(.*)$': '<rootDir>/src/models/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@shared/(.*)$': '<rootDir>/src/shared/$1',
      '^@controllers/(.*)$': '<rootDir>/src/graphql/$1',
    },
  };