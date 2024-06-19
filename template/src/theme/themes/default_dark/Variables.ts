import { ThemeNavigationColors } from '@/theme/types'

const Colors: Partial<ThemeNavigationColors> = {
  buttonText: 'rgb(226, 227, 220)',
  statusBarBackgroundColor: 'rgba(48,63,159, 0.7)',

  accent: 'rgb(84, 99, 77)',
  text: 'rgb(226, 227, 220)',

  // react-native-paper MD3 colors
  primary: 'rgb(255, 183, 129)',
  onPrimary: 'rgb(79, 37, 0)',
  primaryContainer: 'rgb(112, 56, 0)',
  onPrimaryContainer: 'rgb(255, 220, 197)',
  secondary: 'rgb(242, 191, 69)',
  onSecondary: 'rgb(63, 46, 0)',
  secondaryContainer: 'rgb(91, 67, 0)',
  onSecondaryContainer: 'rgb(255, 223, 157)',
  tertiary: 'rgb(255, 185, 76)',
  onTertiary: 'rgb(68, 43, 0)',
  tertiaryContainer: 'rgb(98, 64, 0)',
  onTertiaryContainer: 'rgb(255, 221, 178)',
  error: 'rgb(255, 180, 171)',
  onError: 'rgb(105, 0, 5)',
  errorContainer: 'rgb(147, 0, 10)',
  onErrorContainer: 'rgb(255, 180, 171)',
  background: 'rgb(32, 26, 23)',
  onBackground: 'rgb(236, 224, 218)',
  surface: 'rgb(32, 26, 23)',
  onSurface: 'rgb(236, 224, 218)',
  surfaceVariant: 'rgb(82, 68, 59)',
  onSurfaceVariant: 'rgb(214, 195, 183)',
  outline: 'rgb(159, 141, 131)',
  outlineVariant: 'rgb(82, 68, 59)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(236, 224, 218)',
  inverseOnSurface: 'rgb(54, 47, 43)',
  inversePrimary: 'rgb(147, 75, 0)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(43, 34, 28)',
    level2: 'rgb(50, 39, 32)',
    level3: 'rgb(57, 43, 35)',
    level4: 'rgb(59, 45, 36)',
    level5: 'rgb(63, 48, 38)',
  },
  surfaceDisabled: 'rgba(236, 224, 218, 0.12)',
  onSurfaceDisabled: 'rgba(236, 224, 218, 0.38)',
  backdrop: 'rgba(58, 46, 38, 0.4)',
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

export default { Colors }
