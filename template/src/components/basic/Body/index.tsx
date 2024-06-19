import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import useTheme from '@/hooks/useTheme'

interface IBodyProps {
  insetBottom?: boolean
  children: React.ReactNode[] | React.ReactNode
  style?: ViewStyle | ViewStyle[]
  withRoundedTopRight?: boolean
  topRightColor?: string
}

const Body: React.FC<IBodyProps> = ({ children, insetBottom = false, style = {}, topRightColor, withRoundedTopRight = false }: IBodyProps) => {
  const insets = useSafeAreaInsets()
  const { Colors, Fonts, Gutters, Layout } = useTheme()
  const defaultTopRightColor = topRightColor ?? Colors.primary

  const path = React.useMemo(
    () =>
      [
        'M 0 0',
        'C 0 0 50 0 50 50',
        'L 50 0',
        'L 0 0',
      ].join(' '),
    []
  )

  return (
    <View
      style={[
        Layout.fill,
        Layout.column,
        Layout.fullWidth,
        { height: '100%' },
        // Gutters.tinyTPadding,
        insetBottom ? { paddingBottom: insets.bottom } : {},
        withRoundedTopRight ? {
          backgroundColor: 'white',
          // borderTopRightRadius:40,
          // paddingTop: 28,
        } : {},
        style,
      ]}
    >
      {children}
      {/* {withRoundedTopRight && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          pointerEvents="none"
        >
          <Svg width={50} height={50} viewBox="0 0 50 50">
            <Path fill={defaultTopRightColor} stroke={defaultTopRightColor} d={path} />
          </Svg>
        </View>
      )} */}
    </View>
  )
}

export default React.memo(Body)
