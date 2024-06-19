import { useSelector } from 'react-redux'

import { FONT_FAMILY } from '@/configs'
import { Locale } from '@/configs/constants/type'
import { selectLocale } from '@/redux/selectors/setting'

const useFontFamily = () => {
  const lang = useSelector(selectLocale)

  return lang === Locale.zhTW ? FONT_FAMILY.CHI : FONT_FAMILY.ENG
}

export default useFontFamily
