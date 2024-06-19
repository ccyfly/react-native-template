import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { customText, Text } from 'react-native-paper'

interface IInputLabelProps {
  // label: string
  children?: React.ReactNode
  style?: StyleProp<TextStyle|ViewStyle> | undefined
  onPress?: () => void
}
const InputLabel = ({ children, onPress, style }: IInputLabelProps) => {
  return (
    <Text variant={'bodyMedium'} style={[{ fontWeight: '700' }, style]} onPress={onPress}>
      {children}
    </Text>
  )
}

export default InputLabel
