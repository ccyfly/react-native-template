/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component, Fragment, useCallback, useEffect, useImperativeHandle } from 'react'
import {
  Animated,
  BackHandler as RNBackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import useState from 'react-usestateref'

import logger from '@/infrastructures/common/logger'

import Animation from '../animations/Animation'
import FadeAnimation from '../animations/FadeAnimation'
import type { DialogProps, DragEvent } from '../type'
import Backdrop from './Backdrop'
import DialogContext from './DialogContext'
import DraggableView from './DraggableView'

const BackHandler = RNBackHandler

// dialog states
const MODAL_OPENING: string = 'opening'
const MODAL_OPENED: string = 'opened'
const MODAL_CLOSING: string = 'closing'
const MODAL_CLOSED: string = 'closed'

// default dialog config
const DEFAULT_ANIMATION_DURATION: number = 150

// event types
const HARDWARE_BACK_PRESS_EVENT = 'hardwareBackPress'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 10,
  },
  modal: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
  round: { borderRadius: 8 },
  draggableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type DialogState =
  | typeof MODAL_OPENING


type State = {
  modalAnimation: Animation
  modalState: DialogState
}

class BaseDialogBK extends Component<DialogProps, State> {
  static defaultProps = {
    rounded: true,
    modalTitle: null,
    visible: false,
    style: null,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    modalStyle: null,
    width: null,
    height: null,
    onTouchOutside: () => { },
    onHardwareBackPress: () => false,
    hasOverlay: true,
    overlayOpacity: 0.5,
    overlayPointerEvents: null,
    overlayBackgroundColor: '#000',
    onShow: () => { },
    onDismiss: () => { },
    footer: null,
    onMove: () => { },
    onSwiping: () => { },
    onSwipeRelease: () => { },
    onSwipingOut: () => { },
    useNativeDriver: true,
  }

  isSwipingOut: boolean
  lastSwipeEvent: DragEvent | undefined
  backdrop: React.RefObject<Backdrop | null>
  constructor(props: DialogProps) {
    super(props)

    this.isSwipingOut = false
    this.lastSwipeEvent = undefined
    this.backdrop = React.createRef<Backdrop | null>()
    this.state = {
      modalAnimation: props.modalAnimation || new FadeAnimation({ animationDuration: props.animationDuration }),
      modalState: MODAL_CLOSED,
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show()
    }
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.onHardwareBackPress)
  }

  componentDidUpdate(prevProps: DialogProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.show()

        return
      }
      this.dismiss()
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, this.onHardwareBackPress)
  }

  onHardwareBackPress = (): boolean => {
    const { onHardwareBackPress } = this.props
    if (onHardwareBackPress !== undefined) {
      return onHardwareBackPress()
    }

    return false
  }

  get pointerEvents(): 'auto' | 'none' {
    const { overlayPointerEvents } = this.props
    const { modalState } = this.state
    if (overlayPointerEvents) {
      return overlayPointerEvents
    }

    return modalState === MODAL_OPENED ? 'auto' : 'none'
  }

  get modalSize(): { width: number; height: number } {
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
    let { height = 0, width = 0 } = this.props
    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight
    }

    return {
      width,
      height,
    }
  }

  show(): void {
    this.setState({ modalState: MODAL_OPENING }, () => {
      this.state.modalAnimation.in(() => {
        this.setState({ modalState: MODAL_OPENED }, this.props.onShow)
      })
    })
  }

  dismiss(): void {
    this.setState({ modalState: MODAL_CLOSING }, () => {
      if (this.isSwipingOut) {
        this.setState({ modalState: MODAL_CLOSED }, this.props.onDismiss)

        return
      }
      this.state.modalAnimation.out(() => {
        this.setState({ modalState: MODAL_CLOSED }, this.props.onDismiss)
      })
    })
  }

  handleMove = (event: DragEvent): void => {
    // prevent flashing when modal is closing and onMove callback invoked
    if (this.state.modalState === MODAL_CLOSING) {
      return
    }
    if (!this.lastSwipeEvent) {
      this.lastSwipeEvent = event
    }
    let newOpacity
    const { overlayOpacity: opacity = 1.0 } = this.props
    // const opacity = this.props.overlayOpacity;
    if (Math.abs(event.axis.y)) {
      const lastAxis = Math.abs(this.lastSwipeEvent.layout.y)
      const currAxis = Math.abs(event.axis.y)
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').height - lastAxis))
    } else {
      const lastAxis = Math.abs(this.lastSwipeEvent.layout.x)
      const currAxis = Math.abs(event.axis.x)
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').width - lastAxis))
    }
    this.backdrop?.current?.setOpacity(newOpacity)
  }

  handleSwipingOut = (event: DragEvent) => {
    this.isSwipingOut = true
    const { onSwipingOut } = this.props
    if (onSwipingOut) {
      onSwipingOut(event)
    }
  }

  render() {
    const { modalAnimation, modalState } = this.state
    const {
      animationDuration,
      children,
      footer,
      hasOverlay,
      modalStyle,
      modalTitle,
      onSwipeOut,
      onSwipeRelease,
      onSwiping,
      onTouchOutside,
      overlayBackgroundColor,
      overlayOpacity,
      rounded,
      style,
      swipeDirection,
      swipeThreshold,
      useNativeDriver,
    } = this.props

    const overlayVisible = hasOverlay && [MODAL_OPENING, MODAL_OPENED].includes(modalState)
    const round = rounded ? styles.round : null
    const hidden = modalState === MODAL_CLOSED && styles.hidden

    return (
      <DialogContext.Provider
        value={{
          hasTitle: !!modalTitle,
          hasFooter: !!footer,
        }}
      >
        <View style={[styles.container, hidden]}>
          <DraggableView
            style={StyleSheet.flatten([styles.draggableView, style])}
            onMove={this.handleMove}
            onSwiping={onSwiping}
            onRelease={onSwipeRelease}
            onSwipingOut={this.handleSwipingOut}
            onSwipeOut={onSwipeOut}
            swipeDirection={swipeDirection}
            swipeThreshold={swipeThreshold}
          >
            {({ onLayout, pan }) => (
              <Fragment>
                <Backdrop
                  ref={this.backdrop}
                  pointerEvents={this.pointerEvents}
                  visible={overlayVisible}
                  onPress={onTouchOutside}
                  backgroundColor={overlayBackgroundColor}
                  opacity={overlayOpacity}
                  animationDuration={animationDuration}
                  useNativeDriver={useNativeDriver}
                />
                <Animated.View
                  style={pan.getLayout()}
                  onLayout={onLayout}
                >
                  <Animated.View
                    style={[
                      styles.modal,
                      round,
                      this.modalSize,
                      modalStyle,
                      modalAnimation.getAnimations(),
                    ]}
                  >
                    {modalTitle}
                    {children}
                    {footer}
                  </Animated.View>
                </Animated.View>
              </Fragment>
            )}
          </DraggableView>
        </View>
      </DialogContext.Provider>
    )
  }
}

