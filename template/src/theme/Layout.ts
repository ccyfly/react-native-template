import { StyleSheet } from 'react-native'

import { StyleType, ThemeLayout, ThemeVariables } from '@/theme/types'

const layoutStyle = {
  /* Column Layouts */
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnReverse: { flexDirection: 'column-reverse' },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  /* Row Layouts */
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsEnd: { alignItems: 'flex-end' },
  alignItemsStart: { alignItems: 'flex-start' },
  alignItemsStretch: { alignItems: 'stretch' },
  justifyContentStart: { justifyContent: 'flex-start' },
  justifyContentEnd: { justifyContent: 'flex-end' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentAround: { justifyContent: 'space-around' },
  justifyContentBetween: { justifyContent: 'space-between' },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: { alignSelf: 'stretch' },
  selfFlexStart: { alignSelf: 'flex-start' },
  /* Sizes Layouts */
  fill: { flex: 1 },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  /* Operation Layout */
  mirror: { transform: [{ scaleX: -1 }] },
  rotate90: { transform: [{ rotate: '90deg' }] },
  rotate90Inverse: { transform: [{ rotate: '-90deg' }] },
  flexWrap: { flexWrap: 'wrap' },

  abs: {
    position: 'absolute',
  },
  absFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  htmlRender: {
    p: {
      marginTop: 0,
    },
  },
}
type LayoutStyleType = typeof layoutStyle
export type ILayout = { [P in keyof LayoutStyleType]: StyleType }
/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default ({}: ThemeVariables): ThemeLayout<ILayout> => {
  const layout = StyleSheet.create(layoutStyle as ILayout)

  return layout
}
