import { createSelector } from '@reduxjs/toolkit'

import { SettingState } from '@/redux/reducers/settingSlice'

import { RootState } from '../store'

export const selectState = (state: RootState): SettingState => state.setting

export const selectLocale = createSelector(
  selectState,
  (state: SettingState) => state.locale
)

export const selectApiLocale = createSelector(
  selectState,
  (state: SettingState) => {
    return state.locale?.replace('_', '-')
  }
)

export const selectAskedLocationPermission = createSelector(
  selectState,
  (state: SettingState) => state.askedLocationPermission
)

export const selectAskedLocationPermissionAfterBlocked = createSelector(
  selectState,
  (state: SettingState) => state.askedLocationPermissionAfterBlocked
)
