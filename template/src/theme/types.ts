import { Theme as NavigationThemeType } from '@react-navigation/native'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { MD3Theme as PaperThemeType } from 'react-native-paper/lib/typescript/types'

import { FontAlign, Fonts } from '@/theme/Fonts'
import { GutterType } from '@/theme/Gutters'
import { ILayout } from '@/theme/Layout'

import { Colors } from './Variables'

type MergeStyleKeys<A, B, C = StyleType> = { [P in
  `${Exclude<keyof A, symbol>}${Exclude<Capitalize<string & keyof B>, symbol>}`
  ]: C; }

// declare module '@/theme/types' {

export type StyleType = TextStyle & ViewStyle & ImageStyle

export type ThemeColors = typeof Colors[keyof typeof Colors]

// export type ThemeNavigationTheme = {
//   dark: boolean
//   colors: ThemeNavigationColors
// }
export type ThemeNavigationTheme = NavigationThemeType & PaperThemeType

// export type ThemeNavigationColors = {
//   primary: string
//   background: string
//   card: string
//   text: string
//   border: string
//   notification: string
// }

type NavigationColors = NavigationThemeType['colors']
type PaperColors = PaperThemeType['colors']
export type OwnColor = {
  secondary: string
  onSecondary: string
  onPrimary: string
  onBackground: string
  onError: string
  tertiary: string
  onTertiary: string
  surfaceVariant: string
  onSurfaceVariant: string
  buttonText: string

  transparent: string
  inputBackground: string
  statusBarBackgroundColor: string
  topBarBackgroundColor: string
  bottomTabActiveTextColor: string
  bottomTabInactiveTextColor: string
  homeBottomTabBackgroundColor: string
  mapBottomTabBackgroundColor: string
  storeListBottomTabBackgroundColor: string
}
export type ThemeNavigationColors = PaperColors & NavigationColors & OwnColor

type FontSizeKey = 'small' | 'regular' | 'large' | 'xlarge'
export type ThemeFontSize = { [key in FontSizeKey]: number }
type IconSizeKey = 'small' | 'regular' | 'large' | 'xlarge' | 'xxlarge'
export type ThemeIconSize = { [key in IconSizeKey]: number }
// export type ThemeMetricsSizes = { [key: string]: number | string }
type MetricsSizeKey = 'tiny' | 'small' | 'regular' | 'large'
export type ThemeMetricsSizes = { [key in MetricsSizeKey]: number }

export enum FontScale {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
export type ThemeScaledFontSize = { [key in FontScale]: ThemeFontSize }

export type ThemeVariables = {
  Colors: ThemeNavigationColors
  // NavigationColors: ThemeNavigationColors
  FontSize: ThemeFontSize
  IconSize: ThemeIconSize
  MetricsSizes: ThemeMetricsSizes
  ScaledFontSize: ThemeScaledFontSize
}

export type ThemeFonts = MergeStyleKeys<Fonts, ThemeFontSize, TextStyle> & FontAlign
export type ThemeIcon = { [K in keyof ThemeIconSize as `${K}Icon`]: StyleType }
// export type ThemeLayout = { [key: string]: StyleType }
export type ThemeLayout<T> = {
  [key in keyof T]: StyleType
}
export type ThemeGutters = MergeStyleKeys<ThemeMetricsSizes, GutterType>
export type ThemeCommon = {
  [key: string]: StyleType
  button: { [key: string]: StyleType }
}
export type ThemeImages = { [key: string]: any }

export type Theme = {
  Colors: ThemeNavigationColors
  // NavigationColors: ThemeNavigationColors
  FontSize: ThemeFontSize
  MetricsSizes: ThemeMetricsSizes
  IconSize: ThemeIconSize
  Fonts: ThemeFonts
  Icons: ThemeIcon
  Images: ThemeImages
  Layout: ThemeLayout<ILayout>
  Gutters: ThemeGutters
  Common: ThemeCommon
  Variables?: Partial<ThemeVariables>
  NavigationTheme: ThemeNavigationTheme
  darkMode: boolean
}
export interface IThemeCommonParams {
  Colors: ThemeNavigationColors
  // NavigationColors: ThemeNavigationColors
  FontSize: ThemeFontSize
  MetricsSizes: ThemeMetricsSizes
  Fonts: ThemeFonts
  Images: ThemeImages
  Layout: ThemeLayout<ILayout>
  Gutters: ThemeGutters
  Variables?: Partial<ThemeVariables>
}
// }
