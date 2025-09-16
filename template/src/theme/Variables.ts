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

export const ownColor = {
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
  // React Navigation colors
  border: '#ccc',
  text: 'rgb(82, 82, 82)',
  card: '#FFFFFF',
  notification: '#FF0000',

  // Paper MD3 colors
  primary: 'rgb(0, 95, 175)',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(212, 227, 255)',
  onPrimaryContainer: 'rgb(0, 28, 58)',
  secondary: 'rgb(84, 95, 113)',
  onSecondary: 'rgb(255, 255, 255)',
  secondaryContainer: 'rgb(216, 227, 248)',
  onSecondaryContainer: 'rgb(17, 28, 43)',
  tertiary: 'rgb(110, 86, 118)',
  onTertiary: 'rgb(255, 255, 255)',
  tertiaryContainer: 'rgb(247, 216, 255)',
  onTertiaryContainer: 'rgb(39, 20, 48)',
  error: 'rgb(186, 26, 26)',
  onError: 'rgb(255, 255, 255)',
  errorContainer: 'rgb(255, 218, 214)',
  onErrorContainer: 'rgb(65, 0, 2)',
  background: 'rgb(253, 252, 255)',
  onBackground: 'rgb(26, 28, 30)',
  surface: 'rgb(253, 252, 255)',
  onSurface: 'rgb(26, 28, 30)',
  surfaceVariant: 'rgb(224, 226, 236)',
  onSurfaceVariant: 'rgb(67, 71, 78)',
  outline: 'rgb(116, 119, 127)',
  outlineVariant: 'rgb(195, 198, 207)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(47, 48, 51)',
  inverseOnSurface: 'rgb(241, 240, 244)',
  inversePrimary: 'rgb(165, 200, 255)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(240, 244, 251)',
    level2: 'rgb(233, 239, 249)',
    level3: 'rgb(225, 235, 246)',
    level4: 'rgb(223, 233, 245)',
    level5: 'rgb(218, 230, 244)',
  },
  surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
  onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
  backdrop: 'rgba(45, 49, 56, 0.4)',
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
