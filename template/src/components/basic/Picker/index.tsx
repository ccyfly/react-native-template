import { useKeyboard } from '@react-native-community/hooks'
import _ from 'lodash'
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { Keyboard, LayoutChangeEvent, TouchableOpacity, View } from 'react-native'
import { HelperText, Text, TextInput as PTextInput } from 'react-native-paper'

import { PressableOpacity } from '@/components/basic'
import ExpandableOverlay, { ExpandableOverlayMethods, ExpandableOverlayProps } from '@/components/basic/ExpandableOverlay'

import MaterialTextInput from '../MaterialTextInput'
import useImperativePickerHandle from './hooks/useImperativePickerHandle'
import usePickerLabel from './hooks/usePickerLabel'
import usePickerSearch from './hooks/usePickerSearch'
import usePickerSelection from './hooks/usePickerSelection'
import PickerContext from './PickerContext'
import PickerItem from './PickerItem'
import PickerItemsList from './PickerItemsList'
import { extractPickerItems } from './PickerPresenter'
import {
  PickerFieldTypes,
  PickerItemProps,
  PickerLayouts,
  PickerMethods,
  PickerModes,
  PickerProps,
  PickerSearchStyle,
  PickerValue,
} from './types'

type PickerStatics = {
  Item: typeof PickerItem
  modes: typeof PickerModes
  fieldTypes: typeof PickerFieldTypes
  extractPickerItems: typeof extractPickerItems
  layouts: typeof PickerLayouts
}

