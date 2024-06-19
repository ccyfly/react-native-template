import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import merge from 'deepmerge'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { adaptNavigationTheme, configureFonts, DefaultTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { Locale } from '@/configs/constants/type'
import { ThemeState } from '@/redux/reducers/themeSlice'
import { selectLocale } from '@/redux/selectors/setting'
import {
  Common,
  DefaultVariables,
  Fonts,
  Gutters,
  Images,
  Layout,
  themes,
} from '@/theme'
import Icons from '@/theme/Icons'
import {
  FontScale,
  MD3Fonts,
  Theme,
  ThemeCommon,
  ThemeFonts,
  ThemeNavigationColors,
  ThemeNavigationFonts,
  ThemeNavigationTheme,
  ThemeNavigationThemeWithOwn,
  ThemeVariables,
} from '@/theme/types'

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const CombinedDefaultTheme = merge(PaperDefaultTheme, LightTheme)
const CombinedDarkTheme = merge(PaperDarkTheme, DarkTheme)

const useBuildTheme = () => {
  const colorScheme = useColorScheme()

  // Get current theme from the store
  const currentTheme = useSelector(
    (state: { theme: ThemeState }) => state.theme.theme || 'default',
  )
  const isDark = useSelector(
    (state: { theme: ThemeState }) => state.theme.darkMode,
  )
  const darkMode = useMemo(() => {
    // use system color scheme if isDark is null
    return isDark === null ? colorScheme === 'dark' : isDark
  }, [colorScheme, isDark])
  const fontScaleType = useSelector(
    (state: { theme: ThemeState }) => state.theme.fontScale,
  )
  const fontScale = FontScale[fontScaleType || 'MEDIUM']

  const createTheme = useCallback(() => {
    // Select the right theme light theme ({} if not exist)
    const { Variables: themeConfigVars = {} as Partial<ThemeVariables>, ...themeConfig } = themes[currentTheme] || {}

    const { Variables: darkThemeConfigVars = {} as Partial<ThemeVariables>, ...darkThemeConfig } = darkMode ? themes[`${currentTheme}_dark`] || {} : {}

    const themeVariables: ThemeVariables = mergeVariables(
      DefaultVariables as ThemeVariables,
      themeConfigVars,
      darkThemeConfigVars,
    )
    // const defaultNavTheme = darkMode ? Object.assign(DarkTheme, PaperDarkTheme) : Object.assign(DefaultTheme, PaperDefaultTheme)
    const defaultNavTheme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme

    // Build the default theme
    const baseTheme: Theme = {
      Fonts: Fonts(themeVariables, fontScale),
      Icons: Icons(themeVariables),
      Gutters: Gutters(themeVariables),
      Images: Images(themeVariables),
      Layout: Layout(themeVariables),
      Common: Common({
        ...themeVariables,
        Layout: Layout(themeVariables),
        Gutters: Gutters(themeVariables),
        Fonts: Fonts(themeVariables, fontScale),
        Images: Images(themeVariables),
      }),
      ...themeVariables,
      FontSize: themeVariables.ScaledFontSize[fontScale],
      darkMode: !!darkMode,
      Param: themeVariables.Param,
      NavigationTheme: defaultNavTheme,
    }

    // Merge and return the current Theme
    return buildTheme(
      !!darkMode,
      baseTheme,
      formatTheme(themeVariables, themeConfig || {}),
      formatTheme(themeVariables, darkThemeConfig || {}),
    )
  }, [currentTheme, darkMode, fontScale])

  return createTheme()
}

export default useBuildTheme

const formatTheme = (
  variables: ThemeVariables,
  theme: Partial<Theme>,
): Partial<Theme> => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {

    return {
      ...acc,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [name]: (generate)(variables),
    }
  }, {})
}

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 *
 * @param variables : {MetricsSizes?: {small: number, large: number, tiny: number, regular: number}, NavigationColors?: {primary: string}, FontSize?: {small: number, large: number, regular: number}, Colors?: {white: string, success: string, text: string, error: string, transparent: string, primary: string}} variables from @Theme/Variables
 * @param themeConfig : currentTheme form @Theme/themes
 * @param darkThemeConfig : currentDarkTheme from @Theme/themes
 * @return {{}|{[p: string]: *}}
 */
const mergeVariables = (
  variables: ThemeVariables,
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>,
): ThemeVariables =>
  Object.entries(variables).reduce((acc, [group, vars]) => {
    return {
      ...acc,
      [group]: {
        ...vars,
        ...((themeConfig as any)[group] || {}),
        ...((darkThemeConfig as any)[group] || {}),
      },
    }
  }, {} as ThemeVariables)

/**
 * Provide all the theme exposed with useTheme()
 *
 * @param darkMode : boolean
 * @param baseTheme
 * @param themeConfig
 * @param darkThemeConfig
 * @return {{[p: string]: *, NavigationTheme: {colors}, darkMode: *}}
 */
const buildTheme = (
  darkMode: boolean,
  baseTheme: Theme,
  themeConfig: Partial<Theme>,
  darkThemeConfig: Partial<Theme>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? Object.assign(NavigationDarkTheme, PaperDarkTheme) : Object.assign(NavigationDefaultTheme, PaperDefaultTheme),
      baseTheme.Colors,
      baseTheme.Fonts as any,
      baseTheme.Param.roundness,
    ),
  }
}


/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 *
 * @param baseTheme
 * @param theme
 * @param darkTheme
 * @return {{[p: string]: *}}
 */
const mergeTheme = (
  baseTheme: Theme,
  theme: Partial<Theme>,
  darkTheme: Partial<Theme>,
): Theme =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...value,
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    {} as Theme,
  )

const mergeNavigationTheme = (
  reactNavigationTheme: ThemeNavigationTheme,
  overrideColors: ThemeNavigationColors,
  overrideFonts: ThemeNavigationFonts,
  roundness: number,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
): ThemeNavigationThemeWithOwn => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
  fonts: {
    ...reactNavigationTheme.fonts,
    ...configureFonts({
      config: {
        ...overrideFonts,
      },
    }),
    ...overrideFonts,
  },
  roundness: roundness,
})
