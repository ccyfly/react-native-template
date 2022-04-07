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

  statusBarBackgroundColor: '#303F9F',
  topBarBackgroundColor: '#f0ced7',
  // Bottom Tab
  bottomTabActiveTextColor: '#f0edf6',
  bottomTabInactiveTextColor: '#3e2465',
  homeBottomTabBackgroundColor: '#3F51B5',
  mapBottomTabBackgroundColor: '#009688',
  storeListBottomTabBackgroundColor: '#607D8B',
}

// const NavigationColors: Partial<ThemeNavigationColors> = {
//   primary: Colors.primary,
//   background: Colors.background,
//   surface: Colors.surface,
//   accent: Colors.accent,
//   error: Colors.error,
//   text: Colors.text,
//   onSurface: Colors.onSurface,

//   // Own Color
//   statusBarBackgroundColor: Colors.statusBarBackgroundColor,
//   topBarBackgroundColor: Colors.topBarBackgroundColor,
//   buttonText: Colors.buttonText,

//   bottomTabActiveTextColor: Colors.bottomTabActiveTextColor,
//   bottomTabInactiveTextColor: Colors.bottomTabInactiveTextColor,
//   homeBottomTabBackgroundColor: Colors.homeBottomTabBackgroundColor,
//   mapBottomTabBackgroundColor: Colors.mapBottomTabBackgroundColor,
//   storeListBottomTabBackgroundColor: Colors.storeListBottomTabBackgroundColor,
// }

export default {
  Colors,
}
