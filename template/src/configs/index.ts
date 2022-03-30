/* eslint-disable @typescript-eslint/naming-convention */
export const StorageKeys = {
  APP_LANG: 'APP_LANG',
} as const

export type StorageKeys = typeof StorageKeys[keyof typeof StorageKeys]
