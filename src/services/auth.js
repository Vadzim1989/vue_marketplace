import { axiosIntanse } from "@/http";

export function authServices() {
    const axios = axiosIntanse;

    const authUser = (data) => axios.post('/auth', data);
    const registerUser = (data) => axios.post('/register', data);

    return {
        authUser,
        registerUser,
    }
}