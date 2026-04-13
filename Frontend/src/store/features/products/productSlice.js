import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService';

//use this function in addProduct
export const addProduct = createAsyncThunk("products/addProduct", async (formData, thunkAPI) => {
    try {
        const response = await productService.createProduct(formData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//use this function in getAllProducts
export const getAllProducts = createAsyncThunk("products/getAllProducts", async (thunkAPI) => {
    try {
        const response = await productService.getAllProd();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//use this function in ProductDelete
export const ProductDelete = createAsyncThunk("products/ProductDelete", async (productId, thunkAPI) => {
    try {
        const response = await productService.deleteProd(productId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//use this function in getSignleProd
export const getSingleProduct = createAsyncThunk("products/getSingleProduct", async (productId, thunkAPI) => {
    try {
        const response = await productService.getSingleProd(productId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//use this function in updateSingleProduct
export const updateSingleProduct = createAsyncThunk("products/updateSingleProduct", async ({formData,productId}, thunkAPI) => {
    try {
        const response = await productService.updateProduct({formData,productId});
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    products: [],
    status: "idle",
    error: null
}
//use this export in the store file as a productsReducer
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //for addProduct 
            .addCase(addProduct.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(addProduct.fulfilled, (state, action) => {
                state.status = "success"
                state.products = action.payload;
            }).addCase(addProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for getAllProducts 
            .addCase(getAllProducts.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = "success"
                state.products = action.payload;
            }).addCase(getAllProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for getSingleProduct 
            .addCase(getSingleProduct.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(getSingleProduct.fulfilled, (state, action) => {
                state.status = "success"
                state.products = action.payload;
            }).addCase(getSingleProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for updateSingleProduct 
            .addCase(updateSingleProduct.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(updateSingleProduct.fulfilled, (state, action) => {
                state.status = "success"
                state.products = action.payload;
            }).addCase(updateSingleProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })
            //for delete single Products 
            .addCase(ProductDelete.pending, (state) => {
                state.status = "loading"
                state.error = null
            }).addCase(ProductDelete.fulfilled, (state, action) => {
                state.status = "success"
                state.products = action.payload;
            }).addCase(ProductDelete.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload;
            })

    }
})


export default productSlice.reducer