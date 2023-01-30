/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet, TextStyle } from 'react-native'
import { material } from 'react-native-typography'

import {
  FontScale,
  StyleType,
  ThemeFonts,
  ThemeFontSize,
  ThemeVariables,
} from '@/theme/types'

const titleFontStyle = material.titleObject
const bodyFontStyle = material.body1Object
const buttonFontStyle = material.buttonObject

export type Fonts = {
  text: StyleType
  buttonText: StyleType
  primaryButtonText: StyleType
  outlineButtonText: StyleType
  secondaryButtonText: StyleType
  title: StyleType
}
export type FontAlign = {
  textCenter: StyleType
  textJustify: StyleType
  textLeft: StyleType
  textRight: StyleType
}

export type MergeThemeFonts = ThemeFonts & {
  titleFontStyle: TextStyle
}

/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 * @param fontScale
 */
export default  ({ Colors: colors, ScaledFontSize: scaledFontSize }: ThemeVariables, fontScale: FontScale): MergeThemeFonts => {
  const fontSize = scaledFontSize[fontScale]
  const styles = StyleSheet.create<ThemeFonts & FontAlign>({

    textSmall: {
      fontSize: fontSize.small,
      color: colors.text,
    },
    textRegular: {
      fontSize: fontSize.regular,
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
    buttonTextSmall: {
      fontSize: fontSize.small,
      color: colors.text,
    },
    buttonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.text,
    },
    buttonTextLarge: {
      fontSize: fontSize.large,
      color: colors.text,
    },
    buttonTextXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.text,
    },
    primaryButtonTextSmall: {
      fontSize: fontSize.small,
      color: colors.onPrimary,
    },
    primaryButtonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.onPrimary,
    },
    primaryButtonTextLarge: {
      fontSize: fontSize.large,
      color: colors.onPrimary,
    },
    primaryButtonTextXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.onPrimary,
    },
    secondaryButtonTextSmall: {
      fontSize: fontSize.small,
      color: colors.onSecondary,
    },
    secondaryButtonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.onSecondary,
    },
    secondaryButtonTextLarge: {
      fontSize: fontSize.large,
      color: colors.onSecondary,
    },
    secondaryButtonTextXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.onSecondary,
    },
    outlineButtonTextSmall: {
      fontSize: fontSize.small,
      color: colors.onSurface,
    },
    outlineButtonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.onSurface,
    },
    outlineButtonTextLarge: {
      fontSize: fontSize.large,
      color: colors.onSurface,
    },
    outlineButtonTextXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.onSurface,
    },
    titleSmall: {
      fontSize: fontSize.small * 2,
      fontWeight: 'bold',
      color: colors.text,
    },
    titleRegular: {
      fontSize: fontSize.regular * 2,
      fontWeight: 'bold',
      color: colors.text,
    },
    titleLarge: {
      fontSize: fontSize.large * 2,
      fontWeight: 'bold',
      color: colors.text,
    },
    titleXlarge: {
      fontSize: fontSize.xlarge * 2,
      fontWeight: 'bold',
      color: colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })

  return Object.assign(styles, {
    bodyFontStyle,
    buttonFontStyle,
    titleFontStyle,
  }) as MergeThemeFonts
}
