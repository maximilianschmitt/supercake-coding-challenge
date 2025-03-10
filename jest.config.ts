import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Ensures TypeScript files are transformed correctly
  testEnvironment: 'jsdom', // Needed for testing React components
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Use ts-jest to transform JSX/TSX files
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Mock CSS imports
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;