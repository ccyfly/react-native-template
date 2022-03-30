import { StackHeaderProps } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { Animated } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@/hooks/useTheme'

import BackButton from '../BackButton'

// const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const HEADER_HEIGHT = 48
export type HeaderProps = StackHeaderProps & Partial<{
  backgroundColor: string
}>
const Header = ({
  back,
  progress,
  options,
  route,
  navigation,
  backgroundColor,
}: HeaderProps) => {
  const { Colors } = useTheme()
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
        {back ? <BackButton onPress={goBack} /> : null}
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
        {/* <View
          style={{
            // backgroundColor: 'red',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            left: 0,
            bottom: 0,
            // padding: 0,
            // margin: 0,
            flex: 1,
            width: '100%',
            height: 56,
            // paddingTop: inset.top,
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </View> */}
      </Appbar>
    </Animated.View>
  )
}

export default Header
