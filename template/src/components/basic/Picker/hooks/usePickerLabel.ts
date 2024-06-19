import _ from 'lodash'
import { useCallback, useMemo } from 'react'

import { PickerProps, PickerValue } from '../types'

type UsePickerLabelProps
  = Pick<
    PickerProps,
    'value' | 'getLabel' | 'placeholder' | 'accessibilityLabel' | 'accessibilityHint'
  > & {
    items: {value: string | number; label: string}[] | null | undefined
  }

const usePickerLabel = (props: UsePickerLabelProps) => {
  const {
    accessibilityHint,
    accessibilityLabel,
    getLabel,
    items,
    placeholder,
    value,
  } = props

  const getLabelsFromArray = useCallback((pickerValue: PickerValue) => {
    const itemsByValue = _.keyBy(items, 'value')

    return _.flow(arr =>
      _.map(arr, item => (_.isPlainObject(item) ? getLabel?.(item) || item?.label : itemsByValue[item]?.label) as string),
    arr => _.join(arr, ', '))(pickerValue)
  },
  [getLabel, items])

  const _getLabel = useCallback((pickerValue: PickerValue) => {
    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(pickerValue))) {
      return getLabel(pickerValue)
    }

    if (_.isArray(pickerValue)) {
      return getLabelsFromArray(pickerValue)
    }

    // TODO: Remove
    // if (typeof value === 'object') {
    //   return value?.label;
    // }

    // otherwise, extract from picker items
    const selectedItem = _.find(items, { value: pickerValue })
    console.log('[Picker] selectedItem', selectedItem)

    return _.get(selectedItem, 'label')
  },
  [getLabelsFromArray])

  const accessibilityInfo = useMemo(() => {
    const label = _getLabel(value)

    return {
      accessibilityLabel:
        accessibilityLabel ?? (label ? `${placeholder || ''}. selected. ${label}` : `Select ${placeholder || ''}`),
      accessibilityHint:
        accessibilityHint ?? (label ? 'Double tap to edit' : `Goes to ${placeholder || ''}. Suggestions will be provided`),
    }
  }, [value, accessibilityLabel, accessibilityHint])

  return {
    getLabelsFromArray,
    getLabel: _getLabel,
    accessibilityInfo,
    label: _getLabel(value),
  }
}

export default usePickerLabel
