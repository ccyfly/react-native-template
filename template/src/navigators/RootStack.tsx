import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, StatusBar, View } from 'react-native'

import Header, { HeaderProps } from '@/components/basic/Header'
import HomeScreen from '@/screens/Home'
import SplashScreen from '@/screens/Splash'

import { AppRoutes,  RootStackNavigationParamList } from './types'

const Stack = createStackNavigator<RootStackNavigationParamList>()

const RootStack = (): React.ReactElement => {
  const { t } = useTranslation()

  const renderHeader = (props: HeaderProps) => {
    return (
      <View>
        {/* <StatusBar></StatusBar> */}
        <Header {...props} />
      </View>
    )
  }

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
          headerShown: true,
          title: t('screens:home'),
          headerBackTitleVisible: false,
          header: renderHeader,
        }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
