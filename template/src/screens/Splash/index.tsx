import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import useTheme from '@/hooks/useTheme'
import Timeout from '@/infrastructures/common/Timeout'
import { AppRoutes } from '@/navigators/types'
import { navigateAndSimpleReset } from '@/navigators/utils'
import { setDefaultTheme } from '@/redux/reducers/themeSlice'
import { selectInitiated } from '@/redux/selectors/nonPersist'

const SplashScreen = () => {
  const { Colors, Layout } = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const initiated = useSelector(selectInitiated)
  const [timeout, setTimeout] = useState(false)

  const navigateToMain = useCallback(() => {
    console.log('navigateToMain initiated', initiated)
    console.log('navigateToMain timeout', timeout)
    if (initiated && timeout) {
      navigateAndSimpleReset(AppRoutes.HomeScreen)
    }
  }, [initiated, timeout])

  const init = () => {
    dispatch(setDefaultTheme({
      theme: 'default',
      darkMode: null,
    }))

    const to = new Timeout({
      ms: 3000,
    })
    to.start().catch(() => {
      setTimeout(true)
    })
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    navigateToMain()
  }, [initiated, timeout])

  return (
    <SafeAreaView style={[Layout.fill, Layout.colCenter]}>
      <Text
        style={{
          color: Colors.text,
        }}
      >
        {t('general:app_name')}
      </Text>
    </SafeAreaView>
  )
}

export default SplashScreen
