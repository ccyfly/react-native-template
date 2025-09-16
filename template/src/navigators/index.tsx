import { useBackHandler } from '@react-native-community/hooks'
import { NavigationContainer, Theme as NavigationThemeType } from '@react-navigation/native'
import React, { FunctionComponent, useCallback } from 'react'
import { BackHandler, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'

import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import { selectLoading } from '@/redux/selectors/nonPersist'
import { ThemeNavigationTheme } from '@/theme/types'

import RootStack from './RootStack'
import { navigationRef } from './utils'

interface IAppContainerProps {
  theme: NavigationThemeType
}
const AppNavigationContainer: FunctionComponent<IAppContainerProps> = ({ theme }: IAppContainerProps) => {
  const { Colors, darkMode } = useTheme()
  const { statusBarBackgroundColor } = Colors


  const loading = useSelector(selectLoading)
  const onBackPress = useCallback(() => {
    logger.log('onBackPress', loading)

    return loading
  }, [loading])
  useBackHandler(onBackPress)


  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} translucent backgroundColor={statusBarBackgroundColor} />
      <RootStack />
    </NavigationContainer>
  )
}

export default AppNavigationContainer
