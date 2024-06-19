import React, { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { PressableOpacity } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { rgbToHex } from '@/infrastructures/common/colorUtils'
import logger from '@/infrastructures/common/logger'

export type ExpandableOverlayMethods = {
  openExpandable: () => void
  closeExpandable: () => void
  toggleExpandable: () => void
}
export interface IRenderCustomOverlayProps extends ExpandableOverlayMethods {
  visible: boolean
}
export type ExpandableOverlayProps = TouchableOpacityProps &
{

  /**
   * The content to render inside the expandable modal/dialog
   */
  expandableContent?: React.ReactElement
  /**
   * Whether to render a modal top bar (relevant only for modal)
   */
  showTopBar?: boolean
  /**
   * A custom overlay to render instead of Modal or Dialog components
   */
  renderCustomOverlay?: (props: IRenderCustomOverlayProps) => React.ReactElement | undefined | null
  /**
   * Disabled opening expandable overlay
   */
  disabled?: boolean
  modalProps?: Partial<Omit<ModalProps, 'children'>>

  childrenPointEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
  children?: React.ReactElement
}

const ExpandableOverlay = (props: ExpandableOverlayProps, ref: any) => {
  const { Colors } = useTheme()
  const insets = useSafeAreaInsets()
  const {
    children,
    childrenPointEvents = 'none',
    // useDialog,
    disabled,
    // dialogProps,
    expandableContent,
    // topBarProps,
    modalProps,
    onPress,
    renderCustomOverlay,
    showTopBar,
    // customValue,
    testID,
    ...others
  } = props
  const [visible, setExpandableVisible] = useState(false)
  const { style: modalStyle, ...othersModalProps } = modalProps || {}
  const openExpandable = useCallback(() => {
    setExpandableVisible(true)
    onPress?.({} as any)
  }, [onPress])
  const closeExpandable = useCallback(() => {
    setExpandableVisible(false)
    // modalProps?.onDismiss?.()
  }, [])
  const toggleExpandable = useCallback(() => (visible ? closeExpandable() : openExpandable()),
    [visible, openExpandable, closeExpandable])
  useImperativeHandle(ref, () => ({
    openExpandable,
    closeExpandable,
    toggleExpandable,
  }))

  const modalContainerStyle = {
    margin: 0,
    // paddingBottom: insets.bottom,
    // paddingTop: insets.top,
  }
  const backdrop = rgbToHex(Colors.backdrop, true)

  const renderModal = () => {
    return (
      <Modal
        testID={`${testID || ''}.overlay`}
        backdropColor={backdrop.hex}
        backdropOpacity={backdrop.alpha}
        isVisible={visible}
        onDismiss={closeExpandable}
        onBackdropPress={closeExpandable}
        {...othersModalProps}
        style={[modalContainerStyle, modalStyle]}
      >
        {expandableContent}
      </Modal>
    )
  }

  return (
    <PressableOpacity {...others} onPress={openExpandable} disabled={disabled} testID={testID}>
      <View pointerEvents={childrenPointEvents}>{children}</View>
      {renderModal()}
    </PressableOpacity>
  )
}

export default forwardRef<ExpandableOverlayMethods, ExpandableOverlayProps>(ExpandableOverlay)
