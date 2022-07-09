import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.username = action.payload.username
      state.token = action.payload.token
    },
    clearUser: (state) => {
      state.name = ''
      state.username = ''
      state.token = ''
    },
  },
})

export const getUser = (state) => state.user

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
