import { REACT_APP_DEBUG } from '@env'
import React from 'react'
import { Alert, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import {
  Body,
  Button,
  Container,
  Content,
  IconX,
  MaterialTextInput,
} from '@/components/basic'
import logger from '@/infrastructures/common/logger'
import { EncryptHelper } from '@/utils/encrypt-helper'

const HomeScreen = () => {

  const test = async () => {
    logger.log('test start')
    const result = await EncryptHelper.encryptData('test')
    logger.log('test end result', result)
  }

  void test()

  return (
    <Container insetTop>
      <Body>
        <Button type="text" icon={<IconX origin={IconX.IONICONS} name="home" />} text="Login" />
        <Content tPadding={'tiny'}>
          <IconX origin={IconX.ANT_DESIGN} name="home" />
        </Content>
        <Content tPadding={'small'}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'yellow',
            }}
          >
            <MaterialTextInput
              mode="outlined"
              label="Label"
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </Content>
        <Content tPadding={'tiny'}>
          <View
            style={{
              width: '100%',
            }}
          >
            <MaterialTextInput
              style={{
                // backgroundColor: 'green',
              }}
              secureTextEntry
              showEye
              textContentType="password"
            />
          </View>
        </Content>
        <Content tPadding={'tiny'}>
          <TextInput />
        </Content>
        <Content tPadding={'tiny'}>
          <Button
            type="icon"
            icon={<IconX origin={IconX.IONICONS} name="send" />}
          />
        </Content>
      </Body>
    </Container>
  )
}

export default HomeScreen
