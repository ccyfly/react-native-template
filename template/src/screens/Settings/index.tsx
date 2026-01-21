import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useDispatch, useSelector } from 'react-redux'

import { Body, ButtonGroup, Container, Text } from '@/components/basic'
import { Locale } from '@/configs/constants/type'
import useTheme from '@/hooks/useTheme.ts'
import { setLocale } from '@/redux/reducers/settingSlice.ts'
import { selectLocale } from '@/redux/selectors/setting.ts'
import Item from '@/screens/Settings/components/Item.tsx'
import Dialogs from '@/services/Dialogs'
import { normalize } from '@/utils'

const SettingsScreen = () => {
  const buildNumber = DeviceInfo.getBuildNumber()
  const version = DeviceInfo.getVersion()

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const theme = useTheme()
  const { Colors, Fonts, Gutters, Layout } = theme

  const lang = useSelector(selectLocale)

  const onChangeLocale = (value: Locale) => {
    // dispatch(setLocale(value))
    Dialogs.confirm({
      content: 'Are you sure you want to change language?',
      onConfirm: () => {
        dispatch(setLocale(value))
      },
    })
  }

  return (
    <Container insetTop>
      <Body>
        <ScrollView overScrollMode={'never'}>
          <View>
            <Item>
              <View style={[Layout.row, Layout.fill]} >
                <View
                  style={[Layout.justifyContentCenter]}
                >
                  <Text variant={'settingText'}>{t('general:version')}</Text>
                </View>
                <View
                  style={[Layout.fill, Layout.justifyContentCenter, Layout.alignItemsEnd]}
                >
                  <Text variant={'settingText'}>{t('general:version_stringb', { version_name: version ?? '', build: buildNumber ?? '' })}</Text>
                </View>
              </View>
            </Item>
            <Item>
              <View
                style={[Layout.row, Layout.fill]}
              >
                <View
                  style={[Layout.justifyContentCenter]}
                >
                  <Text variant={'settingText'}>{t('setting:language')}</Text>
                </View>
                <View
                  style={[Layout.fill, Layout.justifyContentCenter, Layout.alignItemsEnd]}
                >
                  <ButtonGroup
                    value={lang}
                    options={[
                      {
                        label: '繁中',
                        value: Locale.zhTW,
                      },
                      {
                        label: 'EN',
                        value: Locale.enUS,
                      },
                    ]}
                    onSelect={(value) => {
                      onChangeLocale(value)
                    }}
                    style={{ maxWidth: 140 }}
                    backgroundColor={'white'}
                    radius={normalize(20)}
                  />
                </View>
              </View>
            </Item>
          </View>
        </ScrollView>
      </Body>
    </Container>
  )
}

export default SettingsScreen
