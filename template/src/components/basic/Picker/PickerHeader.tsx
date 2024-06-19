import _ from 'lodash'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/basic'
import { PickerHeaderProps, PickerLayouts } from '@/components/basic/Picker/types'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

const PickerHeader: React.FC<PickerHeaderProps> = (props: PickerHeaderProps) => {
  const {
    closeIcon,
    closeLabel,
    closeLabelStyle,
    doneIcon,
    doneLabel,
    doneLabelStyle,
    layout = PickerLayouts.full,
    onClose,
    onDone,
    title,
    titleStyle,
    backgroundColor,
  } = props
  const { Colors, Gutters, Layout, Param } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = makeStyles({ Colors, Gutters, Layout, Param }, layout, insets)

  return (
    <View
      style={[styles.header, { backgroundColor: backgroundColor || Colors.primary }]}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]} variant={'titleLarge'}>{title || ''}</Text>
        </View>
        <View style={[styles.leftButton]}>
          {closeLabel ? (
            <Button
              type={'text'}
              onPress={onClose}
              text={closeLabel}
              textColor={Colors.onPrimary}
            />
          ) : (
            <Button
              type={'icon'}
              onPress={onClose}
              icon={closeIcon || 'close'}
              textColor={Colors.onPrimary}
            />
          )}
        </View>
        <View style={[styles.rightButton]}>
          {doneLabel && onDone ? (
            <Button
              type={'text'}
              onPress={onDone}
              text={doneLabel}
              textColor={Colors.onPrimary}
            />
          ) : (<>
            {
              onDone && (
                <Button
                  type={'icon'}
                  onPress={onDone}
                  icon={doneIcon || 'check'}
                  textColor={Colors.onPrimary}
                />
              )
            }
          </>)}
        </View>
      </View>
    </View>
  )
}
const makeStyles = ({ Colors, Gutters, Layout, Param }: Pick<Theme, 'Colors'|'Gutters'|'Layout'|'Param'>, layout: PickerLayouts, insets: EdgeInsets) => {
  const headerHeight = layout === PickerLayouts.full ? (Param.headerHeight + insets.top) : Param.headerHeight
  const shouldRoundTop = layout === PickerLayouts.bottomSheet

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: headerHeight,
      width: '100%',
      paddingTop: shouldRoundTop ? 0 : insets.top,
      borderTopLeftRadius: shouldRoundTop ? Param.roundness * 3 : 0,
      borderTopRightRadius: shouldRoundTop ? Param.roundness * 3 : 0,
    },
    content: {
      flexDirection: 'row',
      flex: 1,
      height: Param.headerHeight,
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      height: Param.headerHeight,
      top: 0,
      left: 0,
      right: 0,
    },
    title: {
      color: Colors.onPrimary,
    },
    leftButton: {
      ...Gutters.smallLPadding,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightButton: {
      ...Gutters.smallRPadding,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  })}

export default PickerHeader
