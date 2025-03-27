import axios from 'axios'
import { cookies } from 'next/headers'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        console.log({
            url: config.url,
            method: config.method,
            data: config.data,
        })
        const token = cookies().get('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)

export default axiosInstance
