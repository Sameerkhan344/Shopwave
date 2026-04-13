import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoriesService from './categoriesService'

//use this function in AddCategory
export const AddCategory = createAsyncThunk("categories/AddCategory", async (formData, thunkAPI) => {
    try {
        const response = await categoriesService.createCat(formData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//use this function in getAllCategories
export const getAllCategories = createAsyncThunk("categories/getAllCategories", async (thunkAPI) => {
    try {
        const response = await categoriesService.getAllCat();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//use this function in getSingleCategories
export const getSingleCategories = createAsyncThunk("categories/getSingleCategories", async (slug, thunkAPI) => {
    try {
        const response = await categoriesService.getSingleCat(slug);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//use this function in updateCategory
export const updateCategories = createAsyncThunk("categories/updateCategories", async ({ name, slug }, thunkAPI) => {
    try {
        const response = await categoriesService.updateCat({ name, slug });
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//use this function in DeleteCategory
export const DeleteCategory = createAsyncThunk("categories/DeleteCategory", async (slug, thunkAPI) => {
    try {
        const response = await categoriesService.deleteCat(slug);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
const initialState = {
    categories: [],
    status: "idle",
    error: null
}
//use this export in the store file as a authReducer
export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //for AddCategory 
            .addCase(AddCategory.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(AddCategory.fulfilled, (state, action) => {
                state.status = "success"
                state.categories = action.payload;
            }).addCase(AddCategory.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for getAllCategory 
            .addCase(getAllCategories.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = "success"
                state.categories = action.payload;
            }).addCase(getAllCategories.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for getSingleCategories 
            .addCase(getSingleCategories.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(getSingleCategories.fulfilled, (state, action) => {
                state.status = "success"
                state.categories = action.payload;
            }).addCase(getSingleCategories.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for updateCategories 
            .addCase(updateCategories.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(updateCategories.fulfilled, (state, action) => {
                state.status = "success"
                state.categories = action.payload;
            }).addCase(updateCategories.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for delete single Category 
            .addCase(DeleteCategory.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(DeleteCategory.fulfilled, (state, action) => {
                state.status = "success"
                state.categories = action.payload;
            }).addCase(DeleteCategory.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })

    }
})


export default categoriesSlice.reducer