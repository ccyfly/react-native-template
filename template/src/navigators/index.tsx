import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StatusBar } from 'react-native'

import useTheme from '@/hooks/useTheme'
import { ThemeNavigationTheme } from '@/theme/types'

import RootStack from './RootStack'
import { navigationRef } from './utils'

interface IAppContainerProps {
  theme: ThemeNavigationTheme
}
const AppNavigationContainer: FunctionComponent<IAppContainerProps> = ({ theme }: IAppContainerProps) => {
  const { Colors, darkMode } = useTheme()
  const { statusBarBackgroundColor } = Colors

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} translucent backgroundColor={statusBarBackgroundColor} />
      <RootStack />
    </NavigationContainer>
  )
}

export default AppNavigationContainer
