import moment from 'moment'

import { Locale } from '@/configs/constants/type'

const formatDate = (date: Date, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  const momentDate = moment(date)

  return momentDate.format(format)
}

const parseDate = (dateText?: string, format: string = 'YYYY-MM-DD') => {
  if (dateText === undefined) {
    return undefined
  }
  const momentDate = moment(dateText, format)

  return momentDate.toDate()
}


const convertDateTextObject = (dateText?: string, fromFormat: string = 'YYYY-MM-DD', lang: Locale = Locale.enUS, toEnMonthFormat = 'MMM') => {
  if (dateText === undefined) {
    return undefined
  }
  const momentDate = moment(dateText, fromFormat)
  const monthFormat = lang === Locale.enUS ? toEnMonthFormat : 'M'

  return {
    year: momentDate.format('YYYY'),
    month: momentDate.format(monthFormat),
    day: momentDate.format('D'),
  }
}

export {
  convertDateTextObject,
  formatDate,
  parseDate,
}
