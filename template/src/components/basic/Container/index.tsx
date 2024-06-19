import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@/hooks/useTheme'

interface IContainerProps {
  insetTop?: boolean
  insetBottom?: boolean
  children: React.ReactNode[] | React.ReactNode
  style?: ViewStyle | ViewStyle[]
  withRound?: boolean
}
const Container: React.FC<IContainerProps> = ({ children, insetBottom = false, insetTop = false, style = {}, withRound = false }: IContainerProps) => {
  const insets = useSafeAreaInsets()
  const { Colors, Fonts, Gutters, Layout } = useTheme()

  return (
    <View
      style={[
        Layout.fill,
        Layout.column,
        Layout.justifyContentStart,
        Layout.alignItemsStart,
        // Gutters.mediumHPadding,
        // Gutters.mediumVPadding,
        insetTop ? { paddingTop: insets.top } : {},
        insetBottom ? { paddingBottom: insets.bottom } : {},
        { backgroundColor: Colors.background },
        style,
      ]}
    >
      {children}
    </View>
  )
}

export default React.memo(Container)
