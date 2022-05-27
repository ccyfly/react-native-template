/* eslint-disable @typescript-eslint/naming-convention */
export const StorageKeys = {
  APP_LANG: 'APP_LANG',
  EMAIL_SIGNIN_LINK: 'EMAIL_SIGNIN_LINK',
} as const

export const BundleId = {
  ios: 'com.ccctech.exampleapp',
  android: 'com.ccctech.exampleapp',
}

export type StorageKeys = typeof StorageKeys[keyof typeof StorageKeys]
