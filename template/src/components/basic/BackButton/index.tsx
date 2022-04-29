import React, { FunctionComponent } from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native'

import useTheme from '@/hooks/useTheme'
import { Theme } from '@/theme/types'

import IconX from '../Icons'

interface IBackButtonProps {
  onPress: () => void
}
const BackButton: FunctionComponent<IBackButtonProps> = ({ onPress }: IBackButtonProps) => {
  const myOwnTheme: Theme = useTheme()
  const { Colors, Gutters } = myOwnTheme
  // console.log('colors', colors);
  const { accent, onPrimary } = Colors

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <IconX
        origin={IconX.MATERIAL_ICONS}
        name={'arrow-back-ios'}
        color={onPrimary} size={24}
      />
    </TouchableOpacity>
  )
}
export default BackButton
