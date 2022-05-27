/* eslint-disable no-console */
import { Theme as EmotionTheme, ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useDispatch, useSelector } from 'react-redux'

import LoadingOverlay from '@/components/basic/LoadingOverlay'
import { Locale } from '@/configs/constants/type'
import { ThemeContext } from '@/contexts/ThemeContext'
import useBuildTheme from '@/hooks/useBuildTheme'
import i18n from '@/locales/i18n'
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

  const emotionTheme: EmotionTheme = {
    colors: NavigationTheme.colors,
    size: MetricsSizes,
  }

  useEffect(() => {
    console.log(`lang: ${lang ? lang : 'null'}`)
    console.log(`i18n.language: ${i18n.language ? i18n.language : 'null'}`)
    const preferredLocale = RNLocalize.getLocales()[0]
    const deviceLocale = preferredLocale.languageTag
    console.log('deviceLocale: ' + deviceLocale)

    // Set app locale as device's locale
    if (lang === null) {
      setupLocale(deviceLocale)
    } else {
      i18n.changeLanguage(lang)
        .then(() => {
          dispatch(setInitiated(true))
        })
        .finally(() => {
          // finally
        })
    }
    RNLocalize.addEventListener('change', handleLocalizationChange)

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange)
    }
  }, [lang])

  const handleLocalizationChange = () => {
    const preferredLocale = RNLocalize.getLocales()[0]
    const deviceLocale = preferredLocale.languageTag
    console.log('handleLocalizationChange deviceLocale: ' + deviceLocale)
    setupLocale(deviceLocale)
  }

  const setupLocale = useCallback((deviceLocale: string) => {
    let appLang = Locale.enUS
    switch (deviceLocale) {
      case (new RegExp(/^en/).exec(deviceLocale) || {}).input:
        appLang = Locale.enUS
        break
      case (new RegExp(/^zh-HK/).exec(deviceLocale) || new RegExp(/^zh-Hant/).exec(deviceLocale) || {}).input:
        appLang = Locale.zhTW
        break
      case (new RegExp(/^zh-CN/).exec(deviceLocale) || new RegExp(/^zh-Hans/).exec(deviceLocale) || {}).input:
        appLang = Locale.zhCN
        break
    }
    console.log(`appLang: ${appLang}`)
    i18n.changeLanguage(appLang)
      .then(() => {
        dispatch(setLocale(appLang))
        dispatch(setInitiated(true))
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
            {true ? <AppNavigationContainer theme={NavigationTheme} /> : <></>}
            <LoadingOverlay indicatorColor={Colors.primary}/>
          </RootSiblingParent>
        </PaperProvider>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppContainer
