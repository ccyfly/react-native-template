/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
import { AntDesign } from '@react-native-vector-icons/ant-design'
import { EvilIcons } from '@react-native-vector-icons/evil-icons'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import { Lucide } from '@react-native-vector-icons/lucide'
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons'
import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createIconSetFromFontello, createIconSetFromIcoMoon } from 'react-native-vector-icons'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import Entypo from 'react-native-vector-icons/Entypo'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import Feather from 'react-native-vector-icons/Feather'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Octicons from 'react-native-vector-icons/Octicons'

// import fontelloConfig from '@/assets/fonts/config.json'
// const MyIcon = createIconSetFromFontello(fontelloConfig, 'myicon')

const IconType = {
  ANT_DESIGN: 'ANT_DESIGN',
  EVIL_ICONS: 'EVIL_ICONS',
  FONT_AWESOME6: 'FONTAWESOME6',
  IONICONS: 'IONICONS',
  LUCIDE: 'LUCIDE',
  MATERIAL_DESIGN_ICONS: 'MATERIAL_DESIGN_ICONS',

  // OCTICONS: 'octicons',
  // MY_ICON: 'myicon',
}
type IconType = typeof IconType[keyof typeof IconType]
interface IIconXProps {
  origin: IconType
  name: any
  color?: string
  size?: number
  paddingLeft?: number
  // style?: StyleProp<TextStyle> | undefined
  forTouchable?: boolean
  style?: StyleProp<TextStyle>
}

type IconXType = typeof AntDesign |
  typeof Ionicons |
  typeof MaterialDesignIcons |
  typeof FontAwesome6 |
  typeof Lucide |
  typeof EvilIcons

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
    case IconType.ANT_DESIGN:
      Element = AntDesign
      break

    case IconType.EVIL_ICONS:
      Element = EvilIcons
      break

    case IconType.FONT_AWESOME6:
      Element = FontAwesome6
      break

    case IconType.IONICONS:
      Element = Ionicons
      break

    case IconType.LUCIDE:
      Element = Lucide
      break

    case IconType.MATERIAL_DESIGN_ICONS:
      Element = MaterialDesignIcons
      break

    default:
      Element = Ionicons
      break
  }


  /*
  case IconType.MY_ICON:
    Element = MyIcon
    break
  */

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
IconX.ANT_DESIGN = IconType.ANT_DESIGN
IconX.EVIL_ICONS = IconType.EVIL_ICONS
IconX.FONT_AWESOME6 = IconType.FONT_AWESOME6
IconX.IONICONS = IconType.IONICONS
IconX.LUCIDE = IconType.LUCIDE
IconX.MATERIAL_DESIGN_ICONS = IconType.MATERIAL_DESIGN_ICONS
// IconX.MY_ICON = IconType.MY_ICON

export default IconX

