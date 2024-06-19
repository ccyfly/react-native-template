/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ImageRequireSource, ImageSourcePropType } from 'react-native'

const _images = {
  cloud: require('./images/143.png') as ImageRequireSource,
}

type ImagesType = typeof _images
export type IImage = { [P in keyof ImagesType]: ImageRequireSource }

export const images: IImage = _images as IImage
