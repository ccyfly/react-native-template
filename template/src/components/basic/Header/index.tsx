import { StackHeaderProps } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { Animated, StatusBar, View } from 'react-native'
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text'
import { Appbar, Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import useFontFamily from '@/hooks/useFontFamily'
import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import { Theme } from '@/theme/types'
import { normalize } from '@/utils'

import BackButton from '../BackButton'

// const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

// const HEADER_HEIGHT = 48
export type HeaderProps = StackHeaderProps & Partial<{
  backgroundColor: string
  withRoundedSharp?: boolean
  onBackPress?: () => boolean
}>
const Header: React.FC<HeaderProps> = ({
  back,
  backgroundColor,
  navigation,
  onBackPress,
  options,
  progress,
  route,
  withRoundedSharp,
}: HeaderProps) => {
  const { Colors, Fonts, Gutters, Param: { headerHeight } } = useTheme()
  const inset = useSafeAreaInsets()
  const { headerMode, presentation } = options
  const fontFamily = useFontFamily()

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

  // const { options } = scene.descriptor
  const navigationName = route.name
  logger.log('navigationName', navigationName)
  const title =
    options.headerTitle !== undefined && typeof options.headerTitle === 'string'
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : route.name
  const progressAnimation = Animated.add(progress.current, progress.next || 0)
  const opacity = progressAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  })
  const progress2 = Animated.add(progress.current, progress.next || 0)
  const translateY = progress2.interpolate({
    inputRange: [0, 2, 4],
    outputRange: [0, -28, 0],
  })

  const goBack = useCallback(
    () => {
      navigation.goBack()
    },
    []
  )

  const { headerLeft, headerRight } = options

  return (
    <>
      <Animated.View style={{
        opacity,
        // transform: [
        //   {
        //     translateY: translateY,
        //   },
        // ],
      }}
      >
        {/* <StatusBar barStyle={'light-content'}/> */}
        <Appbar
          style={{
            backgroundColor: backgroundColor ? backgroundColor : Colors.primary,
            paddingTop: presentation === 'card' ? inset.top : 0,
            height: headerHeight + (presentation === 'card' ? inset.top : 0),
          }}
        >
          {back || headerLeft ?
            <View
              style={[
                Gutters.smallLPadding,
                // Gutters.smallLMargin,
                { flex: 1, flexDirection: 'row' },
              ]}
            >
              {headerLeft ? headerLeft({}) : <BackButton color={Colors.white} onPress={goBack} />}
            </View> : null
          }
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              height: headerHeight,
            }}
            pointerEvents="box-none"
          >
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                paddingLeft: 50,
                paddingRight: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <Appbar.Content
                title={title}
                // theme={NavigationTheme}
                style={{
                  // position: 'absolute',
                  // left: 0,
                  // right: 0,
                  // bottom: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  height: headerHeight,
                  alignSelf: 'center',
                }}
                titleStyle={[
                  Fonts.headerTitle, {
                    textAlign: 'center',
                    color: Colors.text,
                  },
                ]}
                pointerEvents="box-none"
              /> */}
              <AutoSizeText
                fontSize={normalize(26)}
                numberOfLines={1}
                mode={ResizeTextMode.max_lines}
                style={[
                  {
                    fontFamily,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    fontWeight: 'bold',
                    color: Colors.white,
                  },
                ]}
              >
                {title}
              </AutoSizeText>
            </View>
          </View>
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
        {withRoundedSharp && (
          <View
            style={{
              position: 'absolute',
              top: (headerHeight + (presentation === 'card' ? inset.top : 0)),
              right: 0,
            }}
            pointerEvents="none"
          >
            <Svg width={50} height={50} viewBox="0 0 50 50">
              <Path fill={backgroundColor ? backgroundColor : Colors.primary} stroke={backgroundColor ? backgroundColor : Colors.primary} d={path} />
            </Svg>
          </View>
        )}
      </Animated.View>
    </>
  )
}

export default Header
