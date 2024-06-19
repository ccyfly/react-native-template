import Reactotron, { asyncStorage, networking, trackGlobalErrors, trackGlobalLogs } from 'reactotron-react-native'
import ReactotronReactNative from 'reactotron-react-native/src/reactotron-react-native'
import mmkvPlugin from 'reactotron-react-native-mmkv'
import { reactotronRedux } from 'reactotron-redux'

import { storage } from '@/infrastructures/Storage/MMKVStorage'

const reactotron =
Reactotron
  .configure() // controls connection & communication settings
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(trackGlobalLogs())
  // .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

export default reactotron
