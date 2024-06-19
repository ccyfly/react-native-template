import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { IconX } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { MainBottomTabNavigationParamList } from '@/navigators/MainBottomTabNav/types'
import { AppRoutes } from '@/navigators/types'
import HomeScreen from '@/screens/Home'
import SettingsScreen from '@/screens/Settings'

const Tab = createBottomTabNavigator<MainBottomTabNavigationParamList>()

const MainBottomTabNav = () => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { Colors } = useTheme()

  const tabBarHeight = 60 + insets.bottom

  const renderTabIcon = useCallback((iconName: string) => {
    const renderNamedTabIcon = ({ color, focused }: { color?: string; focused: boolean }) => {
      return <IconX origin={IconX.ANT_ICON} name={iconName} size={30} color={color}/>
    }

    return renderNamedTabIcon
  }, [])

  return (
    <Tab.Navigator
      initialRouteName={AppRoutes.HomeScreen}
      backBehavior={'initialRoute'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => {
          return (
            <LinearGradient colors={[
              '#E8E8E8', '#E8E8E8', '#fff', '#fff', '#FAFAFA', '#E8E8E8',
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{ height: tabBarHeight }}
            />
          )
        },
        tabBarStyle: {
          height: tabBarHeight,
        },
      }}
    >
      <Tab.Screen
        name={AppRoutes.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: `${t('screens:home')}`,
          tabBarIcon: renderTabIcon('home'),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      <Tab.Screen
        name={AppRoutes.SettingsScreen}
        component={SettingsScreen}
        options={{
          tabBarLabel: `${t('screens:settings')}`,
          tabBarIcon: renderTabIcon('setting'),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default MainBottomTabNav
