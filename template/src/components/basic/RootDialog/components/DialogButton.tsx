import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PButton, withTheme } from 'react-native-paper'

import { Button } from '@/components/basic'
import useTheme from '@/hooks/useTheme'

import type { DialogButtonProps } from '../type'

const styles = StyleSheet.create({
  text: {
    // fontWeight: isAndroid ? '400' : '500',
    // fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    // fontSize: isAndroid ? 19 : 15,
    // color: '#044DE0',
    // color: '#000',
    // ...buttonFontStyle,
  },
  disable: { color: '#C5C6C5' },
})

const DialogButton = (props: DialogButtonProps) => {
  const { Colors, Common, Fonts } = useTheme()

  const {
    isCancel,
    onPress,
    style = {},
    text,
    textStyle = {},
    type,
    ...restProps
  } = props
  // const {
  //   align = 'center',
  //   label,
  //   labelStyle = {},
  //   style = {},
  //   mode = 'text',
  //   ...restProps
  // } = props
  // const buttonAlign = { alignSelf: align ? align : 'center' }

  // return (
  //   <>
  //     <Button
  //       style={[
  //         style,
  //         buttonAlign,
  //       ]}
  //       labelStyle={StyleSheet.flatten([
  //         styles.text,
  //         // Fonts.buttonTextMedium,
  //         labelStyle,
  //       ])}
  //       {...restProps}
  //     >
  //       {label}
  //     </Button>
  //   </>
  //   // <Text>ABc</Text>
  // )

  let _buttonStyle = style
  let _textStyle = textStyle
  if (isCancel) {
    _buttonStyle = Object.assign(_buttonStyle, {
      backgroundColor: Colors.negative,
    })
    _textStyle = Object.assign(_textStyle, {
      color: Colors.onNegative,
    })
  }

  return (
    <Button
      type={type}
      text={text}
      textStyle={_textStyle}
      style={_buttonStyle}
      onPress={onPress}
      {...restProps}
    />
  )
}

export default DialogButton
