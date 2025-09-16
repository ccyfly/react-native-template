module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-worklets/plugin',
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
  ],
};
