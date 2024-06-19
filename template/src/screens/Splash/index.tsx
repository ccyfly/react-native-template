import { Route, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useState from 'react-usestateref'

import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import Timeout from '@/infrastructures/common/Timeout'
import { RootScreenNavigationProp } from '@/navigators/props'
import { AppRoutes } from '@/navigators/types'
import { navigateAndSimpleReset } from '@/navigators/utils'
import { setDefaultTheme } from '@/redux/reducers/themeSlice'
import { useAppDispatch } from '@/redux/store'
import { FontScale } from '@/theme/types'

const SplashScreen = () => {
  const navigation = useNavigation<RootScreenNavigationProp>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [timeout, setTimeout] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    dispatch(setDefaultTheme({
      theme: 'default',
      darkMode: null,
      fontScale: FontScale.MEDIUM,
    }))

    const to = new Timeout({ ms: 3000 })
    to.start().catch(() => {
      setTimeout(true)
    })
  }

  useEffect(() => {
    // init whether completed
    if (timeout) {
      // Navigate to Main Drawer
      navigateAndSimpleReset(AppRoutes.MainDrawerNav)
    }
  }, [timeout])

  return (
    <></>
  )
}

export default SplashScreen
