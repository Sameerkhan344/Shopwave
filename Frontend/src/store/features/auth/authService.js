import axios from "axios";

//use this function in authSlice.js => createAsyncThunk
//register
const registerUser = async (formData) => {
    try {
        const axiosResponse = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/users/register`, formData, {
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
const loginUser = async (formData) => {
    try {
        const axiosResponse = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/users/login`, formData, {
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
const logoutUser = async () => {
    try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
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

const authService = { loginUser, registerUser, logoutUser };
export default authService;