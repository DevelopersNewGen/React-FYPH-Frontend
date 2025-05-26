import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/FYPH/v1",
    timeout: 3000,
    httpsAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user");

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                    console.log("Token agregado al header:", parsedUser.token);
                }
            } catch (err) {
                console.warn("Error al leer el token:", err);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// AUTH
export const register = async (data) => {
    try {
        return await apiClient.post("/auth/register", data);
    } catch (e) {
        return { error: true, e };
    }
};

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data);
    } catch (e) {
        return { error: true, e };
    }
};

// USERS
export const getUser = async () => {
    try {
        return await apiClient.get(`/users/getUser`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getUserById = async (uid) => {
    try {
        return await apiClient.get(`/users/findUser/${uid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateUser = async (data) => {
    try {
        return await apiClient.put('/users/updateUser', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const updatePassword = async (data) => {
    try {
        return await apiClient.patch('/users/updatePassword', data);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteUser = async () => {
    try {
        return await apiClient.delete(`/users/deleteUserClient`);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateProfilePicture = async (data) => {
    try {
        return await apiClient.patch('/users/updateProfilePicture', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        return { error: true, e };
    }
};

export const getClients = async () => {
    try {
        return await apiClient.get(`/users`);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteUserAdmin = async (uid) => {
    try {
        return await apiClient.delete(`/users/deleteUserAdmin/${uid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateUserAdmin = async (uid, data) => {
    try {
        return await apiClient.put(`/users/updateUserAdmin/${uid}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const createUser = async (data) => {
    try {
        return await apiClient.put(`/users/createUser`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const getClientsHost = async () => {
    try {
        return await apiClient.get(`/hotels/clients`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getHosts = async () => {
    try {
        const response = await apiClient.get("/users");
        const allUsers = response.data.users || [];
        return allUsers.filter(user => user.role === "HOST_ROLE");
    } catch (error) {
        return [];
    }
};

// ROOMS
export const getRooms = async () => {
    try {
        return await apiClient.get('/rooms/getRooms');
    } catch (e) {
        return { error: true, e };
    }
};

export const getRoomById = async (rid) => {
    try {
        return await apiClient.get(`/rooms/getRoomById/${rid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const createRoom = async (formData) => {
    try {
        return await apiClient.post('/rooms/createRoom', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        return { error: true, e };
    }
};

export const updateRoom = async (rid, data) => {
    try {
        return await apiClient.put(`/rooms/updateRoom/${rid}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateRoomImages = async (rid, formData) => {
    try {
        return await apiClient.patch(`/rooms/updateImages/${rid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (e) {
        return { error: true, e };
    }
};

export const filterRooms = async (params) => {
    try {
        return await apiClient.get('/rooms/filterRooms', { params });
    } catch (e) {
        return { error: true, e };
    }
};

export const getRoomsByHotel = async (hid) => {
    try {
        return await apiClient.get(`/hotels/getRoomsByHotel/${hid}`);
    } catch (e) {
        return { error: true, e };
    }
};

// HOTELS

export const getHotels = async () => {
    try {
        const response = await apiClient.get("/hotels/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHotelById = async (hotelId) => {
    try {
        const response = await apiClient.get(`/hotels/findHotel/${hotelId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createHotel = async (formData) => {
    try {
        const response = await apiClient.post("/hotels/createHotel", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.msg || "Error al crear el hotel");
    }
};

export const updateHotel = async (hid, data) => {
    try {
        const response = await apiClient.put(`/hotels/updateHotel/${hid}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteHotel = async (hid) => {
    try {
        const response = await apiClient.delete(`/hotels/deleteHotel/${hid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addHotelComment = async (hid, { rating, comment }) => {
    try {
        const response = await apiClient.patch(`/hotels/addComment/${hid}`, { rating, comment });
        return response.data;
    } catch (error) {
        if (error.response?.data?.msg) {
            return { success: false, msg: error.response.data.msg };
        }
        return { success: false, msg: "Error de conexión o desconocido" };
    }
};

// RESERVATIONS
export const createReservation = async (rid, reservationData) => {
    try {
        return await apiClient.post(`/reservations/createReser/${rid}`, reservationData);
    } catch (e) {
        return { error: true, e };
    }
};

export const getReservationsByRoom = async (rid) => {
    try {
        return await apiClient.get(`/reservations/listReserByRoom/${rid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getReservationById = async (rid) => {
    try {
        return await apiClient.get(`/reservations/listReser/${rid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteReservation = async (rid) => {
    try {
        return await apiClient.delete(`/reservations/deleteReser/${rid}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getReservationByUser = async () => {
    try {
        return await apiClient.get(`/users/getReservations`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getReservationByHotel = async (hid) => {
    try {
        return await apiClient.get(`/hotels/getReservations/${hid}`);
    } catch (e) {
        return { error: true, e };
    }
};

// EVENTS
export const getEvents = async () => {
    try {
        return await apiClient.get("/events/");
    } catch (e) {
        return { error: true, e };
    }
};

export const createEvent = async (data) => {
    try {
        return await apiClient.post("/events/createEvent", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (e) {
        return { error: true, e };
    }
};

export const updateEvent = async (eid, data) => {
    try {
        return await apiClient.put(`/events/editEvent/${eid}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteEvent = async (eid) => {
    try {
        return await apiClient.delete(`/events/deleteEvent/${eid}`);
    } catch (e) {
        return { error: true, e };
    }
};

// REPORTS
export const getTopHotels = async (limit = 5) => {
    try {
        const response = await apiClient.get(`/reports/getTopHotels`, { params: { limit } });
        return response.data;
    } catch (error) {
        return { success: false, error };
    }
};

export const getHotelReservations = async (hid) => {
    try {
        const response = await apiClient.get(`/reports/getHotelReservations/${hid}`);
        return response.data;
    } catch (error) {
        return { success: false, error };
    }
};
