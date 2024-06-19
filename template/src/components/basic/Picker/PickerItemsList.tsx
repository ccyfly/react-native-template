import _ from 'lodash'
import React, { useCallback, useContext, useState } from 'react'
import { Animated, FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MaterialTextInput } from '@/components/basic'
import PickerHeader from '@/components/basic/Picker/PickerHeader'
import PickerItem from '@/components/basic/Picker/PickerItem'
import useTheme from '@/hooks/useTheme'
import logger from '@/infrastructures/common/logger'
import { Theme } from '@/theme/types'
import { screenHeight } from '@/utils'

import PickerContext from './PickerContext'
import { PickerItemProps, PickerItemsListProps, PickerLayouts, PickerOptionItem, PickerSingleValue } from './types'

const keyExtractor = (_item: string, index: number) => index.toString()

const PickerItemsList = (props: PickerItemsListProps) => {
  const {
    listProps,
    children,
    items,
    showSearch,
    searchStyle = {},
    searchPlaceholder = 'Search...',
    onSearchChange,
    renderCustomSearch,
    testID,
    layout = PickerLayouts.full,
    headerProps,
  } = props

  const context = useContext(PickerContext)
  const insets = useSafeAreaInsets()
  const { Colors, Gutters, Layout } = useTheme()
  const styles = makeStyles({ Colors }, layout)
  const { style: listStyle, ...restListProps } = listProps || {}

  const renderHeader = () => {
    return <PickerHeader {...headerProps} layout={layout} />
  }
  const renderSearchInput = () => {
    if (showSearch) {
      if (_.isFunction(renderCustomSearch)) {
        return renderCustomSearch(props)
      }

      return (
        <View style={styles.searchInputContainer}>

        </View>
      )
    }
  }

  const renderItem = useCallback(({ index, item }: ListRenderItemInfo<PickerItemProps>) => {
    const child = React.Children.toArray(children)[index]

    return child
  }, [children])

  const renderList = () => {
    return (
      <FlatList
        data={items}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...restListProps}
        style={[
          {
            backgroundColor: Colors.background,
            paddingBottom: insets.bottom,
          },
          styles.listStyle,
          listStyle ? listStyle : {},
        ]}
      />
    )
  }

  return (
    <View style={[styles.content]}>
      <>
        {renderHeader()}
        {renderSearchInput()}
        {renderList()}
      </>
    </View>
  )
}
const makeStyles = ({ Colors }: Pick<Theme, 'Colors'>, layout: PickerLayouts) => {
  let _temp = {}
  const maxHeight = Math.max(screenHeight * 0.5, 420)
  if (layout === PickerLayouts.full) {
    _temp = {
      flex: 1,
    }
  } else {
    _temp = {
      maxHeight: maxHeight,
      height: maxHeight,
    }
  }

  return StyleSheet.create({
    content: {
      ..._temp,
    },
    modalBody: {},
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors.border,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      height: 60,
      paddingRight: 16,
      flex: 1,
    },
    listStyle: {
      flex: 1,
    },
  })
}

export default PickerItemsList
