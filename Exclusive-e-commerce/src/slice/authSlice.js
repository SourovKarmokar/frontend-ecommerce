import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("userToken") || null,
  isLoggedIn: !!localStorage.getItem("userToken"),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user))
      localStorage.setItem("userToken", action.payload.token)
    },
    logoutUser: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem("userInfo")
      localStorage.removeItem("userToken")
    },
  },
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
