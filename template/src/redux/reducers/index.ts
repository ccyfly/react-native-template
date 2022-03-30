import { combineReducers } from '@reduxjs/toolkit'

import nonPersist from './nonPersistSlice'
import setting from './settingSlice'
import theme from './themeSlice'


export default combineReducers({
  nonPersist,
  setting,
  theme,
})

export const blacklist = [
  'nonPersist',
  'error',
]

export const middlewares = []
