import React, { FunctionComponent } from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native'

import { PressableOpacity } from '@/components/basic'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

import IconX from '../Icons'


interface IBackButtonProps {
  onPress: () => void
  color?: string
}
const BackButton: FunctionComponent<IBackButtonProps> = ({ color, onPress }: IBackButtonProps) => {
  const { Colors, Gutters } = useTheme()
  const { accent, onPrimary } = Colors

  return (
    <PressableOpacity
      onPress={onPress}
      style={[]}
    >
      <IconX
        origin={IconX.MATERIAL_DESIGN_ICONS}
        name={'arrow-back-ios'}
        color={color ? color : onPrimary}
        size={32}
      />
    </PressableOpacity>
  )
}
export default BackButton
