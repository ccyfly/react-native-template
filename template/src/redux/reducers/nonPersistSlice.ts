import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NonPersistState = {
  initiated: boolean
  loading: boolean
  loadingCount: number
}

const initialState = {
  initiated: false,
  loading: false,
  loadingCount: 0,
} as NonPersistState

export const nonPersistSlice = createSlice({
  name: 'nonPersist',
  initialState,
  reducers: {
    showLoading: (state) => {
      return {
        ...state,
        loadingCount: state.loadingCount + 1,
        loading: true,
      }
    },
    hideLoading: (state) => {
      const newLoadingCount = state.loadingCount - 1 > -1 ? state.loadingCount - 1 : 0

      return {
        ...state,
        loadingCount: newLoadingCount,
        loading: newLoadingCount > 0,
      }
    },
    hideAllLoading: (state) => {
      return {
        ...state,
        loadingCount: 0,
        loading: false,
      }
    },
    setInitiated: (state, action: PayloadAction<boolean>) => {
      state.initiated = action.payload
    },
  },
})

export const {
  showLoading, hideLoading, hideAllLoading, setInitiated,
} = nonPersistSlice.actions
export default nonPersistSlice.reducer
