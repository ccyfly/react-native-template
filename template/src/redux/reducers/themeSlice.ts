import { createSlice } from '@reduxjs/toolkit'

import { FontScale } from '@/theme/types'

type FontScaleType = keyof typeof FontScale
export type ThemeState = {
  theme: 'default' | null | undefined
  darkMode: boolean | null | undefined
  fontScale: FontScaleType | null | undefined
}

type ThemePayload = {
  payload: {
    theme?: 'default' | null | undefined
    darkMode?: boolean | null | undefined
    fontScale?: FontScaleType | null | undefined
  }
}

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: null,
    darkMode: null,
    fontScale: FontScale.MEDIUM,
  } as ThemeState,
  reducers: {
    changeTheme: (state, { payload: { darkMode, fontScale, theme } }: ThemePayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode
      }
      if (typeof fontScale !== 'undefined') {
        state.fontScale = fontScale
      }
    },
    setDefaultTheme: (
        state,
        { payload: { darkMode, fontScale, theme } }: ThemePayload,
    ) => {
      if (!state.theme) {
        state.theme = theme
        state.darkMode = darkMode
        state.fontScale = fontScale
      }
    },
  },
})

export const { changeTheme, setDefaultTheme } = slice.actions

export default slice.reducer
