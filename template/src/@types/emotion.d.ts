import '@emotion/react'

import {ThemeNavigationColors, ThemeMetricsSizes, ThemeParam} from '@/theme/types'

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeNavigationColors;
    size: ThemeMetricsSizes;
    param: ThemeParam;
    roundness: number;
  }
}
