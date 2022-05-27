import React from 'react'
import { StyleSheet } from 'react-native'

import SlideAnimation from '../animations/SlideAnimation'
import Dialog from '../Dialog'
import type { DialogProps } from '../type'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  modal: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
})

const BottomDialog = ({
  style,
  modalStyle,
  ...restProps
}: DialogProps) =>
  (
    <Dialog
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
      {...restProps}
      style={StyleSheet.flatten([styles.container, style])}
      modalStyle={StyleSheet.flatten([styles.modal, modalStyle])}
      width={1}
      swipeDirection="down"
    />
  )

export default BottomDialog
