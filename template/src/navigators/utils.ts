import {
  CommonActions,
  createNavigationContainerRef,
  NavigationState,
  PartialRoute,
  PartialState,
  Route,
} from '@react-navigation/native'

// import { NavigationState, PartialState, Route } from '@react-navigation/routers'
import logger from '@/infrastructures/common/logger'

import { RootStackNavigationParamList } from './types'

export const navigationRef = createNavigationContainerRef<RootStackNavigationParamList>()
export const navigate = (name: keyof RootStackNavigationParamList, params: any) => {
  if (navigationRef.isReady()) {
    logger.log('navigate navigationRef ready')
    navigationRef.navigate(name, params)
  } else {
    logger.log('navigate navigationRef not ready')
  }
}

type ResetState =
  | PartialState<NavigationState<RootStackNavigationParamList>>
  | NavigationState<RootStackNavigationParamList>
  | (Omit<NavigationState<RootStackNavigationParamList>, 'routes'> & {
    routes: Omit<Route<string>, 'key'>[]
  })
export type ResetRoutes = ResetState['routes']

export const navigateAndReset = (routes: PartialRoute<Route<NavigationState<RootStackNavigationParamList>['routeNames'][number]>>[] | Omit<Route<string>, 'key'>[], index = 0) => {
  if (navigationRef.isReady()) {

    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export const navigateAndSimpleReset = (name: string, params: any = {}, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [
          {
            name,
            params,
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

