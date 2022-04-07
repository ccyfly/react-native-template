/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

import { ThemeIcon, ThemeVariables } from '@/theme/types'

/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default  ({ IconSize: iconSize }: ThemeVariables): ThemeIcon => {
  return StyleSheet.create({
    ...Object.entries(iconSize).reduce(
      (acc, [key, value]) => ({
        ...acc,
        /* Margins */
        [`${key}Icon`]: {
          width: value,
          height: value,
        },
      }),
      {},
    ),
  })
}

