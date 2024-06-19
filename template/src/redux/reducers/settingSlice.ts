import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { ThemeType } from '@/constants/enum/ThemeType.enum'
import { Locale, ThemeType } from '@/configs/constants/type'

export type SettingState = {
  locale: Locale|undefined
  isNotificationEnabled: boolean
  askedLocationPermission: boolean
  askedLocationPermissionAfterBlocked: boolean
}

const initialState = {
  locale: undefined,
  isNotificationEnabled: false,
  askedLocationPermission: false,
  askedLocationPermissionAfterBlocked: false,
} as SettingState

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      const locale: Locale = action.payload

      return {
        ...state,
        locale: action.payload,
      }
    },
    setAskedLocationPermission: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        askedLocationPermission: action.payload,
      }
    },
    setAskedLocationPermissionAfterBlocked: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        askedLocationPermissionAfterBlocked: action.payload,
      }
    },
  },
})

export const { setAskedLocationPermission, setAskedLocationPermissionAfterBlocked, setLocale } = settingSlice.actions
export default settingSlice.reducer
