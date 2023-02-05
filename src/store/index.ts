import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {pointApi} from './slices/PointApi'
import userSlice from './slices/UserSlice'
import errorSlice from './slices/ErrorSlice'
import authSlice from './slices/AuthSlice'
import { avatarApi } from './slices/AvatarApi'
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  [pointApi.reducerPath]: pointApi.reducer,
  [avatarApi.reducerPath]: avatarApi.reducer,
  error: errorSlice,
  user: userSlice,
  auth: authSlice,
})

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth', `${[pointApi.reducerPath]}`, `${[avatarApi.reducerPath]}`]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pointApi.middleware).concat(avatarApi.middleware),
})

export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch