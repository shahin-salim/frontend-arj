import axios from "axios"

export const AxiosWithBaseUrl = axios.create({
    baseURL: "http://localhost:8000/"
})


export const AxiosWithToken = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
})