export type Handle = {
  dismiss: (onDismiss?: () => void) => void
}
const BaseDialogBase = (
  {
    animationDuration = DEFAULT_ANIMATION_DURATION,
    children,
    footer,
    hasOverlay = true,
    height,
    modalAnimation: _modalAnimation,
    modalStyle = null,
    modalTitle,
    onDismiss = () => { },
    onHardwareBackPress = () => true,
    onMove = () => { },
    onShow = () => { },
    onSwipeOut,
    onSwipeRelease = () => { },
    onSwiping = () => { },
    onSwipingOut = () => { },
    onTouchOutside = () => { },
    overlayBackgroundColor = '#000',
    overlayOpacity = 0.5,
    overlayPointerEvents,
    rounded = true,
    style = null,
    swipeDirection,
    swipeThreshold,
    useNativeDriver = true,
    visible = false,
    width,
  }: DialogProps, ref: React.Ref<Handle>) => {
  const [modalState, setModalState] = useState(MODAL_CLOSED)
  const backdropRef = React.useRef<Backdrop>(null)
  const isSwipingOut = React.useRef(false)
  const lastSwipeEvent = React.useRef<DragEvent | null>(null)
  const [modalAnimation, setModalAnimation] = useState(_modalAnimation || new FadeAnimation({ animationDuration }))

  const dismissCB = React.useRef<(() => void) | undefined>(() => { })

  useImperativeHandle(ref, () => ({
    dismiss: (cb?: () => void) => {
      dismissCB.current = cb
      dismiss()
    },
  }))

  useEffect(() => {
    const event = BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, _onHardwareBackPress)

    return () => {
      event.remove()
    }
  }, [])

  useEffect(() => {
    if (visible) {
      show()
    } else {
      dismiss()
    }
  }, [visible])

  useEffect(() => {
    if (modalState === MODAL_OPENED) {
      onShow()
    }
    if (modalState === MODAL_CLOSING) {
      if (isSwipingOut.current) {
        setModalState(MODAL_CLOSED)
      } else {
        modalAnimation.out(() => {
          setModalState(MODAL_CLOSED)
        })
      }
    }
    if (modalState === MODAL_CLOSED) {
      onDismiss()
      if (dismissCB.current) {
        dismissCB.current()
      }
    }
  }, [modalState])


  const pointerEvents = React.useMemo(() => {
    if (overlayPointerEvents) {
      return overlayPointerEvents
    }

    return modalState === MODAL_OPENED ? 'auto' : 'none'
  }, [overlayPointerEvents, modalState])

  const modalSize = React.useMemo(() => {
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight
    }

    return {
      width,
      height,
    }
  }, [height, width])

  // logger.log('modalSize', modalSize)

  const hidden = React.useMemo(() => {
    if (modalState === MODAL_CLOSED) {
      return styles.hidden
    }

    return null
  }, [modalState])
  const overlayVisible = React.useMemo(() => {
    return hasOverlay && [MODAL_OPENING, MODAL_OPENED].includes(modalState)
  }, [modalState, hasOverlay])
  const round = React.useMemo(() => { return rounded ? styles.round : null }, [rounded])

  const handleMove = useCallback((event: DragEvent): void => {
    // prevent flashing when modal is closing and onMove callback invoked
    if (modalState === MODAL_CLOSING) {
      return
    }
    if (!lastSwipeEvent?.current) {
      lastSwipeEvent.current = event
    }
    let newOpacity
    const opacity = overlayOpacity || 1
    // const opacity = this.props.overlayOpacity;
    if (Math.abs(event.axis.y)) {
      const lastAxis = Math.abs(lastSwipeEvent.current.layout.y)
      const currAxis = Math.abs(event.axis.y)
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').height - lastAxis))
    } else {
      const lastAxis = Math.abs(lastSwipeEvent.current.layout.x)
      const currAxis = Math.abs(event.axis.x)
      newOpacity = opacity - ((opacity * currAxis) / (Dimensions.get('window').width - lastAxis))
    }
    backdropRef?.current?.setOpacity(newOpacity)
  }, [modalState, overlayOpacity])

  const handleSwipingOut = (event: DragEvent) => {
    isSwipingOut.current = true
    onSwipingOut?.(event)
  }

  const _onHardwareBackPress = (): boolean => {
    if (onHardwareBackPress !== undefined) {
      return onHardwareBackPress()
    }

    return false
  }

  const show = () => {
    logger.log('call show')
    setModalState(MODAL_OPENING)
    modalAnimation.in(() => {
      setModalState(MODAL_OPENED)
    })
  }

  const dismiss = () => {
    logger.log('call dismiss')
    setModalState(MODAL_CLOSING)
  }

  return (
    <View style={[styles.container, hidden]}>
      {/* <DraggableView
        style={StyleSheet.flatten([styles.draggableView, style])}
        onMove={handleMove}
        onSwiping={onSwiping}
        onRelease={onSwipeRelease}
        onSwipingOut={handleSwipingOut}
        onSwipeOut={onSwipeOut}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
      >
        {({ onLayout, pan }) => (
          <Fragment>
            <Backdrop
              ref={backdropRef}
              pointerEvents={pointerEvents}
              visible={overlayVisible}
              onPress={onTouchOutside}
              backgroundColor={overlayBackgroundColor}
              opacity={overlayOpacity}
              animationDuration={animationDuration}
              useNativeDriver={useNativeDriver}
            />
            <Animated.View
              style={pan.getLayout()}
              onLayout={onLayout}
            >
              <Animated.View
                style={[
                  styles.modal,
                  round,
                  modalSize,
                  modalStyle,
                  modalAnimation.getAnimations(),
                ]}
              >
                {modalTitle}
                {children}
                {footer}
                <TouchableOpacity
                  style={{ padding: 20 }}
                  onPress={() => {
                    logger.log('close')
                  }}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Fragment>
        )}
      </DraggableView> */}
      <View
        style={StyleSheet.flatten([styles.draggableView, style])}
      >
        <Fragment>
          <Backdrop
            ref={backdropRef}
            pointerEvents={pointerEvents}
            visible={overlayVisible}
            onPress={onTouchOutside}
            backgroundColor={overlayBackgroundColor}
            opacity={overlayOpacity}
            animationDuration={animationDuration}
            useNativeDriver={useNativeDriver}
          />
          <Animated.View >
            <Animated.View
              style={[
                styles.modal,
                round,
                modalSize,
                modalStyle,
                modalAnimation.getAnimations(),
              ]}
            >
              {modalTitle}
              {children}
              {footer}
            </Animated.View>
          </Animated.View>
        </Fragment>
      </View>
    </View>
  )
}

export type BaseDialog = Handle
export const BaseDialog = React.forwardRef(BaseDialogBase)
