import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import useTheme from '@/hooks/useTheme'

interface IButtonProps {
  onPress: () => void
  // isRound?: boolean
  type: 'round'|'outline'|'contained'
  text: string
  isPrimary?: boolean
  buttonColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
}
const Button: React.FC<IButtonProps> = ({
  buttonColor,
  isPrimary = true,
  onPress,
  style,
  text,
  textStyle,
  type = 'round',
}: IButtonProps) => {
  const theme = useTheme()
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
  } = theme

  let buttonStyle = Common.button.rounded
  if (type === 'round') {
    buttonStyle = isPrimary ? Common.button.rounded : Common.button.roundedSecondary
  } else if (type === 'outline') {
    buttonStyle = isPrimary ? Common.button.outline : Common.button.outlineSecondary
  } else if (type === 'contained') {
    buttonStyle = isPrimary ? Common.button.base : Common.button.baseSecondary
  }

  return (
    <TouchableOpacity
      style={[
        // Common.button.roundedAccent,
        buttonStyle,
        // Gutters.regularBMargin,
        // Layout.selfFlexStart,
        buttonColor ? {
          backgroundColor: buttonColor,
        } : {},
        style ? style : {},
      ]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={[isPrimary ? Fonts.primaryButtonTextRegular : Fonts.secondaryButtonTextRegular, textStyle ? textStyle : {}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
