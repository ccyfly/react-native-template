import React, { PropsWithChildren } from 'react'
import { PressableOpacity as RawPressableOpacity, PressableOpacityProps as RawPressableOpacityProps } from 'react-native-pressable-opacity'

type Props = PropsWithChildren<RawPressableOpacityProps>
const PressableOpacity = (props: Props) => {
  const {
    activeOpacity = 0.5,
    children,
    disabledOpacity = 1,
    ...rest
  } = props

  return (
    <RawPressableOpacity {...rest} activeOpacity={activeOpacity} disabledOpacity={disabledOpacity}>
      {children}
    </RawPressableOpacity>
  )
}

export default PressableOpacity
