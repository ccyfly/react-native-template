/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'

import { IThemeCommonParams } from '@/theme/types'

import buttonStyles from './components/Buttons'
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default  ({ Colors: colors, ...args }: IThemeCommonParams) => {
  return {
    button: buttonStyles({
      Colors: colors,
      ...args,
    }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: colors.primary,
      },
      backgroundReset: {
        backgroundColor: colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: colors.text,
        backgroundColor: colors.inputBackground,
        color: colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
    }),
  }
}
