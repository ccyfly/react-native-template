// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CryptoES from 'crypto-es'
import { Dimensions, PixelRatio, Platform } from 'react-native'

import logger from '@/infrastructures/common/logger'

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')
const dimen = Dimensions.get('window')
const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  ((dimen.height === 780 || dimen.width === 780)
    || (dimen.height === 812 || dimen.width === 812)
    || (dimen.height === 844 || dimen.width === 844)
    || (dimen.height === 896 || dimen.width === 896)
    || (dimen.height === 926 || dimen.width === 926))
)

const isIOS = Platform.OS === 'ios'
const { height: windowHeight, width: windowWidth } = dimen
const scale = windowWidth / 428

logger.log('width', { windowWidth, screenWidth })
logger.log('scale', scale)

const _key = CryptoES.enc.Utf8.parse('HSq8IRVejTpF2uhP')
const iv = CryptoES.enc.Utf8.parse('AzaTjyc2m7tKliE9')

const getS = () => {
  const t = new Date().getTime()
  const i = Math.floor(Math.random() * 1000000)
  const m = `noncr=${i}&timestamp=${t}`
  const e = CryptoES.AES.encrypt(m, _key, { iv, mode: CryptoES.mode.CBC, padding: CryptoES.pad.ZeroPadding }).toString()
  // logger.debug('getS', {
  //   iv: i,
  //   t,
  //   m,
  //   e,
  // })

  return {
    noncr: i,
    timestamp: t,
    sign: e,
  }
}

const isSmallDevice = () => {
  return screenWidth <= 390
}

const normalize = (size: number, maxSize?: number, minSize?: number) => {
  let newSize = size * scale
  const _maxSize = maxSize ? maxSize : size * 1.2
  const _minSize = minSize ? minSize : size * 0.8
  if (newSize > _maxSize) {
    newSize = _maxSize
  }
  if (newSize < _minSize) {
    newSize = _minSize
  }

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const cleanUnderscoreProps = (obj: any): any => {
  if (obj) {
    for (const key in obj) {
      if (key.startsWith('_')) {
        delete obj[key]
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any) => {
          cleanUnderscoreProps(item)
        })
      } else if (obj[key] && typeof obj[key] === 'object') {
        cleanUnderscoreProps(obj[key])
      }
    }
  }

  return obj
}


export {
  cleanUnderscoreProps,
  getS,
  isIOS,
  isIphoneX,
  isSmallDevice,
  normalize,
  screenHeight,
  screenWidth,
}

