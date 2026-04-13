import axios from "axios";

//use this function in authSlice.js => createAsyncThunk
//create category
const createCat = async (formData) => {
    try {
        const axiosResponse = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/categories`, formData, {
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

//get all category
const getAllCat = async () => {
    try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/categories`, {
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

//get single category
const getSingleCat = async (slug) => {
    try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/categories/${slug}`, {
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

//update category
const updateCat = async ({name, slug}) => {
    try {
        const axiosResponse = await axios
            .put(`${import.meta.env.VITE_BASE_URL}/categories/${slug}`, {name}, {
                withCredentials: true, // axios send automatically cookies when we apply this property
                headers: {
                    "Content-Type": "application/json"
                },
            })
        return axiosResponse.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again";
        return Promise.reject(errorMessage);
    }
}
// delete single category
const deleteCat = async (slug) => {
    try {
        const axiosResponse = await axios
            .delete(`${import.meta.env.VITE_BASE_URL}/categories/${slug}`, {
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

const categoriesService = { createCat, getAllCat, deleteCat, getSingleCat,updateCat };
export default categoriesService;