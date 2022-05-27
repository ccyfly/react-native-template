import { Animated } from 'react-native'

export type AnimationConfig = {
  initialValue?: number
  useNativeDriver?: boolean
}

// Base Animation class
export default class Animation {
  useNativeDriver: boolean
  animate: Animated.Value

  constructor({
    initialValue = 0,
    useNativeDriver = true,
  }: AnimationConfig = {}) {
    this.animate = new Animated.Value(initialValue)
    this.useNativeDriver = useNativeDriver
  }

  in(onFinished?: () => void): void {
    throw Error('not implemented yet')
  }

  out(onFinished?: () => void): void {
    throw Error('not implemented yet')
  }

  getAnimations(): Record<string, unknown> {
    throw Error('not implemented yet')
  }
}
