import { createSlice } from '@reduxjs/toolkit'

export const PointSlice = createSlice({
  name: 'points',
  initialState: {
    value: [],
  },
  reducers: {
    addPoint: (state, action) => {
      state.value.push(action.payload)
    },
    removeAllPoints: (state) => {
      state.value = []
    },
  },
})

//selector function
export const selectPoints = state => state.points.value

// Action creators are generated for each case reducer function
export const {addPoint, removeAllPoints } = PointSlice.actions

export default PointSlice.reducer
