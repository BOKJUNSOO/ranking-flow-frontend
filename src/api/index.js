import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Content-Type":"application/json",
    }
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    }
)

export default apiClient;