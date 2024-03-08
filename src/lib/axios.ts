import axios from "axios"
import { headers } from "next/headers"


export const BASE_URL = 'https://api.webmaxi.net/api'

export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type":"application/json"
    }
})


