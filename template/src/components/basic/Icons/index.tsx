/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createIconSetFromFontello, createIconSetFromIcoMoon } from 'react-native-vector-icons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'

// import fontelloConfig from '@/assets/fonts/config.json'
// const MyIcon = createIconSetFromFontello(fontelloConfig, 'myicon')

const IconType = {
  ICONICONS: 'ionicons',
  ANT_ICON: 'ant',
  EVIL_ICONS: 'EVIL',
  FONT_AWESOME: 'FONTAWESOME',
  FONT_AWESOME5: 'fontawwesome5',
  MATERIAL_ICONS: 'MaterialIcons',
  FEATHER_ICONS: 'FEATHER',
  ENTYPO: 'ENTYPO',
  OCTICONS: 'OCTICONS',
  MATERIAL_COMMUNITY: 'MATERIALCOMMUNITY',
  // MY_ICON: 'myicon',
}
type IconType = typeof IconType[keyof typeof IconType]
interface IIconXProps {
  origin: IconType
  name: string
  color?: string
  size?: number
  paddingLeft?: number
  // style?: StyleProp<TextStyle> | undefined
  forTouchable?: boolean
  style?: StyleProp<TextStyle>
}

type IconXType = typeof AntDesign |
  typeof Entypo |
  typeof Ionicons |
  typeof MaterialIcons |
  typeof FontAwesome5 |
  typeof Feather |
  typeof FontAwesome |
  typeof EvilIcons |
  typeof MaterialCommunityIcons

type IPanel<P> = React.FunctionComponent<P> & typeof IconType

const IconX: IPanel<IIconXProps> = ({
  color,
  name,
  origin,
  paddingLeft,
  size,
  style = {},
}: IIconXProps) => {

  const colorx = color || '#aaaaaa'
  const sizex = size || 26
  const namex = name || 'right'
  const paddingx = paddingLeft || 0

  let Element: IconXType = Ionicons

  switch (origin) {
    case IconType.ANT_ICON:
      Element = AntDesign
      break

    case IconType.ENTYPO:
      Element = Entypo
      break

    case IconType.MATERIAL_ICONS:
      Element = MaterialIcons
      break

    case IconType.FONT_AWESOME5:
      Element = FontAwesome5
      break

    case IconType.FEATHER_ICONS:
      Element = Feather
      break

    case IconType.EVIL_ICONS:
      Element = EvilIcons
      break

    case IconType.FONT_AWESOME:
      Element = FontAwesome
      break

    case IconType.OCTICONS:
      Element = Octicons
      break
    case IconType.MATERIAL_COMMUNITY:
      Element = MaterialCommunityIcons
      break
      // case IconType.MY_ICON:
      //   Element = MyIcon
      //   break

    default:
      Element = Ionicons
      break
  }

  return (
    <Element
      name={namex}
      size={sizex}
      color={colorx}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={[{ paddingLeft: paddingx }, style]}
    />
  )
}
IconX.ANT_ICON = IconType.ANT_ICON
IconX.ENTYPO = IconType.ENTYPO
IconX.EVIL_ICONS = IconType.EVIL_ICONS
IconX.FEATHER_ICONS = IconType.FEATHER_ICONS
IconX.FONT_AWESOME = IconType.FONT_AWESOME
IconX.FONT_AWESOME5 = IconType.FONT_AWESOME5
IconX.ICONICONS = IconType.ICONICONS
IconX.MATERIAL_COMMUNITY = IconType.MATERIAL_COMMUNITY
IconX.MATERIAL_ICONS = IconType.MATERIAL_ICONS
IconX.OCTICONS = IconType.OCTICONS
// IconX.MY_ICON = IconType.MY_ICON

export default IconX

