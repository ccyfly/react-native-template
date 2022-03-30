import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import createDebugger from 'redux-flipper'
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
import immutableTransform from 'redux-persist-transform-immutable'
import createSagaMiddleware from 'redux-saga'

// import createSagaMiddleware from 'redux-saga'
import rootReducer, { blacklist, middlewares } from '@/redux/reducers'
import rootSaga from '@/redux/saga'
// import { reduxStorage } from '@/services/Storage/MMKVStorage'

const sagaMiddleware = createSagaMiddleware()

const MIGRATION_DEBUG = true
const migrations: MigrationManifest = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  0: (previousVersionState: PersistedState) => {
    return previousVersionState
  },
}
const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage,
  blacklist: [...blacklist],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  transforms: [immutableTransform()],
  migrate: createMigrate(migrations, {
    debug: MIGRATION_DEBUG,
  }),
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  {
    const debugMiddlewares = []
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      debugMiddlewares.push(createDebugger())
    }

    return getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        ],
      },
    })
      .concat(sagaMiddleware)
      .concat(debugMiddlewares)
      .concat(middlewares)
  },
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { persistor, store }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
