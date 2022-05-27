import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

type Setting = {
  onChange: (newState: AppStateStatus) => void
  onForeground: () => void
  onBackground: () => void
}

const isValidFunction = (func: unknown) => {
  return func && typeof func === 'function'
}

const useAppState = (settings: Setting) => {
  const { onBackground, onChange, onForeground } = settings
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && appState !== 'active') {
        onForeground()
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        onBackground()
      }
      setAppState(nextAppState)
      onChange(nextAppState)
    }
    const unsub = AppState.addEventListener('change', handleAppStateChange)

    return () => unsub.remove()
  })

  return {
    appState,
  }
}

export default useAppState
