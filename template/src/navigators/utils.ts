import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'
import { Dimensions, Platform } from 'react-native'

import { RootStackNavigationParamList } from './types'

export const navigationRef = createNavigationContainerRef<RootStackNavigationParamList>()

export const navigate = (name: keyof RootStackNavigationParamList, params: any) => {
  if (navigationRef.isReady()) {
    console.log('navigate navigationRef ready')
    navigationRef.navigate(name, params)
  } else {
    console.log('navigate navigationRef not ready')
  }
}

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export const navigateAndSimpleReset = (name: string, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [
          {
            name,
          },
        ],
      }),
    )
  }
}

export const getCurrentRouteName = () => {
  if (navigationRef.isReady()) {
    return navigationRef.current?.getCurrentRoute()?.name
  }

  return undefined
}

export const isIphoneX = () => {
  const dimen = Dimensions.get('window')

  return (
    Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 780 || dimen.width === 780)
        || (dimen.height === 812 || dimen.width === 812)
        || (dimen.height === 844 || dimen.width === 844)
        || (dimen.height === 896 || dimen.width === 896)
        || (dimen.height === 926 || dimen.width === 926))
  )
}
