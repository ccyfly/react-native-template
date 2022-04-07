/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { material } from 'react-native-typography'

import { ThemeFonts, ThemeVariables } from '@/theme/types'

const titleFontStyle = material.titleObject
const bodyFontStyle = material.body1Object
const buttonFontStyle = material.buttonObject

/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default  ({ FontSize: fontSize, Colors: colors }: ThemeVariables): ThemeFonts => {
  const styles = StyleSheet.create({
    textSmall: {
      fontSize: fontSize.small,
      color: colors.text,
    },
    buttonTextSmall: {
      fontSize: fontSize.small,
      color: colors.text,
    },
    textRegular: {
      fontSize: fontSize.regular,
      color: colors.text,
    },
    primaryButtonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.onPrimary,
    },
    secondaryButtonTextRegular: {
      fontSize: fontSize.regular,
      color: colors.onSecondary,
    },
    textLarge: {
      fontSize: fontSize.large,
      color: colors.text,
    },
    buttonTextLarge: {
      fontSize: fontSize.large,
      color: colors.text,
    },
    textXlarge: {
      fontSize: fontSize.xlarge,
      color: colors.text,
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
  })
}
