// module.exports = {
//   preset: 'jest-expo',
//   setupFilesAfterEnv: [
//     '@testing-library/jest-native/extend-expect',
//     './jest-setup.ts'
//   ],
//   setupFiles: ['./jest-setup.ts'],
//   transformIgnorePatterns: [
//     'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-router)',
//   ],
// };

import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   preset: 'jest-expo',
//   setupFiles: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testEnvironment: "node",
//   transform: {
//   "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   transformIgnorePatterns: [
//     'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-router)',
//   ],
// };

// export default config;

const config: Config.InitialOptions = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",  // Transformación para JSX
    "^.+\\.tsx?$": "ts-jest",  // Transformación para TypeScript
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-router)',
  ],
};

export default config;


// module.exports = {
//   preset: 'react-native',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   setupFiles: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testEnvironment: 'node',
//   transformIgnorePatterns: [
//     'node_modules/(?!(jest-)?react-native|@react-native|react-navigation|@react-navigation|@react-native-community|@react-native-firebase|@react-native-async-storage/async-storage|@react-native-picker|react-native-gesture-handler/.*|react-native-reanimated/.*|@react-native-masked-text/.*|@react-native-svg/.*|@react-native-elements/.*|@react-native-community/.*)'
//   ],
  
// };