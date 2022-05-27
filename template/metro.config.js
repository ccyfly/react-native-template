/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require("metro-config");
const path = require('path')
const extraNodeModules = {
  '@/': path.resolve(__dirname + '/src'),
}
const watchFolders = [
  path.resolve(__dirname + '/src'),
]
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    resolver: {
      extraNodeModules: new Proxy(extraNodeModules, {
        get: (target, name) =>
          name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
      }),
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    },
    watchFolders,
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  }
})();

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
