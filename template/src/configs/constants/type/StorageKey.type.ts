export const StorageKey = {
  token: 'token',
  appLang: 'appLang',
  deviceToken: 'deviceToken',
} as const

export type StorageKey = typeof StorageKey[keyof typeof StorageKey]
