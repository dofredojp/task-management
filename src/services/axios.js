import axios from 'axios';
import { isTokenValid } from '../utils/authUtils';
// import { useHistory } from 'react-router-dom'; // or 'react-router' if you're using v6

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Backend API URL
});

// Axios Interceptor to check token before every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            // Check if the token is still valid
            if (!isTokenValid(token)) {
                // If token is invalid, log out the user
                localStorage.removeItem('token');
                alert('Login expired/invalid! Please relogin');
                window.location.href = '/login'; // Redirect to login
                return Promise.reject('Token expired');
            }

            // Attach token to request headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // You can perform operations with the response data here
        // For example, you can handle specific status codes or modify the response data
        return response;
    },
    (error) => {
        // Handle error responses
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized, handle it accordingly
            localStorage.removeItem('token');
            alert('Login expired/invalid!');
            window.location.href = '/login'; // Redirect to login page or handle logout
        }
        return Promise.reject(error);
    }
);

export default api;
