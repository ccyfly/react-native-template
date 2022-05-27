import React from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextProps,
  View,
  ViewStyle,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import useTheme from '@/hooks/useTheme'

type Props = {
  borderColor?: string
  selectedBackgroundColor?: string
  backgroundColor?: string
  textStyle?: StyleProp<TextProps>
  selectedTextStyle?: StyleProp<TextProps>
  style?: StyleProp<ViewStyle>
  selectedIndex: number
  onSelect?: (selected: number) => void
  options: string[]|React.ReactNode[]
}
const ButtonGroup = ({
  style = {},
  selectedIndex = -1,
  onSelect = () => {},
  options,
}: Props) => {
  const { Colors } = useTheme()
  const itemStyle = {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  }
  const textStyle = {
    color: Colors.onBackground,
  }
  const selectedItemStyle = {
    backgroundColor: Colors.primary,
  }
  const selectedTextStyle = {
    color: Colors.onPrimary,
  }

  const onPress = (index: number) => {
    onSelect(index)
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {options.map((option, index) => {
        const onPressIndex = () => {
          onPress(index)
        }

        return (
          <TouchableOpacity
            key={`option_${index}`}
            activeOpacity={0.9}
            onPress={onPressIndex}
          >
            <View
              style={[
                index === 0 ? styles.firstItem :
                  index === options.length -1 ?
                    styles.lastItem :
                    styles.item,
                itemStyle,
                index === selectedIndex ? selectedItemStyle : {},
              ]}
            >
              {typeof option === 'string' ? (
                <Text
                  style={[
                    textStyle,
                    index === selectedIndex ? selectedTextStyle : {},
                  ]}
                >{option}</Text>
              ) : option}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  firstItem: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  lastItem: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  item: {
    padding: 8,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  selectedStyle: {},
})

export default ButtonGroup
