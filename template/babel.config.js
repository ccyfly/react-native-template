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
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      // "blacklist": null, // DEPRECATED
      // "whitelist": null, // DEPRECATED
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }],
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    // {
    //   globals: ['__scanCodes'],
    // },
  ],
};
