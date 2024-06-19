import { customText } from 'react-native-paper'

import { FontType } from '@/theme/Fonts'

type Variant = keyof FontType
const Text = customText<Variant>()

export default Text
