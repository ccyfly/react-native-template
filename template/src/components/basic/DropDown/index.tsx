import React, {
  forwardRef,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  Keyboard,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  ScrollView,
  TextInputFocusEventData,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import {
  Checkbox,
  Divider,
  HelperText,
  MD3Theme as Theme,
  Menu,
  TextInput,
  TextInputProps,
  TouchableRipple,
  useTheme as usePaperTheme,
} from 'react-native-paper'
import { Icon } from 'react-native-vector-icons/Icon'

import { PressableOpacity } from '@/components/basic'
import MaterialTextInput, { MaterialTextInputProps, TextInputHandles } from '@/components/basic/MaterialTextInput'
import useTheme from '@/hooks/useTheme'
import { ThemeNavigationTheme, ThemeNavigationThemeWithOwn } from '@/theme/types'
// import { MD3Theme } from 'react-native-paper/src/types'
// import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
// import { Theme } from 'react-native-paper/lib/typescript/types'

type Without<T, K> = Pick<T, Exclude<keyof T, K>>

export interface IDropDownOption {
  label: string
  value: string | number
  custom?: ReactNode
}
export interface IDropDownProps {
  visible: boolean
  multiSelect?: boolean
  onDismiss: () => void
  showDropDown: () => void
  value: any
  setValue: (_value: any) => void
  label?: string | undefined
  placeholder?: string | undefined
  mode?: 'outlined' | 'flat' | undefined
  inputProps?: TextInputPropsWithoutTheme
  list: IDropDownOption[]
  dropDownContainerMaxHeight?: number
  dropDownContainerHeight?: number
  activeColor?: string
  theme?: ThemeNavigationThemeWithOwn
  dropDownStyle?: ViewStyle
  dropDownItemSelectedTextStyle?: TextStyle
  dropDownItemSelectedStyle?: ViewStyle
  dropDownItemStyle?: ViewStyle
  dropDownItemTextStyle?: TextStyle
  accessibilityLabel?: string
  errorText?: string
  selectionTextStyle?: TextStyle
  onBlur?:| ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
}

type TextInputPropsWithoutTheme = Without<MaterialTextInputProps, 'theme'>

const DropDown = forwardRef<TextInputHandles, IDropDownProps>(
  (props, ref) => {
    const activeTheme = usePaperTheme<ThemeNavigationThemeWithOwn>()
    const { Common, NavigationTheme } = useTheme()
    const {
      accessibilityLabel,
      activeColor,
      dropDownContainerHeight,
      dropDownContainerMaxHeight,
      dropDownItemSelectedStyle,
      dropDownItemSelectedTextStyle,
      dropDownItemStyle,
      dropDownItemTextStyle,
      dropDownStyle,
      inputProps,
      label,
      list,
      mode,
      multiSelect = false,
      onDismiss,
      placeholder,
      selectionTextStyle,
      setValue,
      showDropDown,
      theme,
      value,
      visible,
    } = props
    const {
      disableErrorText,
      errorColor,
      errorText,
      errorTextStyle,
      hintText,
      hintTextStyle,
      ...restInputProps
    } = inputProps || {}
    const [displayValue, setDisplayValue] = useState('')
    const [inputLayout, setInputLayout] = useState({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    })
    const { Colors, Fonts } = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = React.useRef<TextInputHandles>(null)

    const onLayout = (event: LayoutChangeEvent) => {
      setInputLayout(event.nativeEvent.layout)
    }

    useImperativeHandle(ref, () => ({
      focus: () => {
        // onPress()
      },
      clear: () => {},
      isFocused: () => false,
      setNativeProps: (arg: any) => {},
      blur: () => {},
      forceFocus: () => {
        // onPress()
      },
    }))

    useEffect(() => {
      if (multiSelect) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const _labels = list
          .filter((_) => value.indexOf(_.value) !== -1)
          .map((_) => _.label)
          .join(', ')
        setDisplayValue(_labels)
      } else {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const _label = list.find((_) => _.value === value)?.label
        if (_label) {
          setDisplayValue(_label)
        }
      }
    }, [list, value])

    const isActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          return value.indexOf(currentValue) !== -1
        } else {
          return value === currentValue
        }
      },
      [value]
    )

    const setActive = useCallback(
      (currentValue: any) => {
        if (multiSelect) {
          const valueIndex = value.indexOf(currentValue)
          const values = value.split(',')
          if (valueIndex === -1) {
            setValue([...values, currentValue].join(','))
          } else {
            setValue(
              [...values].filter((_value) => _value !== currentValue).join(',')
            )
          }
        } else {
          setValue(currentValue)
        }
        inputRef.current?.blur()
        setIsFocused(false)
      },
      [value]
    )

    const onPress = useCallback(
      () => {
        setIsFocused(true)
        if (value !== undefined && value !== null && value !== '') {
          inputRef.current?.focus()
        }
        // Keyboard.dismiss()
        showDropDown()
      }
      , [showDropDown, visible, value])

    const _onDismiss = () => {
      setIsFocused(false)
      inputRef.current?.blur()
      onDismiss()
    }

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

    const inputLineColor = useMemo(() => {
      if (isFocused) {
        return activeColor || activeTheme.colors.primary
      }

      return activeTheme.colors.onSurface
    }, [isFocused])

    return (
      <Menu
        visible={visible}
        onDismiss={_onDismiss}
        // theme={NavigationTheme}
        contentStyle={{ backgroundColor: Colors.background }}
        anchor={
          <>
            <PressableOpacity
              onPress={onPress}
              onLayout={onLayout}
              accessibilityLabel={accessibilityLabel}
            >
              <View pointerEvents={'none'}>
                <MaterialTextInput
                  ref={inputRef}
                  value={displayValue}
                  mode={mode}
                  label={label}
                  placeholder={placeholder}
                  pointerEvents={'none'}
                  // theme={NavigationTheme}
                  // right={
                  //   <TextInput.Icon icon={visible ? 'menu-up' : 'menu-down'}/>
                  // }
                  disableErrorText
                  showSoftInputOnFocus={false}
                  caretHidden
                  underlineColor={inputLineColor}
                  activeUnderlineColor={inputLineColor}
                  // underlineStyle={{ backgroundColor: inputLineColor, borderWidth: (isFocused ? 2 : 1)  }}
                  outlineColor={inputLineColor}
                  outlineStyle={{ borderWidth: isFocused ? 2 : 1 }}
                  {...restInputProps}
                  contentStyle={{ paddingRight: 10 }}
                />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TextInput.Icon icon={visible ? 'menu-up' : 'menu-down'}/>
                  </View>
                </View>
              </View>
            </PressableOpacity>
            {/* {renderHelperText()} */}
          </>
        }
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
          ...dropDownStyle,
        }}
      >
        <ScrollView
          bounces={false}
          style={{
            ...(dropDownContainerHeight
              ? { height: dropDownContainerHeight }
              : { maxHeight: dropDownContainerMaxHeight || 350 }),
          }}
        >
          {list.map((_item, _index) => (
            <Fragment key={_item.value}>
              <TouchableRipple
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setActive(_item.value)
                  if (onDismiss) {
                    onDismiss()
                  }
                }}
              >
                <Fragment>
                  <Menu.Item
                    titleStyle={{
                      color: isActive(_item.value)
                        ? activeColor || activeTheme.colors.primary
                        : (theme || activeTheme).colors.text,
                      ...(isActive(_item.value) ? dropDownItemSelectedTextStyle : dropDownItemTextStyle),
                      ...Fonts.body,
                    }}
                    title={_item.custom || _item.label}
                    style={{
                      flex: 1,
                      maxWidth: inputLayout?.width,
                      backgroundColor: Colors.background,
                      ...(isActive(_item.value)
                        ? dropDownItemSelectedStyle
                        : dropDownItemStyle),
                    }}
                  />
                  {multiSelect && (
                    <Checkbox.Android
                      theme={{ colors: { accent: activeTheme?.colors.primary } }}
                      status={isActive(_item.value) ? 'checked' : 'unchecked'}
                      onPress={() => setActive(_item.value)}
                    />
                  )}
                </Fragment>
              </TouchableRipple>
              <Divider />
            </Fragment>
          ))}
        </ScrollView>
      </Menu>
    )
  }
)
DropDown.displayName = 'DropDown'

export default DropDown
