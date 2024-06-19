import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-paper/src/components/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { images } from '@/assets'
import { IconX, PressableOpacity } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import { AppRoutes } from '@/navigators/types'

import DrawerItem from './DrawerItem'

const DrawerContent = (props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets()
  const { Colors, Fonts, Gutters, Layout } = useTheme()
  const { t } = useTranslation()

  const { navigation, state } = props
  const { index, routes } = state
  const currentRouteName = routes[index].name

  const gotoSettings = () => {
    navigation.navigate(AppRoutes.SettingsScreen)
    navigation.closeDrawer()
  }

  const navigateTo = (routeName: string) => {
    navigation.navigate(routeName)
    navigation.closeDrawer()
  }

  const closeDrawer = () => {
    navigation.closeDrawer()
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props}/> */}
      <View
        style={[Layout.row, Layout.fill, Layout.justifyContentEnd, Gutters.smallHPadding]}
      >
        {/* <Icon size={40} source={images.menu_settings} /> */}
        <PressableOpacity onPress={closeDrawer}>
          <IconX size={40} color={Colors.text} origin={IconX.ANT_ICON} name="close" />
        </PressableOpacity>
      </View>
      <DrawerItem
        label={({ color, focused }) => <Text style={[{ color }]}>{`${t('screens:home')}`}</Text>}
        icon={({ color, focused, size }) => <IconX size={40} color={color} origin={IconX.ANT_ICON} name={'home'}/> }
        // labelStyle={[Fonts.drawerItem, { color: currentRouteName === AppRoutes.DrawerMain ? Colors.primary : Colors.text }]}
        focused={currentRouteName === `${AppRoutes.MainBottomTabNav}`}
        activeTintColor={Colors.primary}
        inactiveTintColor={Colors.text}
        activeBackgroundColor={Colors.transparent}
        onPress={() => navigateTo(AppRoutes.MainBottomTabNav)}
      />
    </DrawerContentScrollView>
  )

}

export default DrawerContent
