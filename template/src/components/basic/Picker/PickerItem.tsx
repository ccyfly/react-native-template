import _ from 'lodash'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

import { IconX, PressableOpacity } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

import PickerContext from './PickerContext'
import { getItemLabel, isItemSelected } from './PickerPresenter'
import { PickerItemProps } from './types'

const PickerItem = (props: PickerItemProps) => {
  const {
    disabled,
    label,
    labelStyle,
    selectedIcon,
    selectedIconColor,
    testID,
    value,
  } = props
  const { Colors } = useTheme()
  const context = useContext(PickerContext)
  const customRenderItem = context.renderItem || props.renderItem
  const itemValue = value
  const isSelected = isItemSelected(itemValue, context.value)
  const itemLabel = getItemLabel(label, value, props.getItemLabel || context.getLabel)
  const selectedCounter = context.selectionLimit && _.isArray(context.value) && context.value?.length
  const styles = makeStyles({ Colors })

  const isItemDisabled = useMemo(() => {
    return !!(disabled || (!isSelected && context.selectionLimit && context.selectionLimit === selectedCounter))
  }, [selectedCounter])


  const selectedIndicator = useMemo(() => {
    if (isSelected) {
      return <IconX origin={IconX.MATERIAL_DESIGN_ICONS} name={'check'} size={20} color={Colors.primary} />
    }
  }, [isSelected, isItemDisabled, selectedIcon, selectedIconColor])

  const itemLabelStyle = useMemo(() => {
    return [styles.labelText, isItemDisabled ? styles.labelTextDisabled : undefined, labelStyle]
  }, [isItemDisabled, labelStyle])

  const _onPress = useCallback(() => {
    context.onPress(value)
  }, [value, context.onPress])

  const onSelectedLayout = useCallback((...args: any[]) => {
    _.invoke(context, 'onSelectedLayout', ...args)
  }, [])

  const _renderItem = () => {
    return (
      <View style={[styles.container]}>
        <Text numberOfLines={1} style={itemLabelStyle}>
          {itemLabel}
        </Text>
        {selectedIndicator}
      </View>
    )
  }

  return (
    <PressableOpacity
      activeOpacity={0.5}
      onPress={_onPress}
      onLayout={isSelected ? onSelectedLayout : undefined}
      disabled={isItemDisabled}
      testID={testID}
    // throttleTime={0}
    >
      {customRenderItem ? customRenderItem(value, { ...props, isSelected, isItemDisabled }, itemLabel) : _renderItem()}
    </PressableOpacity>
  )
}

const makeStyles = ({ Colors }: Pick<Theme, 'Colors'>) => {
  return StyleSheet.create({
    container: {
      height: 56.5,
      paddingHorizontal: 23,
      borderColor: Colors.border,
      borderBottomWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labelText: {
      // ...Typography.text70,
      color: Colors.text,
      flex: 1,
      textAlign: 'left',
    },
    labelTextDisabled: {
      color: Colors.onSurfaceDisabled,
    },
  })
}

export default PickerItem
