/* eslint-disable @typescript-eslint/no-empty-function */
import { Animated } from 'react-native'

import Animation, { AnimationConfig } from './Animation'

type FadeAnimationConfig = AnimationConfig & {
  animationDuration?: number
}

export default class FadeAnimation extends Animation {
  animationDuration: number

  constructor({ animationDuration = 200, initialValue = 0, useNativeDriver = false }: FadeAnimationConfig = {}) {
    super({
      initialValue,
      useNativeDriver,
    })
    this.animationDuration = animationDuration
  }

  in(onFinished: () => void = () => {}): void {
    Animated.timing(this.animate, {
      toValue: 1,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished)
  }

  out(onFinished: () => void = () => {}): void {
    Animated.timing(this.animate, {
      toValue: 0,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished)
  }

  getAnimations(): Record<string, unknown> {
    return { opacity: this.animate }
  }
}
