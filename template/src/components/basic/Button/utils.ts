import { black, white } from 'react-native-paper/src/styles/themes/v2/colors'

import { isDark } from '@/infrastructures/common/colorUtils'
import { ThemeNavigationColors } from '@/theme/types'

import { ButtonType } from './index'

const getButtonColor = (isType: (type: ButtonType) => boolean, colors: ThemeNavigationColors, darkMode: boolean, isPrimary: boolean, type: ButtonType, disabled?: boolean, customTextColor?: string, customButtonColor?: string, customBorderColor?: string, textColorOnTextOnly?: boolean) => {
  const backgroundColor = getButtonBackgroundColor(isType, colors, darkMode, isPrimary, type, disabled, customButtonColor)
  const borderColor = getBorderColor(isType, colors, darkMode, isPrimary, type, disabled, customTextColor, customButtonColor, customBorderColor)
  const textColor = getTextColor(isType, colors, darkMode, isPrimary, type, disabled, customTextColor, backgroundColor, textColorOnTextOnly)

  return {
    backgroundColor,
    borderColor,
    textColor,
  }
}
const getButtonBackgroundColor = (isType: (type: ButtonType) => boolean, colors: ThemeNavigationColors, darkMode: boolean, isPrimary: boolean, type: ButtonType, disabled?: boolean, customButtonColor?: string) => {
  if (customButtonColor && !disabled) {
    return customButtonColor
  }

  if (disabled) {
    if (isType('outline') || isType('text')) {
      return 'transparent'
    }

    return colors.surfaceDisabled
  }
  if (isType('round')) {
    return colors.primary
  }
  if (isType('contain')) {
    return colors.secondaryContainer
  }

  return 'transparent'
}
const getBorderColor = (isType: (type: ButtonType) => boolean, colors: ThemeNavigationColors, darkMode: boolean, isPrimary: boolean, type: ButtonType, disabled?: boolean, customTextColor?: string, customButtonColor?: string, customBorderColor?: string) => {
  if (disabled && isType('outline')) {
    return colors.surfaceDisabled
  }
  if ((customBorderColor || customTextColor) && isType('outline')) {
    return customBorderColor || customTextColor
  }
  if (isType('outline')) {
    return colors.primary
  }

  return 'transparent'
}
const getTextColor = (isType: (type: ButtonType) => boolean, colors: ThemeNavigationColors, darkMode: boolean, isPrimary: boolean, type: ButtonType, disabled?: boolean, customTextColor?: string, backgroundColor?: string, textColorOnTextOnly?: boolean) => {
  if (customTextColor && !disabled) {
    return customTextColor
  }
  if (disabled) {
    return colors.onSurfaceDisabled
  }
  if (darkMode) {
    if (isType('round') || isType('contain')) {
      return isDark({ dark: darkMode, backgroundColor }) ? white : black
    }
  }
  if (isType('outline') || isType('text') || isType('icon')) {
    return colors.primary
  }
  if (isType('round')) {
    return colors.onPrimary
  }
  if (isType('contain')) {
    return colors.onSecondaryContainer
  }
}

export {
  getButtonColor,
}
