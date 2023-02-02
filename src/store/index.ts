import { configureStore } from '@reduxjs/toolkit'
import pointSlice from './slices/PointSlice.js'
import tokenSlice from './slices/TokenSlice.js'
import userSlice from './slices/UserSlice'

const store = configureStore({
  reducer: {
    token: tokenSlice,
    points: pointSlice,
    user: userSlice
  },
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch