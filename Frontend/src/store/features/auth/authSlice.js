import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

//use this function in loginPage
export const register = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const response = await authService.registerUser(formData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const response = await authService.loginUser(formData);
    window.localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
//logout user for DashboardLayout 
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const fetUserDataFromLocalStorage = window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null;

const initialState = {
  user: fetUserDataFromLocalStorage,
  status: "idle",
  error: null
}
//use this export in the store file as a authReducer
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //for register 
      .addCase(register.pending, (state) => {
        state.status = "loading"
        state.error = "null"
      }).addCase(register.fulfilled, (state, action) => {
        state.status = "success"
        state.user = action.payload;
      }).addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload;
      })
      //for login 
      .addCase(login.pending, (state) => {
        state.status = "loading"
        state.error = "null"
      }).addCase(login.fulfilled, (state, action) => {
        state.status = "success"
        state.user = action.payload;
      }).addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload;
      })
      //for logout
      .addCase(logout.pending, (state) => {
        state.status = "loading"
        state.error = "null"
      }).addCase(logout.fulfilled, (state) => {
        state.status = "success"
        state.user = null;
      }).addCase(logout.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload;
      })
  }
})



export default authSlice.reducer