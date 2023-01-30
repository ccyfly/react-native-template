module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [
        '@emotion',
        'react-native-paper/babel'
      ],
    },
  },
  plugins: [
    '@emotion',
    [
      'module-resolver',
      {
        root: ["."],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
