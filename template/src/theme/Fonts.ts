/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

import logger from '@/infrastructures/common/logger'
import {
  FontScale,
  MD3Fonts,
  StyleType,
  ThemeFonts,
  ThemeFontSize,
  ThemeVariables,
} from '@/theme/types'
import { normalize } from '@/utils'

type FontWithSizeName = 'text' | 'buttonText' | 'textInput'
export type FontWithSize = {[key in FontWithSizeName]: StyleType}
export type FontAlign = {
  textCenter: StyleType
  textVCenter: StyleType
  textJustify: StyleType
  textLeft: StyleType
  textRight: StyleType
}

export type MD3FontType = {
  display: StyleType
  headline: StyleType
  title: StyleType
  label: StyleType
  body: StyleType
}

type CustomFontName =
  'textShadow'|
  'settingText'

type CustomFontType = {[key in CustomFontName]: StyleType}
export type FontType = MD3FontType & CustomFontType

export type MergeThemeFonts = ThemeFonts & {
  // titleFontStyle: TextStyle
}

/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 * @param fontScale
 */
export default  ({ Colors: colors, ScaledFontSize: scaledFontSize }: ThemeVariables, fontScale: FontScale): MergeThemeFonts => {
  const fontSize = scaledFontSize[fontScale]
  const md3Fonts: MD3Fonts = {
    displaySmall: {
      fontSize: scaledFontSize[FontScale.SMALL].xxlarge,
      letterSpacing: 0,
      lineHeight: 44,
    },
    displayMedium: {
      fontSize: scaledFontSize[FontScale.MEDIUM].xxlarge,
      letterSpacing: 0,
      lineHeight: 52,
    },
    displayLarge: {
      fontSize: scaledFontSize[FontScale.LARGE].xxlarge,
      letterSpacing: 0,
      lineHeight: 64,
    },
    headlineSmall: {
      fontSize: scaledFontSize[FontScale.SMALL].xlarge,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 32,
    },
    headlineMedium: {
      fontSize: scaledFontSize[FontScale.MEDIUM].xlarge,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontSize: scaledFontSize[FontScale.LARGE].xlarge,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 44,
    },
    titleSmall: { fontSize: scaledFontSize[FontScale.SMALL].large, fontWeight: 'bold' },
    titleMedium: { fontSize: scaledFontSize[FontScale.MEDIUM].large, fontWeight: 'bold' },
    titleLarge: { fontSize: scaledFontSize[FontScale.LARGE].large, fontWeight: 'bold' },
    labelSmall: { fontSize: scaledFontSize[FontScale.SMALL].small },
    labelMedium: { fontSize: scaledFontSize[FontScale.MEDIUM].small },
    labelLarge: { fontSize: scaledFontSize[FontScale.LARGE].small },
    bodySmall: { fontSize: scaledFontSize[FontScale.SMALL].medium },
    bodyMedium: { fontSize: normalize(scaledFontSize[FontScale.MEDIUM].medium) },
    bodyLarge: { fontSize: scaledFontSize[FontScale.LARGE].medium },
    default: { fontSize: scaledFontSize[FontScale.MEDIUM].medium },
  }

  return StyleSheet.create<ThemeFonts & FontAlign & MD3Fonts>({
    display: {
      fontSize: fontSize.xxlarge,
      fontWeight: '400',
    },
    headline: {
      fontSize: fontSize.xlarge,
      fontWeight: '400',
    },
    title: {
      fontSize: fontSize.large,
      fontWeight: '500',
    },
    label: {
      fontSize: fontSize.small,
      fontWeight: '500',
    },
    body: {
      fontSize: fontSize.medium,
      fontWeight: '400',
    },
    textSmall: {
      fontSize: fontSize.small,
      color: colors.text,
    },
    textMedium: {
      fontSize: fontSize.medium,
      color: colors.text,
    },
    textLarge: {
      fontSize: fontSize.large,
      color: colors.text,
    },
    textXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.text,
    },
    textXxlarge: {
      fontSize: fontSize.xxlarge,
      color: colors.text,
    },
    buttonTextSmall: {
      fontSize: fontSize.small,
    },
    buttonTextMedium: {
      fontSize: fontSize.medium,
    },
    buttonTextLarge: {
      fontSize: fontSize.large,
    },
    buttonTextXlarge: {
      fontSize: fontSize.xlarge,
    },
    buttonTextXxlarge: {
      fontSize: fontSize.xxlarge,
    },
    textInputSmall: {
      fontSize: fontSize.small - 2,
    },
    textInputMedium: {
      fontSize: fontSize.medium - 2,
    },
    textInputLarge: {
      fontSize: fontSize.large - 2,
    },
    textInputXlarge: {
      fontSize: fontSize.xlarge - 2,
    },
    textInputXxlarge: {
      fontSize: fontSize.xxlarge - 2,
    },
    textCenter: { textAlign: 'center' },
    textVCenter: { textAlignVertical: 'center' },
    textJustify: { textAlign: 'justify' },
    textLeft: { textAlign: 'left' },
    textRight: { textAlign: 'right' },
    ...md3Fonts,

    // Custom Font
    textShadow: {
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    settingText: {
      fontSize: normalize(20),
      fontWeight: '600',
    },
  })

  // return Object.assign(styles, {
  //   bodyFontStyle,
  //   buttonFontStyle,
  //   titleFontStyle,
  // }) as MergeThemeFonts
}
