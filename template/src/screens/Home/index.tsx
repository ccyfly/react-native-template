import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@/hooks/useTheme'
import { IconType, IconX } from '@/components/basic/Icons'

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const { Layout, Colors, Gutters } = useTheme()
  const { t } = useTranslation()

  return (
    <View
      style={[
        Layout.fill,
        Gutters.regularHPadding,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Text
        style={{
          color: Colors.text,
        }}
      >
        {t('general:app_name')}
      </Text>
      <IconX
        origin={IconType.MATERIAL_COMMUNITY}
        name='star'
      />
    </View>
  )
}

export default HomeScreen
