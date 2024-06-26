/* eslint-disable @typescript-eslint/no-empty-function */
import { Animated, Dimensions } from 'react-native'

import Animation, {  AnimationConfig } from './Animation'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

type SlideFrom = 'top' | 'bottom' | 'left' | 'right'
type SlideAnimationConfig = AnimationConfig & {
  slideFrom?: SlideFrom
}

export default class SlideAnimation extends Animation {
  slideFrom: SlideFrom

  static SLIDE_FROM_TOP:SlideFrom = 'top'
  static SLIDE_FROM_BOTTOM:SlideFrom = 'bottom'
  static SLIDE_FROM_LEFT:SlideFrom = 'left'
  static SLIDE_FROM_RIGHT:SlideFrom = 'right'

  constructor({ initialValue = 0, useNativeDriver = true, slideFrom = SlideAnimation.SLIDE_FROM_BOTTOM }: SlideAnimationConfig = {}) {
    super({
      initialValue,
      useNativeDriver,
    })
    this.slideFrom = slideFrom
  }

  in(onFinished: () => void = () => {}, options = {}): void {
    Animated.spring(this.animate, {
      toValue: 1,
      velocity: 0,
      tension: 65,
      friction: 11,
      useNativeDriver: this.useNativeDriver,
      ...options,
    }).start(onFinished)
  }

  out(onFinished: () => void = () => {}, options = {}): void {
    Animated.spring(this.animate, {
      toValue: 0,
      velocity: 0,
      tension: 65,
      friction: 11,
      useNativeDriver: this.useNativeDriver,
      ...options,
    }).start(onFinished)
  }

  getAnimations(): Record<string, unknown> {
    const transform = []
    if (this.slideFrom === SlideAnimation.SLIDE_FROM_TOP) {
      transform.push({
        translateY: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [-SCREEN_HEIGHT, 0],
        }),
      })
    } else if (this.slideFrom === SlideAnimation.SLIDE_FROM_BOTTOM) {
      transform.push({
        translateY: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_HEIGHT, 0],
        }),
      })
    } else if (this.slideFrom === SlideAnimation.SLIDE_FROM_LEFT) {
      transform.push({
        translateX: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [-SCREEN_WIDTH, 0],
        }),
      })
    } else if (this.slideFrom === SlideAnimation.SLIDE_FROM_RIGHT) {
      transform.push({
        translateX: this.animate.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_WIDTH, 0],
        }),
      })
    } else {
      throw new Error(`
        slideFrom: ${this.slideFrom} not supported. 'slideFrom' must be 'top' | 'bottom' | 'left' | 'right'
      `)
    }

    return { transform }
  }
}
