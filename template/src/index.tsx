import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/redux/store'

import AppContainer from './AppContainer'
import i18n from './locales/i18n'

// if (__DEV__) {
//   initializeMMKVFlipper({
//     default: mmkvStorage,
//   })
// }

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <SafeAreaProvider>
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
                    backgroundColor: Colors.grey700,
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
