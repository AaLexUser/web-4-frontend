import { configureStore } from '@reduxjs/toolkit'
import pointSlice from './slices/PointSlice'
import userSlice from './slices/UserSlice'
import errorSlice from './slices/ErrorSlice'
import authSlice from './slices/AuthSlice'
import TestSlice from './slices/TestSlice'

const store = configureStore({
  reducer: {
    error: errorSlice,
    points: pointSlice,
    user: userSlice,
    auth: authSlice,
    test: TestSlice
  },
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch