import { createSelector, Selector } from 'reselect'

import { SettingState } from '@/redux/reducers/settingSlice'
import { ThemeState } from '@/redux/reducers/themeSlice'

import { RootState } from '../store'

export const selectState = (state: RootState): ThemeState => state.theme

export const selectFontScale = createSelector(
  selectState,
  (state: ThemeState) => state.fontScale
)
