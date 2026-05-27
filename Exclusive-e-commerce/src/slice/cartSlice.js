import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("cartDetails")
    ? JSON.parse(localStorage.getItem("cartDetails"))
    : []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartTotal: (state, action) => {
      const cartIndex = state.value.findIndex((item) => item._id === action.payload._id)
      if (cartIndex >= 0) {
        state.value[cartIndex].cartQun += 1
      } else {
        const { quantity, ...itemWithoutQuantity } = action.payload
        state.value.push({ ...itemWithoutQuantity, cartQun: 1 })
      }
      localStorage.setItem("cartDetails", JSON.stringify(state.value))
    },
    cartQuantity: (state, action) => {
      const cartIndex = state.value.findIndex((item) => item._id === action.payload._id)
      if (cartIndex < 0) return

      if (action.payload.type === "increment") {
        state.value[cartIndex].cartQun += 1
      } else if (action.payload.type === "decrement") {
        if (state.value[cartIndex].cartQun > 1) {
          state.value[cartIndex].cartQun -= 1
        } else {
          // Remove item if quantity reaches 0
          state.value.splice(cartIndex, 1)
        }
      }
      localStorage.setItem("cartDetails", JSON.stringify(state.value))
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload._id)
      localStorage.setItem("cartDetails", JSON.stringify(state.value))
    },
    clearCart: (state) => {
      state.value = []
      localStorage.removeItem("cartDetails")
    }
  },
})

export const { cartTotal, cartQuantity, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
