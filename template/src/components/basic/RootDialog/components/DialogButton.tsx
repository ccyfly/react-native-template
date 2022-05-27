import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, withTheme } from 'react-native-paper'

import useTheme from '@/hooks/useTheme'

import type { DialogButtonProps } from '../type'

const styles = StyleSheet.create({
  text: {
    // fontWeight: isAndroid ? '400' : '500',
    // fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    // fontSize: isAndroid ? 19 : 15,
    color: '#044DE0',
    // color: '#000',
    // ...buttonFontStyle,
  },
  disable: {
    color: '#C5C6C5',
  },
})

const DialogButton = (props: DialogButtonProps) => {
  const { Fonts, Colors } = useTheme()

  const {
    align = 'center',
    label,
    labelStyle = {},
    style = {},
    ...restProps
  } = props
  const buttonAlign = {
    alignSelf: align ? align : 'center',
  }

  return (
    <>
      <Button
        style={[
          style,
          buttonAlign,
        ]}
        labelStyle={StyleSheet.flatten([
          styles.text,
          Fonts.buttonFontStyle,
          labelStyle,
        ])}
        {...restProps}
      >
        {label}
      </Button>
    </>
    // <Text>ABc</Text>
  )
}

export default DialogButton
