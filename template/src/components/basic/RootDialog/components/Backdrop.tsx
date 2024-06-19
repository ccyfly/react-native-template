/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'

import { PressableOpacity } from '@/components/basic'

import type { BackdropProps } from '../type'

export default class Backdrop extends Component<BackdropProps> {
  static defaultProps = {
    backgroundColor: '#000',
    opacity: 0.5,
    animationDuration: 2000,
    visible: false,
    useNativeDriver: true,
    onPress: () => { },
  }

  componentDidUpdate(prevProps: BackdropProps) {
    const {
      animationDuration: duration, opacity, useNativeDriver, visible,
    } = this.props
    if (prevProps.visible !== visible) {
      const toValue = visible ? opacity : 0
      Animated.timing(this.opacity, {
        toValue,
        duration,
        useNativeDriver: useNativeDriver === undefined ? false : useNativeDriver,
      }).start()
    }
  }

  setOpacity = (value: number) => {
    this.opacity.setValue(value)
  }

  opacity = new Animated.Value(0)

  render() {
    const { backgroundColor, onPress, pointerEvents } = this.props
    const { opacity } = this

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          StyleSheet.absoluteFill, {
            backgroundColor,
            opacity,
          },
        ]}
      >
        <PressableOpacity
          onPress={onPress}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    )
  }
}
