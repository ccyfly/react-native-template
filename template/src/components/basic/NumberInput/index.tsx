import React from 'react'
import { Text, View } from 'react-native'

import { Body, Button } from '@/components/basic'
import useTheme from '@/hooks/useTheme'

interface INumberInputProps {
  value: number
  canAdd?: boolean
  canSub?: boolean
  onValueChange?: (newValue: number) => void
}
const NumberInput = (
  { onValueChange = (newValue) => {}, value, canSub = true, canAdd = true }: INumberInputProps
) => {
  const { Colors, Common, Fonts, Gutters, Layout } = useTheme()
  // const [count, setCount] = React.useState(value)
  const add = () => {
    // setCount(count + 1)
    onValueChange(value + 1)
  }
  const reduce = () => {
    // setCount(count - 1 )
    // if (count < 1) {
    //   setCount(0)
    // } else {
    //   setCount(count - 1)
    // }
    onValueChange(Math.max(value-1, 0))
  }

  // React.useEffect(() => {
  //   setCount(value)
  // }, [value])


  return (
    <View style={[Layout.row, Layout.alignItemsCenter]}>
      <Button
        text="-"
        onPress={reduce}
      />
      <Text>{value}</Text>
      <Button
        text="+"
        disabled={!canAdd}
        onPress={add}
      />
    </View>
  )
}

export default NumberInput
