import { NavigatorScreenParams } from '@react-navigation/native'

import { MainBottomTabNavigationParamList } from '@/navigators/MainBottomTabNav/types'
import { AppRoutes } from '@/navigators/types'

export type MainDrawerNavigationParamList = {
  [AppRoutes.MainBottomTabNav]: NavigatorScreenParams<MainBottomTabNavigationParamList>
}
