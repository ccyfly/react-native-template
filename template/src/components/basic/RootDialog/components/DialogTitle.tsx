import React from 'react'
import { PixelRatio, Platform, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import useTheme from '@/hooks/useTheme'

import type { DialogTitleProps } from '../type'

const isAndroid = Platform.OS === 'android'

const styles = StyleSheet.create({
  title: {
    padding: 14,
    paddingHorizontal: 18,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleBar: {
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
  },
  text: {
    // fontWeight: isAndroid ? '400' : '500',
    // fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
    // fontSize: isAndroid ? 19 : 15,
    color: '#151822',
    // ...titleFontStyle,
  },
})

const ModalTitle = ({
  title,
  style,
  textStyle,
  hasTitleBar = true,
  align = 'center',
}: DialogTitleProps) => {
  const titleBar = hasTitleBar ? styles.titleBar : null
  const titleAlign = {
    alignItems: align,
  }
  const { Fonts } = useTheme()

  return (
    <View style={[
      styles.title, titleAlign, titleBar, style,
    ]}
    >
      <Text style={[
        styles.text,
        Fonts.titleFontStyle,
        textStyle,
      ]}
      >
        {title}
      </Text>
    </View>
  )
}

export default ModalTitle
