import React from 'react'

import { Theme } from '@/theme/types'

export const ThemeContext = React.createContext<Theme|undefined>(undefined)
ThemeContext.displayName = 'ThemeContext'
