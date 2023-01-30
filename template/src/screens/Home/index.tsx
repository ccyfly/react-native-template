import styled from '@emotion/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/basic'
import IconX from '@/components/basic/Icons'
import { Locale } from '@/configs/constants/type'
import useTheme from '@/hooks/useTheme'
import { setLocale } from '@/redux/reducers/settingSlice'
import { changeTheme } from '@/redux/reducers/themeSlice'
import { FontScale } from '@/theme/types'

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`
const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const {
    Colors,
    Fonts,
    Gutters,
    Layout,
  } = useTheme()
  const { t } = useTranslation()


  const changeToZh = () => {
    dispatch(setLocale(Locale.zhTW))
  }

  const changeToEn = () => {
    dispatch(setLocale(Locale.enUS))
  }

  const changeToLarge = () => {
    dispatch(changeTheme({
      fontScale: FontScale.LARGE,
    }))
  }

  const changeToMedium = () => {
    dispatch(changeTheme({
      fontScale: FontScale.MEDIUM,
    }))
  }

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
        style={[
          {
            color: Colors.text,
          }, Fonts.textRegular,
        ]}
      >
        {t('general:app_name')}
      </Text>
      <IconX
        origin={IconX.MATERIAL_COMMUNITY}
        name="star"
      />
      <View>
        <Text>Top: {insets.top}</Text>
      </View>
      <View
        style={[Layout.row]}
      >
        <Button onPress={changeToZh} text={'ZH'} type="round" style={[Gutters.regularHPadding]}/>
        <Button onPress={changeToEn} text={'Eng'} type="round"/>
      </View>
      <View
        style={[Layout.row]}
      >
        <Button onPress={changeToLarge} text={'Large'} type="outline" style={[Gutters.regularHPadding]}/>
        <Button onPress={changeToMedium} text={'Medium'} type="outline" style={[Gutters.regularHPadding]}/>
      </View>
    </View>
  )
}

export default HomeScreen
