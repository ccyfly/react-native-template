import { ThemeColors, ThemeNavigationColors } from '@/theme/types'

const Colors: Partial<ThemeNavigationColors> = {
  primary: '#3F51B5',
  background: '#8c8c8c',
  surface: '#FFFFFF',
  accent: '#64B5F6',
  error: '#D50000',
  text: '#EEEEEE',
  onSurface: '#000',
  onBackground: '#000',

  // Own Color
  secondary: '#00bcd4',
  onPrimary: '#ffffff',
  onSecondary: '#ffffff',
  buttonText: '#ffffff',
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  statusBarBackgroundColor: 'rgba(48,63,159, 0.7)',
  topBarBackgroundColor: '#f0ced7',
  primaryButtonBg: '#3655b3',
  primaryButtonText: '#EEEEEE',
  secondaryButtonBg: '#4d7aff',
  secondaryButtonText: '#010101',
  // Bottom Tab
  bottomTabActiveTextColor: '#f0edf6',
  bottomTabInactiveTextColor: '#A8A8A8',
  homeBottomTabBackgroundColor: '#1565c0',
  mapBottomTabBackgroundColor: '#009688',
  storeListBottomTabBackgroundColor: '#607D8B',
}

const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: Colors.background,
  surface: Colors.surface,
  accent: Colors.accent,
  error: Colors.error,
  text: Colors.text,
  onSurface: Colors.onSurface,

  // Own Color
  secondary: Colors.secondary,
  onBackground: Colors.onBackground,
  onPrimary: Colors.onPrimary,
  onSecondary: Colors.onSecondary,
  buttonText: Colors.buttonText,
  transparent: Colors.transparent,
  inputBackground: Colors.inputBackground,
  statusBarBackgroundColor: Colors.statusBarBackgroundColor,
  topBarBackgroundColor: Colors.topBarBackgroundColor,
  primaryButtonBg: Colors.primaryButtonBg,
  primaryButtonText: Colors.primaryButtonText,
  secondaryButtonBg: Colors.secondaryButtonBg,
  secondaryButtonText: Colors.secondaryButtonText,
  // Bottom Tab
  bottomTabActiveTextColor: Colors.bottomTabActiveTextColor,
  bottomTabInactiveTextColor: Colors.bottomTabInactiveTextColor,
  homeBottomTabBackgroundColor: Colors.homeBottomTabBackgroundColor,
  mapBottomTabBackgroundColor: Colors.mapBottomTabBackgroundColor,
  storeListBottomTabBackgroundColor: Colors.storeListBottomTabBackgroundColor,
}

export default {
  Colors,
  NavigationColors,
}
