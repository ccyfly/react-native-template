import { combineReducers, Middleware } from '@reduxjs/toolkit'

import app from './appSlice'
import nonPersist from './nonPersistSlice'
import setting from './settingSlice'
import theme from './themeSlice'

export default combineReducers({
  nonPersist,
  setting,
  theme,
  app,
})

export const blacklist = [
  'appInit',
  'error',
  'nonPersist',
]

export const middlewares: Middleware[] = []
