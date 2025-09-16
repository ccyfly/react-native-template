import Reactotron, { asyncStorage, networking, trackGlobalErrors, trackGlobalLogs } from 'reactotron-react-native'
import ReactotronReactNative from 'reactotron-react-native/src/reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'


const reactotron =
  Reactotron
    .configure() // controls connection & communication settings
    .use(asyncStorage())
    .use(networking())
    .use(reactotronRedux())
    .use(trackGlobalErrors())
    .use(trackGlobalLogs())
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!

export default reactotron
