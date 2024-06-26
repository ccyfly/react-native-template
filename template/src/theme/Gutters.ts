import { StyleSheet } from 'react-native'

import { StyleType, ThemeGutters, ThemeMetricsSizes, ThemeVariables } from '@/theme/types'

export type GutterType = {
  BMargin: StyleType
  TMargin: StyleType
  RMargin: StyleType
  LMargin: StyleType
  VMargin: StyleType
  HMargin: StyleType
  Margin: StyleType
  BPadding: StyleType
  TPadding: StyleType
  RPadding: StyleType
  LPadding: StyleType
  VPadding: StyleType
  HPadding: StyleType
  Padding: StyleType
}
/**
 * Generate Styles depending on MetricsSizes vars availabled at ./Theme/Variables
 * Styles are like :
 * <size><direction><op>: {
 * <op><direction>: <value>
 * }
 * where:
 * <size>: is the key of the variable included in MetricsSizes
 * <direction>: can be ['Bottom','Top','Right','Left','Horizontal','Vertical']
 * <op>: can be ['Margin', 'Padding']
 * <value>: is the value of the <size>
 */

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default  ({ MetricsSizes: metricsSizes }: ThemeVariables): ThemeGutters => {
  return StyleSheet.create({
    ...Object.entries(metricsSizes).reduce(
      (acc, [key, value]) => ({
        ...acc,
        /* Margins */
        [`${key}BMargin`]: { marginBottom: value },
        [`${key}TMargin`]: { marginTop: value },
        [`${key}RMargin`]: { marginRight: value },
        [`${key}LMargin`]: { marginLeft: value },
        [`${key}VMargin`]: { marginVertical: value },
        [`${key}HMargin`]: { marginHorizontal: value },
        /* Paddings */
        [`${key}BPadding`]: { paddingBottom: value },
        [`${key}TPadding`]: { paddingTop: value },
        [`${key}RPadding`]: { paddingRight: value },
        [`${key}LPadding`]: { paddingLeft: value },
        [`${key}VPadding`]: { paddingVertical: value },
        [`${key}HPadding`]: { paddingHorizontal: value },
        [`${key}Padding`]: { padding: value },
      }),
      {},
    ),
  }) as ThemeGutters
}
