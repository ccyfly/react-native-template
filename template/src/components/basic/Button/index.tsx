import color from 'color'
import React, { useCallback } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import {
  Button as PButton,
  ButtonProps,
  IconButton,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper'
import { IconSource } from 'react-native-paper/src/components/Icon'

import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'

import { getButtonColor } from './utils'

export type ButtonType = 'text'|'round'|'outline'|'contain'|'icon'

export interface IButtonProps {
  onPress?: () => void|Promise<void>
  // isRound?: boolean
  type?: ButtonType
  text?: string
  buttonSize?: 'small'|'medium'|'large'
  isPrimary?: boolean
  buttonColor?: string
  textColor?: string
  borderColor?: string
  style?: ViewStyle|ViewStyle[]
  contentStyle?: ViewStyle|ViewStyle[]
  textStyle?: TextStyle|TextStyle[]
  icon?: IconSource|React.ReactElement // React.ReactElement|string
  iconSize?: number
  disabled?: boolean
  textColorOnTextOnly?: boolean
}
const Button: React.FC<IButtonProps> = ({
  borderColor: customBorderColor,
  buttonColor: customButtonColor,
  buttonSize = 'small',
  contentStyle,
  disabled = false,
  icon,
  iconSize,
  isPrimary = true,
  onPress = () => {},
  style,
  text,
  textColor: customTextColor,
  textColorOnTextOnly = false,
  textStyle,
  type = 'text',
}: IButtonProps) => {
  const theme = useTheme()
  const [tempDisable, setTempDisable] = React.useState(false)
  const {
    Colors,
    Common,
    darkMode,
    Fonts,
    Gutters,
    Layout,
  } = theme
  const isMode = React.useCallback(
    (typeToCompare: ButtonType) => {
      return type === typeToCompare
    },
    [type]
  )
  const mode = React.useMemo(() => {
    if (type === 'round') {
      return 'contained'
    }
    if (type === 'contain') {
      return 'contained-tonal'
    }
    if (type === 'outline') {
      return 'outlined'
    }

    return 'text'
  }, [type])
  let _textColor = customTextColor
  if (textColorOnTextOnly) {
    _textColor = undefined
  }
  const { backgroundColor, borderColor, textColor } = getButtonColor(isMode, Colors, darkMode, isPrimary, type, disabled, _textColor, customButtonColor, customBorderColor, textColorOnTextOnly)
  let _buttonStyle = Object.assign({}, Common.button.base)
  let _contentStyle = Object.assign({}, Common.button.content)
  if (isMode('icon')) {
    _contentStyle = Object.assign(_contentStyle, Common.button.contentIconOnly)
  }
  if (isMode('outline')) {
    _buttonStyle = Object.assign(_buttonStyle, {
      ...Common.button.outline,
      borderColor,
    })
  }

  switch (buttonSize) {
    case 'medium':
      _contentStyle = Object.assign(_contentStyle, { minHeight: 60 })
      _buttonStyle = Object.assign(_buttonStyle, { borderRadius: 30 })
      break
    case 'large':
      break
  }

  const onPressHandler = useCallback(() => {
    if (tempDisable) {
      return
    }
    setTempDisable(true)
    setTimeout(() => {
      setTempDisable(false)
    }, 500)
    void onPress()
  }, [tempDisable])

  if (type === 'icon' && icon !== undefined) {
    const rippleColor = color(textColor).alpha(0.12)
      .rgb()
      .string()

    /* return (
      <TouchableRipple
        style={[
          Common.button.base,
          _buttonStyle,
          // { backgroundColor: backgroundColor },
          style ? style : {},
          {
            borderRadius: 20,
          },
        ]}
        onPress={onPress}
        // activeOpacity={0.6}
        disabled={disabled}
        rippleColor={rippleColor}
      >
        <View style={[_contentStyle, { alignItems: 'center', justifyContent: 'center' }, contentStyle]}>
          {icon !== undefined && icon}
        </View>
      </TouchableRipple>
    ) */
    return (
      <IconButton
        onPress={() => void onPress()}
        disabled={disabled}
        style={[{ borderRadius: 12, margin: 0 }, style]}
        size={iconSize || 24}
        containerColor={backgroundColor}
        icon={React.isValidElement(icon) ? (props) => icon : (icon as IconSource)}
        iconColor={textColor}
      />
    )
  }

  return (
    <PButton
      mode={mode}
      onPress={onPressHandler}
      disabled={disabled}
      style={[
        Common.button.base,
        _buttonStyle,
        style ? style : {},
      ]}
      contentStyle={[_contentStyle, contentStyle]}
      labelStyle={[textStyle ? textStyle : {}, textColorOnTextOnly && customTextColor ? { color: customTextColor } : {}]}
      textColor={textColor}
      buttonColor={backgroundColor}
      icon={React.isValidElement(icon) ? (props) => icon : (icon as IconSource)}
    >
      {text ? text : ''}
    </PButton>
  )
}

export default Button
