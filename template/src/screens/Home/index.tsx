import { REACT_APP_DEBUG } from '@env'
import React from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { List, TextInput } from 'react-native-paper'

import {
  Body,
  Button,
  Container,
  Content,
  IconX,
  MaterialTextInput,
} from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import { EncryptHelper } from '@/utils/encrypt-helper'

const HomeScreen = () => {
  const { Layout } = useTheme()

  const test = async () => {
    logger.log('test start')
    const result = await EncryptHelper.encryptData('test')
    logger.log('test end result', result)
  }

  void test()

  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)

  return (
    <Container insetTop>
      <ScrollView
        style={[Layout.fullWidth]}
      >
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
          <List.Section title="Accordions">
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>

            <List.Accordion
              title="Controlled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section>
          <List.Section title="Accordions">
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section>
        </Body>
      </ScrollView>
    </Container>
  )
}

export default HomeScreen
