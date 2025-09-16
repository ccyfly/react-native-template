import { NewAppScreen } from '@react-native/new-app-screen'
import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { MD2Colors } from 'react-native-paper'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/redux/store'

import AppContainer from './AppContainer'
import i18n from './locales/i18n'

function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
