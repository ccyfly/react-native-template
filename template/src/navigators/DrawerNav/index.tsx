import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'

import useTheme from '@/hooks/useTheme'
import DrawerContent from '@/navigators/DrawerNav/DrawerContent'
import { MainDrawerNavigationParamList } from '@/navigators/DrawerNav/types'
import MainBottomTabNav from '@/navigators/MainBottomTabNav'
import { AppRoutes } from '@/navigators/types'

const Drawer = createDrawerNavigator<MainDrawerNavigationParamList>()

const DrawerNav = (): React.ReactElement => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: Colors.background,
          width: '80%',
        },
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name={AppRoutes.MainBottomTabNav}
        component={MainBottomTabNav}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNav
