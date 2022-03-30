import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { ThemeType } from '@/constants/enum/ThemeType.enum'
import { Locale } from '@/configs/constants/type'

export type SettingState = {
  locale: Locale
}

const initialState = {
  locale: Locale.enUS,
} as SettingState

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      return {
        ...state,
        locale: action.payload,
      }
    },
  },
})

export const { setLocale } = settingSlice.actions
export default settingSlice.reducer
