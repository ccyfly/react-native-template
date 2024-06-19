import { Theme as EmotionTheme, ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import React, { useCallback, useEffect } from 'react'
import * as RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useDispatch, useSelector } from 'react-redux'

import LoadingOverlay from '@/components/basic/LoadingOverlay'
import { ThemeContext } from '@/contexts/ThemeContext'
import useAppState from '@/hooks/useAppState'
import useBuildTheme from '@/hooks/useBuildTheme'
import logger from '@/infrastructures/common/logger'
import i18n, { findBestMatchedDeviceLanguage } from '@/locales/i18n'
import AppNavigationContainer from '@/navigators'
import { setInitiated } from '@/redux/reducers/nonPersistSlice'
import { setLocale } from '@/redux/reducers/settingSlice'
import { selectInitiated } from '@/redux/selectors/nonPersist'
import { selectLocale } from '@/redux/selectors/setting'

const AppContainer = (): React.ReactElement => {
  const dispatch = useDispatch()
  const theme = useBuildTheme()
  const { Colors, MetricsSizes, NavigationTheme } = theme
  const initiated = useSelector(selectInitiated)
  const lang = useSelector(selectLocale)
  const appState = useAppState({})

  React.useEffect(() => {
    logger.debug('AppContainer: appState: ', appState)
  }, [appState])

  const emotionTheme: EmotionTheme = {
    colors: NavigationTheme.colors,
    size: MetricsSizes,
    roundness: NavigationTheme.roundness,
    param: theme.Param,
  }

  // TODO: Linking handler for Deep Linking
  // TODO: Receive Push Notification handler

  useEffect(() => {
    logger.log('lang: ', lang)
    logger.log(`i18n.language: ${i18n.language ? i18n.language : 'null'}`)
    const preferredLocale = RNLocalize.getLocales()[0]
    const deviceLocale = preferredLocale.languageTag
    logger.log('deviceLocale: ' + deviceLocale)

    // Set app locale as device's locale
    if (lang === null || lang === undefined) {
      setupLocale(deviceLocale)
    } else {
      i18n.changeLanguage(lang)
        .then(() => {
          dispatch(setInitiated(true))
        })
        .catch((error) => {

        })
        .finally(() => {
          // finally
        })
    }
    // RNLocalize.addEventListener('change', handleLocalizationChange)

    // return () => {
    //   RNLocalize.removeEventListener('change', handleLocalizationChange)
    // }
  }, [lang])

  const handleLocalizationChange = () => {
    const preferredLocale = RNLocalize.getLocales()[0]
    const deviceLocale = preferredLocale.languageTag
    logger.log('handleLocalizationChange deviceLocale: ' + deviceLocale)
    setupLocale(deviceLocale)
  }

  const setupLocale = useCallback((deviceLocale: string) => {
    const appLang = findBestMatchedDeviceLanguage(deviceLocale)
    logger.log(`appLang: ${appLang}`)
    i18n.changeLanguage(appLang)
      .then(() => {
        dispatch(setLocale(appLang))
        dispatch(setInitiated(true))
      })
      .catch((error) => {

      })
      .finally(() => {
        // finally
      })
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      <EmotionThemeProvider theme={emotionTheme}>
        <PaperProvider theme={NavigationTheme}>
          <RootSiblingParent>
            {initiated ? <AppNavigationContainer theme={NavigationTheme} /> : <></>}
            <LoadingOverlay indicatorColor={Colors.primary} />
          </RootSiblingParent>
        </PaperProvider>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppContainer
AppContainer.displayName = 'AppContainer'
