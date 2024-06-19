import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'

import { MainDrawerNavigationParamList } from '@/navigators/DrawerNav/types'
import { RootScreenProps } from '@/navigators/props'
import { AppRoutes } from '@/navigators/types'

export type MainBottomTabNavScreenProps = CompositeScreenProps<
  DrawerScreenProps<MainDrawerNavigationParamList, AppRoutes.MainBottomTabNav>,
  RootScreenProps
>

