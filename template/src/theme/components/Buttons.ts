import { StyleSheet } from 'react-native'

import { ButtonsStyle, IThemeCommonParams } from '@/theme/types'

export default ({ Colors: colors, Gutters: gutters, Layout: layout, Param: param }: IThemeCommonParams): ButtonsStyle => {
  const roundness = param?.roundness || 4
  const borderRadius = roundness * 6
  const base = {
    borderRadius: borderRadius,
  }
  const rounded = {
    ...base,
    borderRadius: borderRadius,
  }
  const outline = {
    ...base,
    borderRadius: borderRadius,
    borderWidth: 1,
  }
  const content = {
    ...layout.row,
    minWidth: 40,
    minHeight: 40,
  }
  const contentIconOnly = {
    ...content,
    minWidth: 40,
  }

  return StyleSheet.create({
    base,
    content,
    contentIconOnly,
    rounded,
    outline: { ...outline },
  })
}
