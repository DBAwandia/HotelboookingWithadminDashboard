import axios from "axios"

export const axiosInstance = axios.create({
   
    baseURL: "http://127.0.0.1:5000/api/"
    // baseURL: "https://hotelzbooking.herokuapp.com/api"
})