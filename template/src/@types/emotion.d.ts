import '@emotion/react'

import {ThemeNavigationColors, ThemeMetricsSizes} from '@/theme/types'

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeNavigationColors;
    size: ThemeMetricsSizes;
  }
}