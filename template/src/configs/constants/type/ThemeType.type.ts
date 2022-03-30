// export enum ThemeType {
//   LIGHT = 'light',
//   DARK = 'dark',
// }

// export type ThemeType = {
//   LIGHT: 'light'
//   DARK: 'dark'
// }

export const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeType = typeof ThemeType[keyof typeof ThemeType]
