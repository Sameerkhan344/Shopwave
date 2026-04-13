import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice"
import categoriesReducer from "./features/categories/categoriesSlice"
import productsReducer from "./features/products/productSlice"
import cartReducer from "./features/cart/cartSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer
  },
})