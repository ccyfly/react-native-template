import { NavigatorScreenParams } from '@react-navigation/native'

import { MainDrawerNavigationParamList } from '@/navigators/DrawerNav/types'

export enum AppRoutes {
  SplashScreen = 'SplashScreen',
  MainDrawerNav = 'MainDrawerNav',
  MainBottomTabNav = 'MainBottomTabNav',
  HomeScreen = 'HomeScreen',
  SettingsScreen = 'SettingsScreen',
}

export type RootStackNavigationParamList = {
  [AppRoutes.SplashScreen]: undefined
  [AppRoutes.MainDrawerNav]: NavigatorScreenParams<MainDrawerNavigationParamList>|undefined
}


