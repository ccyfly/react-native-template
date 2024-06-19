/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'

import { IThemeCommonParams, StyleType, ThemeCommon } from '@/theme/types'
import { normalize } from '@/utils'

import buttonStyles from './components/Buttons'
/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default  ({
  Colors: colors,
  Fonts: fonts,
  ...args
}: IThemeCommonParams): ThemeCommon => {

  return {
    button: buttonStyles({
      Colors: colors,
      Fonts: fonts,
      ...args,
    }),
    ...StyleSheet.create({
      backgroundPrimary: { backgroundColor: colors.primary },
      backgroundReset: { backgroundColor: colors.transparent },
      textInput: {
        // borderWidth: 1,
        // borderColor: colors.primary,
        // backgroundColor: colors.inputBackground,
        // borderRadius: 4,
        // color: colors.text,
        // minHeight: 34,
        // textAlign: 'left',
        // padding: 8,
        // marginTop: 10,
        // marginBottom: 10,
        height: normalize(44),
        fontSize: fonts.textInputMedium.fontSize,
      },
    }),
  }
}
