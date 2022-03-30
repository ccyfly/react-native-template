import { useContext } from 'react'

import { ThemeContext } from '@/contexts/ThemeContext'

const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error(
      'No ThemeContext.Provider found when calling useTheme.'
    )
  }

  return themeContext
}

export default useTheme
