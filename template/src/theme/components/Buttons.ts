import { StyleSheet } from 'react-native'

import { IThemeCommonParams } from '@/theme/types'

export default ({ Colors: colors, Gutters: gutters, Layout: layout }: IThemeCommonParams) => {
  const base = {
    ...layout.center,
    ...gutters.largeHPadding,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 2,
  }
  const rounded = {
    ...base,
    borderRadius: 16,
  }
  const outline = {
    ...base,
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary,
  }
  const baseSecondary = {
    ...base,
    backgroundColor: colors.secondary,
  }
  const roundedSecondary = {
    ...baseSecondary,
    borderRadius: 16,
  }

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...outline,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: colors.transparent,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    baseSecondary,
    roundedSecondary,
    outlineSecondary: {
      ...outline,
      borderColor: colors.secondary,
    },
    outlineRoundedSecondary: {
      ...roundedSecondary,
      backgroundColor: colors.transparent,
      borderWidth: 2,
      borderColor: colors.secondary,
    },
  })
}
