import { useCallback, useEffect } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { useSelector } from 'react-redux'

import { hideAllLoading, hideLoading, showLoading } from '@/redux/reducers/nonPersistSlice'
import { selectLoading } from '@/redux/selectors/nonPersist'
import { useAppDispatch } from '@/redux/store'

export default () => {
  const dispatch = useAppDispatch()

  return {
    hideLoading: () => {
      Keyboard.dismiss()
      dispatch(hideLoading())
    },
    showLoading: () => {
      Keyboard.dismiss()
      dispatch(showLoading())
    },
    hideAllLoading: () => {
      Keyboard.dismiss()
      dispatch(hideAllLoading())
    },
  }
}
