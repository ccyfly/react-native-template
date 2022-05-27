export const Locale = {
  enUS: 'en_US',
  zhTW: 'zh_TW',
  zhCN: 'zh_CN',
}

export type Locale = typeof Locale[keyof typeof Locale]
