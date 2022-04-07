/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  OwnColor,
  ThemeColors,
  ThemeFontSize,
  ThemeIconSize,
  ThemeMetricsSizes,
  ThemeNavigationColors,
} from '@/theme/types'

const ownColor: OwnColor =  {
  onPrimary: '#FFFFFF',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  onError: '#FFFFFF',
  onBackground: '#1C1B1F',
  tertiary: '#6f5575',
  onTertiary: '#ffffff',
  transparent: 'rgba(0,0,0,0)',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',

  inputBackground: '#FFFFFF',
  statusBarBackgroundColor: 'rgba(48,63,159, 0.7)',
  topBarBackgroundColor: '#f0ced7',
  // Bottom Tab
  bottomTabActiveTextColor: '#f0edf6',
  bottomTabInactiveTextColor: '#A8A8A8',
  homeBottomTabBackgroundColor: '#1565c0',
  mapBottomTabBackgroundColor: '#009688',
  storeListBottomTabBackgroundColor: '#607D8B',
}

/**
 * Colors
 */
export const Colors: Partial<ThemeNavigationColors> = Object.assign(
  {
    primary: '#1565c0',
    background: '#FFFBFE',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    accent: ownColor.secondary,
    error: '#D50000',
    text: '#101010',
  },
  ownColor)

// export const NavigationColors: Partial<ThemeNavigationColors> = {
//   primary: Colors.primary,
//   background: Colors.background,
//   surface: Colors.surface,
//   accent: Colors.accent,
//   error: Colors.error,
//   text: Colors.text,
//   onSurface: Colors.onSurface,

//   // Own Color
//   secondary: Colors.secondary,
//   onBackground: Colors.onBackground,
//   onPrimary: Colors.onPrimary,
//   onSecondary: Colors.onSecondary,
//   transparent: Colors.transparent,
//   inputBackground: Colors.inputBackground,
//   statusBarBackgroundColor: Colors.statusBarBackgroundColor,
//   topBarBackgroundColor: Colors.topBarBackgroundColor,
//   buttonText: Colors.buttonText,
//   bottomTabActiveTextColor: Colors.bottomTabActiveTextColor,
//   bottomTabInactiveTextColor: Colors.bottomTabInactiveTextColor,
//   homeBottomTabBackgroundColor: Colors.homeBottomTabBackgroundColor,
//   mapBottomTabBackgroundColor: Colors.mapBottomTabBackgroundColor,
//   storeListBottomTabBackgroundColor: Colors.storeListBottomTabBackgroundColor,
// }

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  small: 12,
  regular: 16,
  large: 24,
  xlarge: 36,
}

export const IconSize: ThemeIconSize = {
  small: 24,
  regular: 32,
  large: 45,
  xlarge: 60,
  xxlarge: 90,
}

/**
 * Metrics Sizes
 */
const tiny = 6
const small = tiny * 2
const regular = tiny * 3
const large = regular * 2
export const MetricsSizes: ThemeMetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  // NavigationColors,
  IconSize,
  FontSize,
  MetricsSizes,
}
