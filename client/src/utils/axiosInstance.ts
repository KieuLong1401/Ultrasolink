import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' },
})

// axiosInstance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// )

export default axiosInstance
