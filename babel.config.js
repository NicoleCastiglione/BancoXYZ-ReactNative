
/*
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset' ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs']
      },
    }
  };
}
*/

// jest.config.js
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-navigation|@react-navigation|@react-native-community|@react-native-firebase|@react-native-async-storage/async-storage|@react-native-picker|react-native-gesture-handler/.*|react-native-reanimated/.*|@react-native-masked-text/.*|@react-native-svg/.*|@react-native-elements/.*|@react-native-community/.*)'
  ],
};



// module.exports = {
//   presets: ['babel-preset-expo'],
//   env: {
//     test: {
//       plugins: ['@babel/plugin-transform-modules-commonjs']
//     }
//   }
// 