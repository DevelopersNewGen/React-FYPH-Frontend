// This file exports functions for interacting with the backend API. It includes createRoom, which is used to send a POST request to create a new room with the provided form data.

import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/FYPH/v1",
    timeout: 3000,
    httpsAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if(userDetails){
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);

export const getRooms = async () => {
    try {
        return await apiClient.get('/rooms/getRooms');
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getRoomById = async (rid) => {
    try {
        return await apiClient.get(`/rooms/${rid}`);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const createRoom = async (formData) => {
    try {
        return await apiClient.post('/room/createRoom', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};