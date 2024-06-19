import _, { isArray } from 'lodash'
import { RefObject, useCallback, useEffect, useState } from 'react'

import { PickerModes, PickerMultiValue, PickerProps, PickerSingleValue, PickerValue } from '../types'

type UsePickerSelectionProps
  = Pick<PickerProps, 'value' | 'onChange' | 'mode'> & {
    pickerExpandableRef: RefObject<any>
    setSearchValue: (searchValue: string) => void
  }

const usePickerSelection = (props: UsePickerSelectionProps) => {
  const { mode, onChange, pickerExpandableRef, setSearchValue, value } = props
  const [multiDraftValue, setMultiDraftValue] = useState(value as PickerMultiValue)
  const [multiFinalValue, setMultiFinalValue] = useState(value as PickerMultiValue)

  useEffect(() => {
    if (mode === PickerModes.MULTI && multiFinalValue !== value) {
      setMultiDraftValue(value as PickerMultiValue)
      setMultiFinalValue(value as PickerMultiValue)
    }
  }, [value])

  const onDoneSelecting = useCallback((item: PickerValue) => {
    setSearchValue('')
    setMultiFinalValue(item as PickerMultiValue)
    pickerExpandableRef.current?.closeExpandable?.()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange?.(item)
  },
  [onChange])

  const toggleItemSelection = useCallback((item: PickerSingleValue) => {
    const itemAsArray = [item]
    const newValue = _.xor(multiDraftValue, itemAsArray)

    setMultiDraftValue(newValue)
  },
  [multiDraftValue])

  const cancelSelect = useCallback(() => {
    setSearchValue('')
    setMultiDraftValue(multiFinalValue)
    pickerExpandableRef.current?.closeExpandable?.()
    // topBarProps?.onCancel?.()
  }, [multiFinalValue])

  return {
    multiDraftValue,
    onDoneSelecting,
    toggleItemSelection,
    cancelSelect,
  }
}

export default usePickerSelection
