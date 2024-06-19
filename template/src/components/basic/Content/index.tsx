import React from 'react'
import { View, ViewStyle } from 'react-native'

import useTheme from '@/hooks/useTheme'
import { MetricsSizeKey } from '@/theme/types'
import { MetricsSizes } from '@/theme/Variables'

interface IContentProps {
  children?: React.ReactNode[] | React.ReactNode
  style?: ViewStyle | ViewStyle[]
  hPadding?: MetricsSizeKey|'none'
  tPadding?: MetricsSizeKey|'none'
  vPadding?: MetricsSizeKey|'none'
  direction?: 'row'|'column'
}
const Content: React.FC<IContentProps> = ({
  children,
  direction = 'column',
  hPadding = 'small',
  style,
  tPadding,
  vPadding,
}: IContentProps) => {
  const { Gutters, Layout } = useTheme()
  let topPadding = {}
  switch (tPadding) {
    case 'tiny':
      topPadding = Gutters.tinyTPadding
      break
    case 'small':
      topPadding = Gutters.smallTPadding
      break
    case 'medium':
      topPadding = Gutters.mediumTPadding
      break
    case 'large':
      topPadding = Gutters.largeTPadding
      break
  }
  let verticalPadding = {}
  switch (vPadding) {
    case 'tiny':
      verticalPadding = Gutters.tinyVPadding
      break
    case 'small':
      verticalPadding = Gutters.smallVPadding
      break
    case 'medium':
      verticalPadding = Gutters.mediumVPadding
      break
    case 'large':
      verticalPadding = Gutters.largeVPadding
      break
  }
  let horizontalPadding = {}
  switch (hPadding) {
    case 'tiny':
      horizontalPadding = Gutters.tinyHPadding
      break
    case 'small':
      horizontalPadding = Gutters.smallHPadding
      break
    case 'medium':
      horizontalPadding = Gutters.mediumHPadding
      break
    case 'large':
      horizontalPadding = Gutters.largeHPadding
      break
  }

  return (
    <View
      style={[
        direction === 'column' ? Layout.column : Layout.row,
        Layout.fullWidth,
        horizontalPadding,
        topPadding,
        verticalPadding,
        style ?? {},
      ]}
    >
      {children}
    </View>
  )
}

export default React.memo(Content)
