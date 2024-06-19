import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'

import {
  Body,
  Button,
  Container,
  Content,
  IconX,
  MaterialTextInput,
} from '@/components/basic'

const HomeScreen = () => {
  return (
    <Container insetTop>
      <Body>
        <Content tPadding={'tiny'}>
          <IconX origin={IconX.ANT_ICON} name="home" />
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
              backgroundColor: 'yellow',
            }}
          >
            <MaterialTextInput
              style={{
                backgroundColor: 'green',
              }}
              secureTextEntry
              showEye
            />
          </View>
        </Content>
        <Content tPadding={'tiny'}>
          <TextInput />
        </Content>
        <Content tPadding={'tiny'}>
          <Button
            type="icon"
            icon={<IconX origin={IconX.ANT_ICON} name="home" />}
          />
        </Content>
      </Body>
    </Container>
  )
}

export default HomeScreen
