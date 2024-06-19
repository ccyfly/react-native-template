import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Header, { HeaderProps } from '@/components/basic/Header'
import DrawerNav from '@/navigators/DrawerNav'
import SplashScreen from '@/screens/Splash'

import { AppRoutes, RootStackNavigationParamList } from './types'

const Stack = createStackNavigator<RootStackNavigationParamList>()

const RootStack = (): React.ReactElement => {
  const renderHeader = (props: HeaderProps) => {
    return (
      <>
        <Header {...props} />
      </>
    )
  }

  return (
    <Stack.Navigator
      // headerMode="none"
      // headerMode={'float'}
      id={'Root'}
      initialRouteName={AppRoutes.SplashScreen}
    >
      <Stack.Screen
        name={AppRoutes.SplashScreen}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AppRoutes.MainDrawerNav}
        component={DrawerNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
