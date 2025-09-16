import { ThemeNavigationColors } from '@/theme/types'

const ownColor = {
  accent: 'rgb(150, 170, 140)',       // lighter accent to pop on dark bg
  tintPrimary: '#FF9F45',             // warm tint still vibrant
  buttonText: '#FFFFFF',              // white text for readability
  iconColor: 'rgb(200, 205, 190)',    // lighter icons
  transparent: 'rgba(0,0,0,0)',
  negative: '#2b2b2b',                // dark gray background
  onNegative: '#FFFFFF',              // white text on dark
  inputBackground: '#1E1E1E',         // typical dark input background
  statusBarBackgroundColor: 'rgba(0, 0, 0, .6)',
  topBarBackgroundColor: '#2d1e24',   // darker variant of light theme pinkish
  // Bottom Tab
  bottomTabActiveTextColor: '#80CBC4',     // teal shade that stands out on dark
  bottomTabInactiveTextColor: '#777777',   // muted gray
  homeBottomTabBackgroundColor: '#0d47a1', // darker blue
  rewardsBottomTabBackgroundColor: '#004d40', // darker teal
  storeListBottomTabBackgroundColor: '#37474F', // dark slate

  itemBackgroundColor: '#1E1A15',

  grey: '#EBEBEB',
  white: '#FFFFF',
}

const navColors: Partial<ThemeNavigationColors> = {
  // React Navigation colors
  card: 'rgb(18, 18, 18)',
  text: 'rgb(229, 229, 231)',
  border: 'rgb(39, 39, 41)',
  notification: 'rgb(255, 69, 58)',

  buttonText: 'rgb(226, 227, 220)',
  statusBarBackgroundColor: 'rgba(48,63,159, 0.7)',

  accent: 'rgb(84, 99, 77)',

  // react-native-paper MD3 colors
  primary: 'rgb(165, 200, 255)',
  onPrimary: 'rgb(0, 49, 95)',
  primaryContainer: 'rgb(0, 71, 134)',
  onPrimaryContainer: 'rgb(212, 227, 255)',
  secondary: 'rgb(188, 199, 220)',
  onSecondary: 'rgb(39, 49, 65)',
  secondaryContainer: 'rgb(61, 71, 88)',
  onSecondaryContainer: 'rgb(216, 227, 248)',
  tertiary: 'rgb(218, 189, 226)',
  onTertiary: 'rgb(61, 40, 70)',
  tertiaryContainer: 'rgb(85, 63, 93)',
  onTertiaryContainer: 'rgb(247, 216, 255)',
  error: 'rgb(255, 180, 171)',
  onError: 'rgb(105, 0, 5)',
  errorContainer: 'rgb(147, 0, 10)',
  onErrorContainer: 'rgb(255, 180, 171)',
  background: 'rgb(26, 28, 30)',
  onBackground: 'rgb(227, 226, 230)',
  surface: 'rgb(26, 28, 30)',
  onSurface: 'rgb(227, 226, 230)',
  surfaceVariant: 'rgb(67, 71, 78)',
  onSurfaceVariant: 'rgb(195, 198, 207)',
  outline: 'rgb(141, 145, 153)',
  outlineVariant: 'rgb(67, 71, 78)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(227, 226, 230)',
  inverseOnSurface: 'rgb(47, 48, 51)',
  inversePrimary: 'rgb(0, 95, 175)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(33, 37, 41)',
    level2: 'rgb(37, 42, 48)',
    level3: 'rgb(41, 47, 55)',
    level4: 'rgb(43, 49, 57)',
    level5: 'rgb(46, 52, 62)',
  },
  surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
  onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
  backdrop: 'rgba(45, 49, 56, 0.4)',
}

const Colors: Partial<ThemeNavigationColors> = Object.assign(navColors, ownColor)

export default { Colors }
