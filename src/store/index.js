import { configureStore } from '@reduxjs/toolkit'
import pointSlice from './slices/PointSlice.js'
import tokenSlice from './slices/TokenSlice.js'
import userSlice from './slices/UserSlice'

export default configureStore({
  reducer: {
    token: tokenSlice,
    points: pointSlice,
    user: userSlice
  },
})