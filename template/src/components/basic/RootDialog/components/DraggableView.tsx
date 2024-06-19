/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { isArray } from 'lodash'
import React, { Component, ReactNode } from 'react'
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native'

// import type { ViewLayoutEvent } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { DragEvent, SwipeDirection } from '../type'

type Props = {
  style?: ViewStyle
  onMove?: (event: DragEvent) => void
  onSwiping?: (event: DragEvent) => void
  onRelease?: (event: DragEvent) => void
  onSwipingOut?: (event: DragEvent) => void
  onSwipeOut?: (event: DragEvent) => void
  swipeThreshold?: number
  swipeDirection?: SwipeDirection | SwipeDirection[]
  children: ({ onLayout, pan }: {
    onLayout: (event: LayoutChangeEvent) => void
    pan: Animated.ValueXY
  }) => ReactNode
}
type State = {
  x: number
  y: number
}

export default class DraggableView extends Component<Props, State> {
  static defaultProps = {
    style: null,
    onMove: () => { },
    onSwiping: () => { },
    onSwipingOut: () => { },
    onSwipeOut: null,
    onRelease: () => { },
    swipeThreshold: 100,
    swipeDirection: [],
  }

  pan: Animated.ValueXY
  allowedDirections: SwipeDirection[]
  layout: LayoutRectangle
  panEventListenerId: any
  currentSwipeDirection: string | null
  constructor(props: Props) {
    super(props)

    this.pan = new Animated.ValueXY()
    this.allowedDirections = isArray(props.swipeDirection) ? props.swipeDirection?.slice() || [] : (props.swipeDirection ? [props.swipeDirection] : [])
    this.layout = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
    this.currentSwipeDirection = null
    this.state = {
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    this.panEventListenerId = this.pan.addListener((axis) => {
      this.setState({
        ...axis,
      })
      if (this.props.onMove) {
        this.props.onMove(this.createDragEvent(axis))
      }
    })
  }

  componentWillUnmount() {
    this.pan.removeListener(this.panEventListenerId)
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.layout = event.nativeEvent.layout
  }

  getSwipeDirection(gestureState: PanResponderGestureState) {
    if (this.isValidHorizontalSwipe(gestureState)) {
      return (gestureState.dx > 0) ? 'right' : 'left'
    } else if (this.isValidVerticalSwipe(gestureState)) {
      return (gestureState.dy > 0) ? 'down' : 'up'
    }

    return null
  }

  getDisappearDirection() {
    const { height, width } = Dimensions.get('window')
    const vertical = ((height / 2) + (this.layout.height / 2))
    const horizontal = ((width / 2) + (this.layout.width / 2))
    // let toValue = {}
    if (this.currentSwipeDirection === 'up') {
      return  {
        x: 0,
        y: -vertical,
      }
    } else if (this.currentSwipeDirection === 'down') {
      return {
        x: 0,
        y: vertical,
      }
    } else if (this.currentSwipeDirection === 'left') {
      return {
        x: -horizontal,
        y: 0,
      }
    } else if (this.currentSwipeDirection === 'right') {
      return {
        x: horizontal,
        y: 0,
      }
    }

    return null
  }

  isValidHorizontalSwipe({ dy, vx }: { vx: number; dy: number }) {
    return this.isValidSwipe(vx, dy)
  }

  isValidVerticalSwipe({ dx, vy }: { vy: number; dx: number }) {
    return this.isValidSwipe(vy, dx)
  }

  // eslint-disable-next-line class-methods-use-this
  isValidSwipe(velocity: number, directionalOffset: number) {
    const velocityThreshold = 0.3
    const directionalOffsetThreshold = 80

    // eslint-disable-next-line max-len
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold
  }

  isAllowedDirection({ dx, dy }: { dx: number; dy: number }) {
    const draggedDown = dy > 0
    const draggedUp = dy < 0
    const draggedLeft = dx < 0
    const draggedRight = dx > 0
    const isAllowedDirection = (d: any) => (
      this.currentSwipeDirection === d && this.allowedDirections.includes(d)
    )
    if (draggedDown && isAllowedDirection('down')) {
      return true
    } else if (draggedUp && isAllowedDirection('up')) {
      return true
    } else if (draggedLeft && isAllowedDirection('left')) {
      return true
    } else if (draggedRight && isAllowedDirection('right')) {
      return true
    }

    return false
  }

  createDragEvent(axis: { x: number; y: number }): DragEvent {
    return {
      axis,
      layout: this.layout,
      swipeDirection: this.currentSwipeDirection,
    }
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => (
      gestureState.dx !== 0 && gestureState.dy !== 0
    ),
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const isVerticalSwipe = (d: any) => ['up', 'down'].includes(d)
      const isHorizontalSwipe = (d: any) => ['left', 'right'].includes(d)

      const newSwipeDirection = this.getSwipeDirection(gestureState)
      const isSameDirection =
        isVerticalSwipe(this.currentSwipeDirection) === isVerticalSwipe(newSwipeDirection) ||
        isHorizontalSwipe(this.currentSwipeDirection) === isHorizontalSwipe(newSwipeDirection)
      // newDirection & currentSwipeDirection must be same direction
      if (newSwipeDirection && isSameDirection) {
        this.currentSwipeDirection = newSwipeDirection
      }
      if (this.isAllowedDirection(gestureState)) {
        let animEvent = {}
        if (isVerticalSwipe(this.currentSwipeDirection)) {
          animEvent = { dy: this.pan.y }
        } else if (isHorizontalSwipe(this.currentSwipeDirection)) {
          animEvent = { dx: this.pan.x }
        }
        Animated.event([null, animEvent])(event, gestureState)
        if (this.props.onSwiping) {
          this.props.onSwiping(this.createDragEvent({
            x: this.state.x,
            y: this.state.y,
          }))
        }
      }
    },
    onPanResponderRelease: () => {
      this.pan.flattenOffset()
      const event = this.createDragEvent({
        x: this.state.x,
        y: this.state.y,
      })
      // on swipe out
      if (
        this.props.onSwipeOut &&
        Math.abs(this.state.x) > (this.props.swipeThreshold || 100) ||
        Math.abs(this.state.y) > (this.props.swipeThreshold || 100)
      ) {
        if (this.props.onSwipingOut) this.props.onSwipingOut(event)
        const toValue = this.getDisappearDirection()
        if (toValue !== null) {
          Animated.spring(this.pan, {
            toValue: toValue,
            velocity: 0,
            tension: 65,
            friction: 11,
            useNativeDriver: false,
          }).start(() => {
            if (this.props.onSwipeOut) this.props.onSwipeOut(event)
          })
        }

        return
      }
      // on release
      this.currentSwipeDirection = null
      if (this.props.onRelease) this.props.onRelease(event)
      Animated.spring(this.pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        velocity: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: false,
      }).start()
    },
  })

  render() {
    const { children: renderContent, style } = this.props
    const content = renderContent({
      pan: this.pan,
      onLayout: this.onLayout,
    })

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={style}
      >
        { content}
      </Animated.View >
    )
  }
}
