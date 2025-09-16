/* eslint-disable @typescript-eslint/no-var-requires */
import 'regenerator-runtime/runtime'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore, Middleware, StoreEnhancer } from '@reduxjs/toolkit'
import { Platform } from 'react-native'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import createDebugger from 'redux-flipper'
import {
  createMigrate,
  FLUSH,
  MigrationManifest,
  PAUSE,
  PERSIST,
  PersistedState,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import rootReducer, { blacklist, middlewares } from '@/redux/reducers'

import reactotron from '../../../ReactotronConfig'

const MIGRATION_DEBUG = true
const migrations: MigrationManifest = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  0: (previousVersionState: PersistedState) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return previousVersionState
  },
}
const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage,
  blacklist: [...blacklist],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // transforms: [immutableTransform()],
  migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const debugMiddlewares: Middleware[] = []
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // debugMiddlewares.push(createDebugger() as Middleware)
    }

    return getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        ],
      },
    })
      .concat(middlewares)
      .concat(debugMiddlewares)
  },
  enhancers: getDefaultEnhancers => __DEV__ ? getDefaultEnhancers().concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
})

const persistor = persistStore(store)

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { persistor, store }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
