import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { LogBox, View } from 'react-native'
import { MD2Colors } from 'react-native-paper'
// import { enGB, registerTranslation, zhTW } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { persistor, store } from '@/redux/store'

import AppContainer from './AppContainer'
import i18n from './locales/i18n'

// LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs()

// registerTranslation('en', enGB)
// registerTranslation('zh', zhTW)

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <SafeAreaProvider>
      {/* {(__DEV__ && !process.env.JEST_WORKER_ID) && (<FlipperAsyncStorage />)} */}
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={'is loading'}>
          <Provider store={store}>
            <PersistGate
              loading={
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: MD2Colors.grey700,
                  }}
                />
              }
              persistor={persistor}
            >
              <AppContainer />
            </PersistGate>
          </Provider>
        </Suspense>
      </I18nextProvider>
    </SafeAreaProvider>
  )
}

export default App
