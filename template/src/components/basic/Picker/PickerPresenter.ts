import _ from 'lodash'
import React from 'react'

import { PickerProps, PickerSingleValue, PickerValue } from './types'

export const extractPickerItems = (props: PickerProps) => {
  const { children } = props
  const items = React.Children.map(children, child => ({
    // @ts-expect-error handle use PickerItemProps once exist
    value: child?.props.value,
    // @ts-expect-error handle use PickerItemProps once exist
    label: child?.props.label,
  }))

  return items ?? []
}

export const isItemSelected = (childValue: PickerSingleValue, selectedValue?: PickerValue) => {
  let isSelected = false

  if (Array.isArray(selectedValue)) {
    isSelected = !!_.find(selectedValue, v => {
      // @ts-expect-error TODO: fix after removing migrate prop completely
      return v === childValue || (typeof v === 'object' && v?.value === childValue)
    })
  } else {
    isSelected = childValue === selectedValue
  }

  return isSelected
}

// export function getItemValue(props) {
//   if (_.isArray(props.value)) {
//     return props.getItemValue ? _.map(props.value, item => props.getItemValue(item)) : _.map(props.value, 'value');
//   } else if (!_.isObject(props.value)) {
//     return props.value;
//   }
//   return _.invoke(props, 'getItemValue', props.value) || _.get(props.value, 'value');
// }

export const getItemLabel = (label: string, value: PickerValue, getLabel: PickerProps['getLabel']) => {
  if (_.isObject(value)) {
    if (getLabel) {
      return getLabel(value)
    }

    return _.get(value, 'label')
  }

  return label
}

export const shouldFilterOut = (searchValue: string, itemLabel?: string) => !_.includes(_.lowerCase(itemLabel), _.lowerCase(searchValue))
