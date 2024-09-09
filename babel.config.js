

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset' ],
//     env: {
//       test: {
//         plugins: ['@babel/plugin-transform-modules-commonjs']
//       },
//     }
//   };
// }






module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}