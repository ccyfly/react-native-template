import { createSelector } from '@reduxjs/toolkit'

import { AppState } from '@/redux/reducers/appSlice'

import { RootState } from '../store'

export const selectState = (state: RootState): AppState => state.app

export const selectSelectedMarketId = createSelector(selectState, (state) => state.selectedMarketId)
