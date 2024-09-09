// module.exports = {
//   presets: ['babel-preset-expo'],
//   env: {
//     test: {
//       plugins: ['@babel/plugin-transform-modules-commonjs']
//     }
//   }
// }

// module.exports = {
//   presets: ['babel-preset-expo'],
//   env: {
//     test: {
//       presets: ['babel-preset-expo'],
//       plugins: [
//         '@babel/plugin-transform-modules-commonjs',
//       ],
//     },
//   },
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};