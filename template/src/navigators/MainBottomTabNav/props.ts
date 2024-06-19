import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'

import { MainBottomTabNavigationParamList } from '@/navigators/MainBottomTabNav/types'
import { MainDrawerNavScreenProps } from '@/navigators/props'
import { AppRoutes } from '@/navigators/types'

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomTabNavigationParamList, AppRoutes.HomeScreen>,
  MainDrawerNavScreenProps
>

export type SettingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomTabNavigationParamList, AppRoutes.SettingsScreen>,
  MainDrawerNavScreenProps
>
