import { Theme as NavigationThemeType } from '@react-navigation/native'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { Theme as PaperThemeType } from 'react-native-paper/lib/typescript/types'
import { Colors } from './Variables'

declare module '@/theme/types' {
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

  type PaperColors = NavigationThemeType['colors']
  type NavigationColors = PaperThemeType['colors']
  type OwnColor = {
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
  export type ThemeFontSize = { [key: string]: number }
  export type ThemeIconSize = { [key: string]: number }
  // export type ThemeMetricsSizes = { [key: string]: number | string }
  export type ThemeMetricsSizes = { [key: string]: number }

  export type ThemeVariables = {
    Colors: ThemeNavigationColors
    // NavigationColors: ThemeNavigationColors
    FontSize: ThemeFontSize
    IconSize: ThemeIconSize
    MetricsSizes: ThemeMetricsSizes
  }

  export type ThemeFonts = { [key: string]: TextStyle }
  export type ThemeIcon = { [key: string]: StyleType }
  export type ThemeLayout = { [key: string]: StyleType }
  export type ThemeGutters = { [key: string]: StyleType }
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
    Layout: ThemeLayout
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
    Layout: ThemeLayout
    Gutters: ThemeGutters
    Variables?: Partial<ThemeVariables>
  }
}