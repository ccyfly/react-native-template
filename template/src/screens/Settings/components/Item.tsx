import React, { PropsWithChildren, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'

import { Content, PressableOpacity } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

export interface IItemProps extends PropsWithChildren {
  onPress?: () => void|undefined
}
const Item: React.FC<IItemProps> = ({ children, onPress }) => {
  const theme = useTheme()
  const { Colors, Fonts, Gutters, Layout } = theme
  const styles = useMemo(() => {
    return makeStyles(theme)
  }, [theme])

  return (
    <View>
      <PressableOpacity
        activeOpacity={onPress !== undefined ? .6 : 1}
        onPress={onPress}
      >
        <Content
          style={[styles.Item]}
        >
          {children}
        </Content>
      </PressableOpacity>
      <Divider/>
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  Item: {
    minHeight: 50,
    justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: theme.Colors.border,
  },
})

export default Item
