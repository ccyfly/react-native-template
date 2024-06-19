import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { IButtonProps } from '@/components/basic/Button'

import Animation from './animations/Animation'
import DialogButton from './components/DialogButton'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

export type DragEvent = {
  axis: {
    x: number
    y: number
  }
  layout: {
    x: number
    y: number
    width: number
    height: number
  }
  swipeDirection: string | null
}

export type DialogProps = PropsWithChildren<{
  visible: boolean
  children: ReactElement<any>
  width?: number
  height?: number
  rounded?: boolean
  hasOverlay?: boolean
  overlayPointerEvents?: 'auto' | 'none'
  overlayBackgroundColor?: string
  overlayOpacity?: number
  modalTitle?: ReactElement<any>
  modalAnimation?: Animation
  modalStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  animationDuration?: number
  onTouchOutside?: () => void
  onHardwareBackPress?: () => boolean
  onShow?: () => void
  onDismiss?: () => void
  footer?: ReactElement<any>
  onMove?: (event: DragEvent) => void
  onSwiping?: (event :DragEvent) => void
  onSwipeRelease?: (event: DragEvent) => void
  onSwipingOut?: (event: DragEvent) => void
  onSwipeOut?: (event: DragEvent) => void
  swipeDirection?: SwipeDirection | SwipeDirection[]
  swipeThreshold?: number
  useNativeDriver?: boolean
  theme?: any
}>

export type DialogFooterActionList = ReactElement<typeof DialogButton>[]

export type DialogFooterProps = {
  children: DialogFooterActionList
  style?: StyleProp<ViewStyle>
  bordered?: boolean
}

// export type DialogButtonProps = {
//   label: string
//   onPress: () => void
//   mode?: 'text' | 'outlined' | 'contained'
//   align?: 'center' | 'flex-start' | 'flex-end'
//   color?: string
//   contentStyle?: StyleProp<ViewStyle>
//   style?: StyleProp<ViewStyle>
//   labelStyle?: StyleProp<TextStyle>
//   disabled?: boolean
//   activeOpacity?: number
// }

export type DialogButtonProps = IButtonProps & {
  isCancel?: boolean
}

export type DialogTitleProps = {
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: any
  align?: 'flex-start'|'flex-end'|'center'
  hasTitleBar?: boolean
}

export type DialogContentProps = {
  children: any
  style?: StyleProp<ViewStyle>
}

export type BackdropProps = {
  visible: boolean
  opacity: number
  onPress?: () => void
  backgroundColor?: string
  animationDuration?: number
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
  useNativeDriver?: boolean
}
