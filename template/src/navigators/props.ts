import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeNavigationProp, CompositeScreenProps, RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { AppRoutes, RootStackNavigationParamList } from '@/navigators/types'

export type RootScreenProps = StackScreenProps<RootStackNavigationParamList>
export type RootScreenNavigationProp = RootScreenProps['navigation']

export type MainDrawerNavScreenProps = StackScreenProps<RootStackNavigationParamList, AppRoutes.MainDrawerNav>


