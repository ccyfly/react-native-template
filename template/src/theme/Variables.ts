/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  FontScale,
  ThemeFontSize,
  ThemeIconSize,
  ThemeMetricsSizes,
  ThemeNavigationColors,
  ThemeScaledFontSize,
} from '@/theme/types'

export const ownColor =  {
  // onPrimary: '#FFFFFF',
  // secondary: '#625B71',
  // onSecondary: '#FFFFFF',
  // onError: '#FFFFFF',
  // onSurface: '#1C1B1F',
  // onBackground: '#1C1B1F',
  // tertiary: '#6f5575',
  // onTertiary: '#ffffff',
  // surfaceVariant: '#E7E0EC',
  // onSurfaceVariant: '#49454F',

  accent: 'rgb(84, 99, 77)',
  tintPrimary: '#E87B00',
  buttonText: '#101010',
  iconColor: 'rgb(67, 72, 63)',
  transparent: 'rgba(0,0,0,0)',
  negative: '#e3e3e3',
  onNegative: '#000000',
  inputBackground: '#FFFFFF',
  // statusBarBackgroundColor: 'rgba(2, 110, 0, .6)',
  statusBarBackgroundColor: 'rgba(0, 0, 0, .0)',
  topBarBackgroundColor: '#f0ced7',
  // Bottom Tab
  bottomTabActiveTextColor: '#009688',
  bottomTabInactiveTextColor: '#A8A8A8',
  homeBottomTabBackgroundColor: '#1565c0',
  rewardsBottomTabBackgroundColor: '#009688',
  storeListBottomTabBackgroundColor: '#607D8B',

  itemBackgroundColor: '#F5EFE6',

  grey: '#EBEBEB',
  white: '#FFFFF',
}

const navColors: Partial<ThemeNavigationColors> = {
  // primary: '#1565c0',
  // background: '#FFFFFF',
  // surface: '#FFFBFE',

  // error: '#D50000',
  border: '#ccc',
  text: 'rgb(82, 82, 82)',

  // Paper MD3 colors
  primary: '#FFCC02',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(255, 220, 197)',
  onPrimaryContainer: 'rgb(48, 20, 0)',
  secondary: '#FF9B1F',
  onSecondary: 'rgb(255, 255, 255)',
  secondaryContainer: 'rgb(255, 223, 157)',
  onSecondaryContainer: 'rgb(37, 26, 0)',
  tertiary: 'rgb(129, 85, 0)',
  onTertiary: 'rgb(255, 255, 255)',
  tertiaryContainer: 'rgb(255, 221, 178)',
  onTertiaryContainer: 'rgb(41, 24, 0)',
  error: 'rgb(186, 26, 26)',
  onError: 'rgb(255, 255, 255)',
  errorContainer: 'rgb(255, 218, 214)',
  onErrorContainer: 'rgb(65, 0, 2)',
  background: 'rgb(248, 238, 223)',
  onBackground: 'rgb(32, 26, 23)',
  surface: 'rgb(248, 238, 223)',
  onSurface: 'rgb(82, 82, 82)',
  surfaceVariant: 'rgb(248, 238, 223)', // 'rgb(243, 223, 210)',
  onSurfaceVariant: 'rgb(82, 68, 59)',
  outline: 'rgb(132, 116, 106)',
  outlineVariant: 'rgb(214, 195, 183)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(54, 47, 43)',
  inverseOnSurface: 'rgb(251, 238, 232)',
  inversePrimary: 'rgb(255, 183, 129)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(250, 242, 242)',
    level2: 'rgb(246, 237, 235)',
    level3: 'rgb(243, 232, 227)',
    level4: 'rgb(242, 230, 224)',
    level5: 'rgb(240, 226, 219)',
  },
  surfaceDisabled: 'rgba(32, 26, 23, 0.12)',
  onSurfaceDisabled: 'rgba(32, 26, 23, 0.38)',
  backdrop: 'rgba(58, 46, 38, 0.4)',
}

/**
 * Colors
 */
export const Colors: Partial<ThemeNavigationColors> = Object.assign(navColors, ownColor)

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  small: 13,
  medium: 18,
  large: 22,
  xlarge: 29,
  xxlarge: 43,
}
export const ScaledFontSize: ThemeScaledFontSize = {
  [FontScale.SMALL]: {
    small: 11,
    medium: 12,
    large: 14,
    xlarge: 24,
    xxlarge: 36,
  },
  [FontScale.MEDIUM]: {
    small: 13,
    medium: 18,
    large: 22,
    xlarge: 29,
    xxlarge: 43,
  },
  [FontScale.LARGE]: {
    small: 15,
    medium: 22,
    large: 30,
    xlarge: 40,
    xxlarge: 57,
  },
}

export const IconSize: ThemeIconSize = {
  small: 24,
  medium: 32,
  large: 45,
  xlarge: 60,
  xxlarge: 90,
}

/**
 * Metrics Sizes
 */
const tiny = 7
const small = tiny * 2
const medium = small * 2
const large = medium * 2
export const MetricsSizes: ThemeMetricsSizes = {
  tiny,
  small,
  medium,
  large,
}
const roundness = 4
export default {
  Colors,
  IconSize,
  // FontSize,
  ScaledFontSize,
  MetricsSizes,
  Param: {
    itemRoundness: 20,
    roundness,
    animation: {
      scale: 1.0,
    },
    headerHeight: 48,
  },
}
