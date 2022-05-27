import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import IconX from '@/components/basic/Icons'
import useTheme from '@/hooks/useTheme'

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const { Colors, Gutters, Layout } = useTheme()
  const { t } = useTranslation()

  return (
    <View
      style={[
        Layout.fill,
        Gutters.regularHPadding,
        Gutters.regularVPadding,
        // {
        //   paddingTop: insets.top,
        // },
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
        origin={IconX.MATERIAL_COMMUNITY}
        name="star"
      />
    </View>
  )
}

export default HomeScreen
