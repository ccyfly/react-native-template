import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

interface IRoundButtonProps {
  radius?: number
  text: string
  backgroundColor?: string
  textColor?: string
  style?: ViewStyle
  onPress: () => void
}
const RoundButton: React.FC<IRoundButtonProps> = ({
  backgroundColor,
  onPress,
  radius = 8,
  style,
  text,
  textColor,
}: IRoundButtonProps) => {
  const theme = useTheme()
  const { Colors, Gutters } = theme

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Gutters.smallPadding,
          styles.button,
          {
            borderRadius: radius,
            backgroundColor: backgroundColor ? backgroundColor : Colors.accent,
          },
          style,
        ]}
      >
        <Text
          style={[
            {
              color: textColor ? textColor : Colors.buttonText as string,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
})
export default RoundButton
