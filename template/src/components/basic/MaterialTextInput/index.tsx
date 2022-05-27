import React, { useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewPropTypes,
} from 'react-native'
import { Text, TextInput, withTheme } from 'react-native-paper'
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'

import useTheme from '@/hooks/useTheme'

type Props = {
  hintText?: string | undefined
  hintTextStyle?: TextStyle
  errorText?: string | undefined
  errorColor?: string
  errorTextStyle?: TextStyle
  showEye?: boolean
}

type MaterialTextInputProps = Props & TextInputProps

const MaterialTextInput: React.FC<MaterialTextInputProps> = (props: MaterialTextInputProps) => {
  const {
    hintText,
    errorText,
    errorColor = 'rgb(213, 0, 0)',
    errorTextStyle = {
      fontSize: 12,
    },
    hintTextStyle = {
      fontSize: 12,
    },
    underlineColor,
    activeUnderlineColor,
    outlineColor,
    activeOutlineColor,
    style,
    secureTextEntry,
    theme,
    ...restProps
  } = props
  const { NavigationTheme } = useTheme()

  const [visiblePw, setVisiblePw] = useState(false)
  const [secureText, setSecureText] = useState(secureTextEntry)

  const toggleVisiblePw = () => {
    setVisiblePw(!!!visiblePw)
    setSecureText(visiblePw)
  }

  return (
    <View
      style={style ? style : {}}
    >
      <TextInput
        {...restProps}
        underlineColor={errorText ? errorColor : underlineColor}
        activeUnderlineColor={errorText ? errorColor : activeUnderlineColor}
        outlineColor={errorText ? errorColor : outlineColor}
        activeOutlineColor={errorText ? errorColor : activeOutlineColor}
        right={secureTextEntry ? <TextInput.Icon name={visiblePw ? 'eye-off' : 'eye'} onPress={toggleVisiblePw}/> : null}
        secureTextEntry={secureText}
        theme={Object.assign(NavigationTheme, theme)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingTop: 4,
        }}
      >
        <Text
          style={[
            errorText ? errorTextStyle : hintTextStyle,
            errorText ? {
              color: errorColor,
            } : {},
          ]}
          theme={Object.assign(NavigationTheme, theme)}
        >{errorText ? errorText : hintText ? hintText : ''}</Text>
      </View>
    </View>
  )
}

export default withTheme(MaterialTextInput)
