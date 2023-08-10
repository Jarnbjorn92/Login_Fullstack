import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useHistory } from 'react-router-dom'; // Import React Router's useHistory

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

const tokenInterceptor = (config) => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwt_decode(token);
        const expirationTime = new Date(decodedToken.exp * 1000);

        if (expirationTime <= new Date()) {
            return api.post('/api/token/refresh/', { refresh: localStorage.getItem('refreshToken') })
                .then((response) => {
                    const newAccessToken = response.data.access;
                    localStorage.setItem('token', newAccessToken);
                    config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return config;
                })
                .catch(() => {
                    // If token refresh fails, redirect to login page
                    // const history = useHistory();
                    // history.push('/login');
                    return Promise.reject('Token refresh failed');
                });
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        }
    }
    return config;
};

api.interceptors.request.use(tokenInterceptor, (error) => Promise.reject(error));

export default api;