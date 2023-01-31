import {createSlice} from '@reduxjs/toolkit'
import {User} from '../../entities/User'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: undefined
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    resetUser: (state) => {
      state.value = undefined
    }
  }
})

export const selectUser = state => state.user.value

export const {setUser, resetUser} = userSlice.actions

export default userSlice.reducer