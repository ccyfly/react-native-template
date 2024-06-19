import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import logger from '@/infrastructures/common/logger'

export type AppState = {
  selectedMarketId: string|undefined
}

const initialState = { selectedMarketId: undefined } as AppState
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedMarket: (state, action: PayloadAction<{ marketId: string}>) => {
      logger.log('appSlice: setSelectedMarket: action.payload.marketId', action.payload.marketId)

      return {
        ...state,
        selectedMarketId: action.payload.marketId,
      }
    },
  },
})

export const { setSelectedMarket } = appSlice.actions
export default appSlice.reducer
