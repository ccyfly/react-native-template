import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'

import { getItemLabel as getItemLabelPresenter, shouldFilterOut } from '../PickerPresenter'
import { PickerProps } from '../types'

type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'getLabel'>

const usePickerSearch = (props: UsePickerSearchProps) => {
  const { children, getLabel, onSearchChange, showSearch } = props
  const [searchValue, setSearchValue] = useState('')

  const _onSearchChange = useCallback((newSearchValue: string) => {
    setSearchValue(newSearchValue)
    onSearchChange?.(newSearchValue)
  },
  [onSearchChange])

  const filteredChildren = useMemo(() => {
    if (showSearch && !_.isEmpty(searchValue)) {
      // @ts-expect-error need to fix children type
      return _.filter(children, child => {
        // @ts-expect-error need to fix children type to be based on PickerItemProps
        const { getItemLabel: childGetItemLabel, label, value } = child.props
        const itemLabel = getItemLabelPresenter(label, value, childGetItemLabel || getLabel)

        return !shouldFilterOut(searchValue, itemLabel)
      })
    }

    return children
  }, [showSearch, searchValue, children])

  return { setSearchValue, onSearchChange: _onSearchChange, filteredChildren }
}

export default usePickerSearch
