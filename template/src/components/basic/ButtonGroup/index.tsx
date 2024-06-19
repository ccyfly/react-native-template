import React from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { PressableOpacity, Text as BText } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

export interface IOption<T> {
  label: string
  value: T
}
type Props<ItemT> = {
  borderColor?: string
  selectedBackgroundColor?: string
  backgroundColor?: string
  textStyle?: StyleProp<TextProps>
  selectedTextStyle?: StyleProp<TextProps>
  style?: StyleProp<ViewStyle>
  // selectedIndex: number
  value?: unknown
  onSelect?: (selected: ItemT) => void
  options: IOption<ItemT>[]
  radius?: number
}
const ButtonGroup = <T, >({
  backgroundColor,
  onSelect = () => {},
  options,
  radius,
  style = {},
  value,
}: Props<T>) => {

  const { Colors, Fonts, Gutters, Param } = useTheme()
  const styles = makeStyles({ Gutters, Param, radius })
  const itemStyle = {
    borderColor: Colors.primary,
    backgroundColor: backgroundColor ?? Colors.background,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  const textStyle = {
    color: Colors.onBackground,
    ...Fonts.buttonTextMedium,
    fontFamily: 'System',
  }
  const selectedItemStyle = { backgroundColor: Colors.primary }
  const selectedTextStyle = { color: Colors.onPrimary }

  const onPress = (index: T) => {
    onSelect(index)
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          display: 'flex',
          width: '100%',
        },
        style,
      ]}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            display: 'flex',
            width: '100%',
          },
          style,
        ]}
      >
        {options.map((option, index) => {
          const onPressIndex = () => {
            onPress(option.value)
          }

          return (
            <View
              key={`option_${index}`}
              style={{ flex: 1 }}
            >
              <PressableOpacity
                activeOpacity={0.6}
                onPress={onPressIndex}
                style={{ flex: 1 }}
              >
                <View
                  style={[
                    index === 0 ? styles.firstItem :
                      index === options.length -1 ?
                        styles.lastItem :
                        styles.item,
                    itemStyle,
                    option.value === value ? selectedItemStyle : {},
                    { flex: 1 },
                  ]}
                >
                  {/* {typeof option === 'string' ? (
                  <Text
                    style={[
                      textStyle,
                      index === selectedIndex ? selectedTextStyle : {},
                    ]}
                  >{option}</Text>
                ) : option} */}
                  <Text
                    style={[
                      textStyle,
                      option.value === value ? selectedTextStyle : { padding: 0, margin: 0 },
                    ]}
                  >{option.label}</Text>
                </View>
              </PressableOpacity>
            </View>
          )
        })}
      </View>
    </View>
  )
}
const makeStyles = ({ Gutters, Param, radius }: Pick<Theme, 'Gutters'|'Param'> & { radius?: number }) => {
  return StyleSheet.create({
    firstItem: {
      borderBottomLeftRadius: radius ?? Param.roundness * 2,
      borderTopLeftRadius: radius ?? Param.roundness * 2,
      borderWidth: 1,
      borderRightWidth: 0,
      ...Gutters.tinyPadding,
    },
    lastItem: {
      borderBottomRightRadius: radius ?? Param.roundness * 2,
      borderTopRightRadius: radius ?? Param.roundness * 2,
      borderWidth: 1,
      borderLeftWidth: 0,
      ...Gutters.tinyPadding,
    },
    item: {
      borderWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      ...Gutters.tinyPadding,
    },
    selectedStyle: {},
  })
}
// const styles = StyleSheet.create({
//   firstItem: {
//     borderBottomLeftRadius: 4,
//     borderTopLeftRadius: 4,
//     padding: 8,
//     borderWidth: 1,
//     borderRightWidth: 0,
//   },
//   lastItem: {
//     borderBottomRightRadius: 4,
//     borderTopRightRadius: 4,
//     padding: 8,
//     borderWidth: 1,
//     borderLeftWidth: 0,
//   },
//   item: {
//     padding: 8,
//     borderWidth: 1,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//   },
//   selectedStyle: {},
// })

export default ButtonGroup
