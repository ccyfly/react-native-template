import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'
import { Dimensions, Platform } from 'react-native'

import { RootStackNavigationParamList } from './types'

export const navigationRef = createNavigationContainerRef<RootStackNavigationParamList>()

export const navigate= (name: keyof RootStackNavigationParamList, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
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
    console.log('navigationRef.navigateAndSimpleReset')
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
