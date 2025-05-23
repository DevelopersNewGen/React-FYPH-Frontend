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
    (error) => {
        return Promise.reject(error);
    }
);

export const register = async (data) => {
    try {
        return await apiClient.post("/auth/register", data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const findUserById = async (uid) =>{
    try {
        return await apiClient.get(`/users/findUser/${uid}`);
    } catch (e) {
       return {
            error: true,
            e
        }; 
    }
}

export const getClients = async () => {
    try {
        return await apiClient.get(`/users`)
    } catch (e) {
       return {
            error: true,
            e
        };  
    }
}

export const deleteUserAdmin = async (uid) => {
    try {
        return await apiClient.delete(`/users/deleteUserAdmin/${uid}`)
    } catch (e) {
       return {
            error: true,
            e
        };  
    }
}

export const updateUserAdmin = async (uid, data) => {
    try {
        return await apiClient.put(`/users/updateUserAdmin/${uid}`, data)
    } catch (e) {
       return {
            error: true,
            e
        };  
    }
} 

export const createUser = async (uid, data) => {
    try {
        return await apiClient.put(`/users/createUser`, data)
    } catch (e) {
       return {
            error: true,
            e
        };  
    }
}  

export const getRole = async () => {
    try {
        return await apiClient.get(`/users/getRole`)
    } catch (e) {
       return {
            error: true,
            e: e.message
        };  
    }
}

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
        return await apiClient.get(`/rooms/getRoomById/${rid}`);
    } catch (e) {
        return {
            error: true,
            e
        };
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
        return {
            error: true,
            e
        };
    }
};

export const updateRoom = async (rid, data) => {
    try {
        return await apiClient.put(`/rooms/updateRoom/${rid}`, data); 
    } catch (e) {
        return {
            error: true,
            e
        };
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
        return {
            error: true,
            e
        };
    }
};

export const filterRooms = async (params) => {
    try {
        return await apiClient.get('/rooms/filterRooms', { params });
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getHotels = async () => {
    try {
        return await apiClient.get('/hotels/');
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};