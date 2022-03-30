// export enum Locale {
//   EN_US = 'en_US',
//   ZH_TW = 'zh_TW',
//   ZH_CN = 'zh_CN',
// }

export const Locale = {
  enUS: 'en_US',
  zhTW: 'zh_TW',
  zhCN: 'zh_CN',
}

export type Locale = typeof Locale[keyof typeof Locale]
