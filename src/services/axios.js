import axios from 'axios';
import { isTokenValid } from '../utils/authUtils';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Backend API URL
});

// Axios Interceptor to check token before every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            if (!isTokenValid(token)) {
                localStorage.removeItem('token');
                alert('Login expired/invalid! Please relogin');
                window.location.href = '/login'; // Redirect to login
                return Promise.reject('Token expired');
            }

            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error responses
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            alert('Login expired/invalid!');
            window.location.href = '/login'; // Redirect to login page or handle logout
        }
        return Promise.reject(error);
    }
);

export default api;
