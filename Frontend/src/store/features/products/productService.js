import axios from "axios";

//use this function in productSlice.js => createAsyncThunk
//create product
const createProduct = async (formData) => {
    try {
        const axiosResponse = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/products`, formData, {
                withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}

//get all products
const getAllProd = async () => {
    try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/products`, {
                // withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "application/json"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}

// delete single product
const deleteProd = async (productId) => {
    try {
        const axiosResponse = await axios
            .delete(`${import.meta.env.VITE_BASE_URL}/products/${productId}`, {
                // withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "application/json"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}
// get single product
const getSingleProd = async (productId) => {
    try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/products/${productId}`, {
                withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "application/json"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}

//update product
const updateProduct = async ({ formData, productId }) => {
    try {
        const axiosResponse = await axios
            .put(`${import.meta.env.VITE_BASE_URL}/products/${productId}`, formData, {
                withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}
const productService = { createProduct, getAllProd, deleteProd, getSingleProd, updateProduct };
export default productService;