import { ThemeImages, ThemeVariables } from '@/theme/types'

/**
 *
 * @param Theme can be spread like {Colors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default ({}: ThemeVariables): ThemeImages => {
  return {
    // logo: require('@/Assets/Images/TOM.png'),
  }
}
