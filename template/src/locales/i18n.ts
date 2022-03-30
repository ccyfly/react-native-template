/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n, {
  InitOptions,
  LanguageDetectorAsyncModule,
  Services,
} from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

import { StorageKeys } from '@/configs'
import { Locale } from '@/configs/constants/type'

import en_US from './en-US/index'
import zh_TW from './zh-TW/index'

const i18nOptions: InitOptions = {
  compatibilityJSON: 'v3',
  lng: 'zh_TW',
  fallbackLng: 'zh_TW',
  debug: true,
  keySeparator: '.',
  nsSeparator: ':',
  interpolation: {
    escapeValue: false,
  }, // not needed for react as it escapes by default
  resources: {
    en_US: en_US,
    zh_TW: zh_TW,
  },
  react: {
    // wait: true,
    useSuspense: true,
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    nsMode: 'default',
  },
}

const findBestMatchedDeviceLanguage = (deviceLocale: string) => {
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

  return appLang
}

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  // If this is set to true, your detect function receives a callback function that you should call with your language,
  // useful to retrieve your language stored in AsyncStorage for example
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => {
    /* use services and options */
  },
  detect: (callback: (lng: string) => void) => {
    void AsyncStorage.getItem(StorageKeys.APP_LANG)
      .then((value: string|null) => {
        if (value === undefined || value === null) {
          const preferredLocale = RNLocalize.getLocales()[0]
          const deviceLocale = preferredLocale.languageTag
          const bestLng = findBestMatchedDeviceLanguage(deviceLocale)

          console.log('i18n detector bestLng', bestLng)
          callback(bestLng)

          return
        }
        console.log('i18n detector AsyncStorage APP_LANG', value)
        callback(value)
      })
    // void AsyncStorage.getItem(, (err, lng) => {
    //   // Case 1: Error fetching stored data
    //   if (err || !lng) {
    //     if (err) {
    //       console.log('Error fetching "APP_LANG" from async store', err)
    //     } else {
    //       console.log(
    //         'No language is set, choosing the best available or English as fallback',
    //       )
    //     }
    //     const preferredLocale = RNLocalize.getLocales()[0]
    //     const deviceLocale = preferredLocale.languageTag
    //     const bestLng = findBestMatchedDeviceLanguage(deviceLocale)

    //     console.log('i18n detector bestLng', bestLng)
    //     callback(bestLng)

    //     return
    //   }
    //   console.log('i18n detector AsyncStorage APP_LANG', lng)
    //   callback(lng)
    // })
  },
  cacheUserLanguage: (lng: string) => {
    void AsyncStorage.setItem(StorageKeys.APP_LANG, lng)
    // void AsyncStorage.setItem('APP_LANG', lng)
    console.log('i18n detector cacheUserLanguage', lng)

    return
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(i18nOptions)
  .then(() => {
    // init
  })
  .finally(() => {
    // finally
  })

export default i18n
