import { PropsWithChildren, ReactNode } from 'react'
import { FlatListProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ModalProps } from 'react-native-modal'
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon'

import { MaterialTextInputProps } from '@/components/basic/MaterialTextInput'

import { ExpandableOverlayMethods } from '../ExpandableOverlay'

type Without<T, K> = Pick<T, Exclude<keyof T, K>>

export enum PickerModes {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI'
}
export enum PickerFieldTypes {
  form = 'form',
  filter = 'filter',
  settings = 'settings'
}
export enum PickerLayouts {
  full = 'full',
  bottomSheet = 'bottomSheet'
}
export type PickerSingleValue = string | number
export type PickerMultiValue = PickerSingleValue[]
export type PickerValue = PickerSingleValue | PickerMultiValue | undefined
export type PickerSearchStyle = {
  icon?: number
  color?: string
  placeholderTextColor?: string
  selectionColor?: string
}

type RenderPickerOverloads<ValueType> = ValueType extends PickerValue
  ? (value?: ValueType, label?: string) => React.ReactElement
  : never
type RenderPicker = RenderPickerOverloads<PickerValue>
export type PickerOptionItem = {
  value: PickerSingleValue
  label: string
}
export type PickerHeaderProps = Pick<PickerBaseProps, 'layout'> & {
  title?: string
  titleStyle?: StyleProp<TextStyle>
  onClose?: () => void
  closeLabel?: string
  closeLabelStyle?: StyleProp<TextStyle>
  closeIcon?: IconSource
  onDone?: () => void
  doneLabel?: string
  doneLabelStyle?: StyleProp<TextStyle>
  doneIcon?: IconSource
  backgroundColor?: string
}
export type TextInputPropsWithoutTheme = Without<MaterialTextInputProps, 'theme'>
export type PickerBaseProps = {
  /**
   * Picker Layout
   */
  layout?: PickerLayouts
  fieldType?: PickerFieldTypes
  /**
   * Picker current value in the shape of {value: ..., label: ...}, for custom shape use 'getItemValue' prop
   */
  value?: PickerValue
  /**
   * Callback for when picker value change
   */
  onChange?: (value: PickerValue) => void
  /**
   * SINGLE mode or MULTI mode
   */
  mode?: PickerModes
  /**
   * Picker title
   */
  title?: string
  /**
   * Limit the number of selected items
   */
  selectionLimit?: number
  placeholder?: string
  renderPicker?: RenderPicker

  inputProps?: TextInputPropsWithoutTheme
  renderItem?: (
    value: PickerValue,
    itemProps: PickerItemProps & {isSelected: boolean; isItemDisabled: boolean},
    label?: string
  ) => React.ReactElement
  /**
   * Add onPress callback for when pressing the picker
   */
  onPress?: () => void
  /**
   * A function that returns the label to show for the selected Picker value
   */
  getLabel?: (value: PickerValue) => string
  /**
   * Show search input to filter picker items by label
   */
  showSearch?: boolean
  /**
   * Style object for the search input (only when passing showSearch)
   */
  searchStyle?: PickerSearchStyle
  /**
   * Placeholder text for the search input (only when passing showSearch)
   */
  searchPlaceholder?: string
  /**
   * callback for picker modal search input text change (only when passing showSearch)
   */
  onSearchChange?: (searchValue: string) => void
  /**
   * Render custom search input (only when passing showSearch)
   */
  renderCustomSearch?: (props: PickerItemsListProps) => React.ReactElement
  // /**
  //  * @deprecated pass useWheelPicker prop instead
  //  * Allow to use the native picker solution (different style for iOS and Android)
  //  */
  // useNativePicker?: boolean;
  /**
   * Use wheel picker instead of a list picker
   */
  useWheelPicker?: boolean
  /**
   * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
   */
  listProps?: Partial<FlatListProps<any>>
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Callback for modal onShow event
   */
  onShow?: () => void
  /**
   * Add safe area in the Picker modal view
   */
  useSafeArea?: boolean
  /**
   * Component test id
   */
  testID?: string
  // children?: ReactNode | undefined
  accessibilityLabel?: string
  accessibilityHint?: string
  modalProps?: Partial<ModalProps>
  disabled?: boolean
  headerProps?: Partial<PickerHeaderProps>
}
export type PickerPropsWithSingle = Omit<PickerBaseProps, 'onChange'> & {
  mode?: PickerModes.SINGLE
  value?: PickerSingleValue
  onChange?: (value: PickerSingleValue) => void
}

export type PickerPropsWithMulti = Omit<PickerBaseProps, 'onChange'> & {
  mode?: PickerModes.MULTI
  value?: PickerMultiValue
  onChange?: (value: PickerMultiValue) => void
}

export type PickerProps = PropsWithChildren<PickerPropsWithSingle | PickerPropsWithMulti>
export type PickerItemProps = {
  /**
   * Item's value
   */
  value: PickerSingleValue
  /**
   * Item's label
   */
  label: string
  /**
   * Item's label style
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Custom function for the item label (e.g (value) => customLabel)
   */
  getItemLabel?: PickerProps['getLabel']
  /**
   * @deprecated Function to return the value out of the item value prop when value is custom shaped.
   */
  // getItemValue?: PickerProps['getItemValue']
  /**
   * Render custom item
   */
  renderItem?: PickerProps['renderItem']
  /**
   * Pass to change the selected icon
   */
  selectedIcon?: IconSource
  /**
   * Pass to change the selected icon color
   */
  selectedIconColor?: string
  /**
   * Is the item disabled
   */
  disabled?: boolean
  /**
   * Callback for onPress action
   */
  onPress?: () => void
  /**
   * Component test id
   */
  testID?: string
}
export type PickerContextProps =
   Pick<PickerProps, 'value'|'renderItem'|'selectionLimit'|'getLabel'> & {
     onPress: (value: PickerSingleValue) => void
     isMultiMode: boolean
     onSelectedLayout: (event: any) => any
     selectionLimit: PickerProps['selectionLimit']
   }

export type PickerItemsListProps = Pick<
  PropsWithChildren<PickerProps>,
  'testID'|'showSearch'|'listProps'|'children'|'searchStyle'|'searchPlaceholder'|'onSearchChange'|'renderCustomSearch'|'headerProps'|'layout'
> & {
  items?: PickerOptionItem[]
}
export type PickerMethods = ExpandableOverlayMethods
