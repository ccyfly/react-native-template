import { Dimensions, Platform } from 'react-native'
const { height, width } = Dimensions.get('window')

const metrics = {
  s5: 5,
  s8: 8,
  s10: 10,
  s16: 16,
  s20: 20,
  s30: 30,
  s40: 40,
  s50: 50,
  s60: 60,

  borderWidth: 0.4,

  horizontalLineHeight: 1,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  drawerWidth: (4 / 5) * width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,

  buttonRadius: 4,

  icons: {
    tiny: 15,
    small: 32,
    medium: 40,
    large: 48,
    xl: 56,
  },

  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },

  iconButton: { padding: 4 },

  padding: {
    all: 10,
    horizontal: 10,
    vertical: 8,
  },

  size: {
    tiny: 5,
    small: 10,
    regular: 15,
    large: 20,
  },
}

export default metrics