const Picker = forwardRef<ExpandableOverlayMethods, PickerProps>((props: PickerProps, ref) => {
  const {
    accessibilityHint,
    accessibilityLabel,
    children,
    containerStyle,
    disabled,
    fieldType = PickerFieldTypes.form,
    getLabel,
    // useNativePicker,
    headerProps,
    inputProps,
    // customPickerProps,
    layout,
    // labelStyle,
    listProps,
    modalProps,
    mode,
    onChange,
    onPress,
    // renderCustomModal,
    // enableModalBlur,
    // topBarProps,
    // pickerModalProps,
    onSearchChange,
    onShow,
    placeholder,
    renderCustomSearch,
    renderItem,
    renderPicker,
    searchPlaceholder,
    searchStyle,
    selectionLimit,
    showSearch,
    testID = 'Picker',
    useSafeArea,
    useWheelPicker,
    value,
    ...others
  } = props
  const pickerExpandable = useRef<ExpandableOverlayMethods>(null)
  const pickerRef = useImperativePickerHandle(ref, pickerExpandable)
  // const keyboard = useKeyboard()

  // const { preset } = others

  const [selectedItemPosition, setSelectedItemPosition] = useState(0)
  const [items, setItems] = useState(extractPickerItems(props))
  React.useEffect(() => {
    setItems(extractPickerItems(props))
  }, [children])

  const { filteredChildren, onSearchChange: _onSearchChange, setSearchValue } = usePickerSearch({ showSearch, onSearchChange, getLabel, children })
  const { cancelSelect, multiDraftValue, onDoneSelecting, toggleItemSelection } = usePickerSelection({
    value,
    onChange,
    pickerExpandableRef: pickerExpandable,
    setSearchValue,
    mode,
  })
  const { accessibilityInfo, label } = usePickerLabel({
    value,
    items,
    getLabel,
    accessibilityLabel,
    accessibilityHint,
    placeholder,
  })
  const {
    disableErrorText,
    errorColor,
    errorText,
    errorTextStyle,
    hintText,
    hintTextStyle,
    ...restInputProps
  } = inputProps || {}
  const onSelectedItemLayout = useCallback((event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y
    setSelectedItemPosition(y)
  }, [])

  const contextValue = useMemo(() => {
    // @ts-expect-error cleanup after removing migrate prop
    const pickerValue = typeof value === 'object' && !_.isArray(value) ? value?.value : value

    return {
      value: mode === PickerModes.MULTI ? multiDraftValue : pickerValue,
      onPress: mode === PickerModes.MULTI ? toggleItemSelection : onDoneSelecting,
      isMultiMode: mode === PickerModes.MULTI,
      getLabel,
      onSelectedLayout: onSelectedItemLayout,
      renderItem,
      selectionLimit,
    }
  }, [
    mode,
    value,
    multiDraftValue,
    renderItem,
    getLabel,
    selectionLimit,
    onSelectedItemLayout,
    toggleItemSelection,
    onDoneSelecting,
  ])

  // const propsByFieldType = useMemo(() => {
  //   if (fieldType === PickerFieldTypes.filter) {
  //     return {
  //       containerStyle: { flexDirection: 'row' },
  //       // labelStyle: Typography.text70,
  //       trailingAccessory: themeProps.trailingAccessory ?? <Icon marginL-s1 source={dropdown}/>,
  //     }
  //   } else if (fieldType === PickerFieldTypes.settings) {
  //     return {
  //       label: undefined,
  //     }
  //   }
  // }, [fieldType, preset, themeProps.trailingAccessory])

  const renderHelperText = useCallback(() => {
    if (!!errorText) {
      return (
        <HelperText
          type="error"
          visible={!!errorText}
          padding={'none'}
        >{errorText}</HelperText>
      )
    } else if (!!hintText) {
      return (
        <HelperText
          type="info"
          visible={!!hintText}
          padding={'none'}
        >{hintText}</HelperText>
      )
    }

    return null
  }, [errorColor, errorText, errorTextStyle, hintText, hintTextStyle])
  const renderPickerInnerInput = () => {

    return (
      <>
        <PressableOpacity
          onPress={() => {
            Keyboard.dismiss()
            pickerExpandable.current?.toggleExpandable()
          }}
        >
          <View pointerEvents={'none'}>
            <MaterialTextInput
              value={label ?? ''}
              right={<PTextInput.Icon icon="chevron-down" />}
              disableErrorText
              {...restInputProps}
            />
          </View>
        </PressableOpacity>
        {renderHelperText()}
      </>
    )
  }

  const expandableModalContent = useMemo(() => {
    return (
      <PickerItemsList
        testID={`${testID}.modal`}
        items={items}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={_onSearchChange}
        renderCustomSearch={renderCustomSearch}
        listProps={listProps}
        layout={layout}
        headerProps={{
          ...headerProps,
          layout,
          onClose: cancelSelect,
          onDone: mode === PickerModes.MULTI ? () => onDoneSelecting(multiDraftValue) : undefined,
        }}

      >
        {filteredChildren}
      </PickerItemsList>
    )
  }, [
    testID,
    mode,
    selectedItemPosition,
    cancelSelect,
    onDoneSelecting,
    multiDraftValue,
    showSearch,
    searchStyle,
    searchPlaceholder,
    _onSearchChange,
    renderCustomSearch,
    listProps,
    filteredChildren,
    useSafeArea,
    useWheelPicker,
    items,
    layout,
  ])

  return (
    <PickerContext.Provider value={contextValue}>
      <ExpandableOverlay
        ref={pickerExpandable}
        modalProps={{
          style: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
          },
          ...modalProps,
        }}
        expandableContent={expandableModalContent}
        onPress={onPress}
        disabled={disabled}
        childrenPointEvents={'auto'}
        activeOpacity={1}
      >
        {renderPickerInnerInput()}
      </ExpandableOverlay>
    </PickerContext.Provider>
  )
}) as React.ForwardRefExoticComponent<PickerProps> & PickerStatics
Picker.Item = PickerItem
Picker.modes = PickerModes
Picker.fieldTypes = PickerFieldTypes
Picker.extractPickerItems = extractPickerItems
Picker.layouts = PickerLayouts
Picker.displayName = 'Picker'

const MemoPick = React.memo(Picker) as  React.MemoExoticComponent<React.ForwardRefExoticComponent<PickerProps> & PickerStatics> & PickerStatics
MemoPick.Item = PickerItem
MemoPick.modes = PickerModes
MemoPick.fieldTypes = PickerFieldTypes
MemoPick.extractPickerItems = extractPickerItems
MemoPick.layouts = PickerLayouts
MemoPick.displayName = 'Picker'

export default MemoPick
