import { Theme as NavigationThemeType } from '@react-navigation/native'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { MD3Theme as PaperThemeType } from 'react-native-paper'

import { FontAlign, FontType, FontWithSize, MD3FontType } from '@/theme/Fonts'
import { GutterType } from '@/theme/Gutters'
import { ILayout } from '@/theme/Layout'

import { Colors, ownColor } from './Variables'

type MergeStyleKeys<A, B, C = StyleType> = { [P in
  `${Exclude<keyof A, symbol>}${Exclude<Capitalize<string & keyof B>, symbol>}`
  ]: C; }

// declare module '@/theme/types' {

export type StyleType = TextStyle & ViewStyle & ImageStyle

// export type ThemeColors = typeof Colors[keyof typeof Colors]


// export type ThemeNavigationTheme = {
//   dark: boolean
//   colors: ThemeNavigationColors
// }


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
type OwnColors = typeof ownColor
export type ThemeNavigationColors = PaperColors & NavigationColors & OwnColors
export type ThemeNavigationFonts = PaperThemeType['fonts']

export type ThemeNavigationTheme = NavigationThemeType & PaperThemeType
export type ThemeNavigationThemeWithOwn = ThemeNavigationTheme & { colors: OwnColors }

type MD3FontSizeKey = 'small' | 'medium' | 'large'
type FontSizeKey = MD3FontSizeKey | 'xlarge' | 'xxlarge'
export type ThemeFontSize = { [key in FontSizeKey]: number }
type IconSizeKey = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ThemeIconSize = { [key in IconSizeKey]: number }
// export type ThemeMetricsSizes = { [key: string]: number | string }
export type MetricsSizeKey = 'tiny' | 'small' | 'medium' | 'large'
export type ThemeMetricsSizes = { [key in MetricsSizeKey]: number }

export enum FontScale {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
export type ThemeScaledFontSize = { [key in FontScale]: ThemeFontSize }
export type ThemeParam = {
  roundness: number
  itemRoundness: number
  animation: {
    scale: number
  }
  headerHeight: number
}

export type ThemeVariables = {
  Colors: ThemeNavigationColors
  // NavigationColors: ThemeNavigationColors
  FontSize: ThemeFontSize
  IconSize: ThemeIconSize
  MetricsSizes: ThemeMetricsSizes
  ScaledFontSize: ThemeScaledFontSize
  Param: ThemeParam
}

type MD3FontSizes = { [key in MD3FontSizeKey]: number }
export type MD3Fonts = MergeStyleKeys<MD3FontType, MD3FontSizes, TextStyle> & { 'default': TextStyle }
export type ThemeFonts = MergeStyleKeys<FontWithSize, ThemeFontSize, TextStyle> & MD3Fonts & FontAlign & FontType
export type ThemeIcon = { [K in keyof ThemeIconSize as `${K}Icon`]: StyleType }
// export type ThemeLayout = { [key: string]: StyleType }
export type ThemeLayout<T> = {
  [key in keyof T]: StyleType
}
export type ThemeGutters = MergeStyleKeys<ThemeMetricsSizes, GutterType>

type ButtonType = 'base'|'rounded'|'outline'|'contentIconOnly'|'content' // |'outlineRounded'|'baseSecondary'|'roundedSecondary'|'outlineSecondary'|'outlineRoundedSecondary'
export type ButtonsStyle = { [key in ButtonType]: StyleType }
export type ThemeCommon = {
  // [key: string]: StyleType
  button: ButtonsStyle
  textInput: StyleType
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
  Param: ThemeParam
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
  Param?: Partial<ThemeParam>
}
// }
const PADDING_VARIATIONS = {
  padding: 'padding',
  paddingL: 'paddingLeft',
  paddingT: 'paddingTop',
  paddingR: 'paddingRight',
  paddingB: 'paddingBottom',
  paddingH: 'paddingHorizontal',
  paddingV: 'paddingVertical',
} as const
export type PaddingLiterals = keyof typeof PADDING_VARIATIONS
export type NativePaddingKeyType = typeof PADDING_VARIATIONS[PaddingLiterals]

export type Modifier<T extends string> = Partial<Record<T, boolean>>
export type PaddingModifiers = Modifier<PaddingLiterals>


export type ContainerModifiers = PaddingModifiers

