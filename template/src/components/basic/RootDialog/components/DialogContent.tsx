import React from 'react'
import { StyleSheet, View } from 'react-native'

import type { DialogContentProps } from '../type'
import DialogContext from './DialogContext'

const styles = StyleSheet.create({
  content: {
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  noPaddingTop: { paddingTop: 0 },
})

const DialogContent = ({ children, style }: DialogContentProps) =>
  (
    <DialogContext.Consumer>
      {({ hasTitle }) => (
        <View style={[styles.content, false && styles.noPaddingTop, style]}>
          {children}
        </View>
      )}
    </DialogContext.Consumer>
  )

export default DialogContent
