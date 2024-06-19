import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput as NativeTextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { HelperText, Text, TextInput, TextInputProps, withTheme } from 'react-native-paper'

import { images } from '@/assets'
// import { Props as TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import useImperativePickerHandle from '@/components/basic/Picker/hooks/useImperativePickerHandle'
import useTheme from '@/hooks/useTheme'

type Props = {
  hintText?: string | undefined
  hintTextStyle?: TextStyle
  errorText?: string | undefined
  errorColor?: string
  errorTextStyle?: TextStyle
  showEye?: boolean
  disableErrorText?: boolean
}

export type MaterialTextInputProps = TextInputProps & Props

export type TextInputHandles = Pick<
  NativeTextInput,
  'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'
>

const MaterialTextInput = forwardRef<TextInputHandles, MaterialTextInputProps>((props: MaterialTextInputProps, ref) => {
  const {
    disableErrorText,
    errorColor = 'rgb(213, 0, 0)',
    errorText,
    errorTextStyle = { fontSize: 12 },
    hintText,
    // underlineColor,
    // activeUnderlineColor,
    // outlineColor,
    // activeOutlineColor,
    hintTextStyle = { fontSize: 12 },
    label,
    mode,
    placeholderTextColor,
    right,
    secureTextEntry,
    showEye = false,
    style,
    theme,
    ...restProps
  } = props
  const { Colors, Common, NavigationTheme } = useTheme()

  const [visiblePw, setVisiblePw] = useState(false)
  const [secureText, setSecureText] = useState(secureTextEntry)

  const customPlaceholderTextColor = placeholderTextColor || Colors.outline
  const toggleVisiblePw = () => {
    setVisiblePw(!!!visiblePw)
    setSecureText(visiblePw)
  }

  const inputRef = React.useRef<NativeTextInput | null>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef?.current?.focus(),
    clear: () => inputRef.current?.clear(),
    setNativeProps: (args: any) => inputRef.current?.setNativeProps(args),
    isFocused: () => inputRef.current?.isFocused() || false,
    blur: () => inputRef.current?.blur(),
    forceFocus: () => inputRef.current?.focus(),
  }))

  const renderHelperText = useCallback(() => {
    if (!!errorText && !disableErrorText) {
      return (
        <HelperText
          type="error"
          visible={!!errorText}
          padding={'none'}
        >{errorText}</HelperText>
      )
    } else if (!!hintText && !disableErrorText) {
      return (
        <HelperText
          type="info"
          visible={!!hintText}
          padding={'none'}
        >{hintText}</HelperText>
      )
    } else if (disableErrorText) {
      return null
    }

    return <HelperText
      type="info"
      visible
      padding={'none'}
    >{' '}</HelperText>
  }, [
    hintText, errorText, errorColor, disableErrorText, hintTextStyle, errorTextStyle,
  ])

  const contentBackgroundColor = (restProps.contentStyle as ViewStyle)?.backgroundColor

  return (
    <View>
      {mode === 'flat' && label !== undefined && label !== '' && (
        <Text>
          {label}
        </Text>
      )}
      <TextInput
        ref={inputRef}
        label={mode === 'flat' ? '' : label}
        mode={mode}
        placeholderTextColor={customPlaceholderTextColor}
        {...restProps}
        // underlineColor={errorText ? errorColor : underlineColor}
        // activeUnderlineColor={errorText ? errorColor : activeUnderlineColor}
        // outlineColor={errorText ? errorColor : outlineColor}
        // activeOutlineColor={errorText ? errorColor : activeOutlineColor}
        right={secureTextEntry && showEye ?
          <TextInput.Icon
            icon={visiblePw ? 'eye-off' : 'eye'}
            // icon={images.search}
            onPress={toggleVisiblePw}
            // style={contentBackgroundColor ? { backgroundColor: contentBackgroundColor } : {}}
          /> : (right ? right : null)}
        // right={right ? right : null}
        secureTextEntry={secureText}
        textContentType={secureTextEntry ? 'newPassword' : 'none'}
        theme={Object.assign(NavigationTheme, theme)}
        style={[Common.textInput, style]}
        error={!!errorText}
      />
      {/* {!disableErrorText && (<HelperText */}
      {/*   type="error" */}
      {/*   visible={!!errorText} */}
      {/*   padding={'none'} */}
      {/* >{errorText}</HelperText>)} */}
      {renderHelperText()}
    </View>
  )
})
MaterialTextInput.displayName = 'MaterialTextInput'

export default React.memo(MaterialTextInput)
