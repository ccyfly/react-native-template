import React from 'react'
import { ActivityIndicator, ColorValue, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import useTheme from '@/hooks/useTheme'
import { selectLoading } from '@/redux/selectors/nonPersist'

interface ILoadingOverlayProps {
  backgroundColor?: ColorValue
  indicatorColor?: ColorValue
  opacity?: number
  zIndex?: number
  textColor?: ColorValue
  wording?: string
}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({
  backgroundColor = 'rgba(0,0,0,0.5)',
  indicatorColor = 'red',
  opacity = 0.5,
  zIndex = 5,
  textColor = 'black',
  wording = 'Loading',
}: ILoadingOverlayProps) => {
  const loading = useSelector(selectLoading)
  const { Layout, Gutters } = useTheme()

  return (
    loading ? (
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: backgroundColor,
        opacity: opacity,
        zIndex: zIndex,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <View
          style={[
            Gutters.smallPadding,
            {
              backgroundColor: 'rgba(20, 20, 20, 0.9)',
              borderRadius: 8,
              borderWidth: 0,
            },
          ]}
        >
          <ActivityIndicator size={'large'} color={indicatorColor} />
          {/* <Text>{wording}</Text> */}
        </View>
      </View>
    ) : (
      null
    )
  )
}

export default LoadingOverlay
