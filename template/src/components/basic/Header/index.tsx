import { StackHeaderProps } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

import BackButton from '../BackButton'

// const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const HEADER_HEIGHT = 48
export type HeaderProps = StackHeaderProps & Partial<{
  backgroundColor: string
  onBackPress: () => boolean
}>
const Header: React.FC<HeaderProps> = ({
  back,
  backgroundColor,
  navigation,
  onBackPress,
  options,
  progress,
  route,
}: HeaderProps) => {
  const { Colors, Gutters } = useTheme()
  const inset = useSafeAreaInsets()

  const { headerMode, presentation } = options

  // const { options } = scene.descriptor
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : route.name
  const progressAnimation = Animated.add(progress.current, progress.next || 0)
  const opacity = progressAnimation.interpolate({
    inputRange: [
      0, 1, 2,
    ],
    outputRange: [
      0, 1, 0,
    ],
  })
  const progress2 = Animated.add(progress.current, progress.next || 0)
  const translateY = progress2.interpolate({
    inputRange: [
      0, 2, 4,
    ],
    outputRange: [
      0, -28, 0,
    ],
  })

  const goBack = useCallback(
    () => {
      navigation.goBack()
    },
    []
  )

  const { headerLeft, headerRight } = options

  return (
    <Animated.View style={{
      opacity,
      // transform: [
      //   {
      //     translateY: translateY,
      //   },
      // ],
    }}
    >
      <Appbar
        style={{
          backgroundColor: backgroundColor ? backgroundColor : Colors.primary,
          paddingTop: presentation === 'card' ? inset.top : 0,
          height: HEADER_HEIGHT + (presentation === 'card' ? inset.top : 0),
        }}
      >
        {back || headerLeft ?
          <View
            style={[
              Gutters.smallPadding,
              // Gutters.smallLMargin,
              {
                flex: 1,
                flexDirection: 'row',
              },
            ]}
          >
            {headerLeft ? headerLeft({}) : <BackButton onPress={goBack} />}
          </View> : null
        }
        <Appbar.Content
          title={title}
          style={{
            // backgroundColor: 'red',
            position: 'absolute',
            left: 0,
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            // padding: 0,
            // margin: 0,
            flex: 1,
            width: '100%',
            height: HEADER_HEIGHT,
            alignSelf: 'center',
          }}
          titleStyle={{
            // test
            textAlign: 'center',

          }}
          pointerEvents="box-none"
        />
        {headerRight ? (
          <View
            style={[
              Gutters.smallPadding,
              // Gutters.smallRMargin,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },

            ]}
          >
            {headerRight({})}
          </View>
        ) : null}
      </Appbar>
    </Animated.View>
  )
}

export default Header
