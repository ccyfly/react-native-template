import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, StatusBar, View } from 'react-native'

import HomeScreen from '@/screens/Home'
import SplashScreen from '@/screens/Splash'

import { AppRoutes,  RootStackNavigationParamList } from './types'

const Stack = createStackNavigator<RootStackNavigationParamList>()

const RootStack = (): React.ReactElement => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      // headerMode="none"
      // headerMode={'float'}
      initialRouteName={AppRoutes.SplashScreen}
    >
      <Stack.Screen
        name={AppRoutes.SplashScreen}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.HomeScreen}
        component={HomeScreen}
        options={{
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
