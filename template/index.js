/**
 * @format
 */
if (__DEV__) {
  require('./ReactotronConfig')
}
import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'
import App from './src'

AppRegistry.registerComponent(appName, () => App)
