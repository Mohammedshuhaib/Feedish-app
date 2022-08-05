import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'userLogin',
  initialState: { value: { login: false } },
  reducers: {
    setLogin:(state, action) => {
        state.value = action.payload
    },
  },
})

export const { setLogin } = loginSlice.actions

export default loginSlice.reducer
