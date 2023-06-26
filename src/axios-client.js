import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://web.pinpaya.com/api`,
})

axiosClient.interceptors.request.use( (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Accept-Language'] = localStorage.getItem('i18next') || 'en';

    return config;
})

axiosClient.interceptors.response.use((response) => {

    return response;
}, (error) => {
    const {response} = error;
    if(response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }
    throw error;
})

export default axiosClient
