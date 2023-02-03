import {createSlice, PayloadAction, PrepareAction} from '@reduxjs/toolkit'
export type TestInput= {
  str: string
}
const initialState: TestInput = {
  str: 'as',
}
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers:{
    setTest: (state, action: PayloadAction<TestInput>) => {
      return state = action.payload
    },
    resetTest: (state) => {
      state = initialState
    }
  }

})
export const {setTest, resetTest} = testSlice.actions
export default testSlice.reducer