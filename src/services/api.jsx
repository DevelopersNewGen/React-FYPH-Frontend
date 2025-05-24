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

export const getUser = async () => {
    try {
        return await apiClient.get(`/users/getUser`)
    } catch (e) {
       return {
            error: true,
            e
        };  
    }
}

export const getUserById = async (uid) => {
    try {
        return await apiClient.get(`/users/findUser/${uid}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const updatePassword = async (data) => {
    try {
        return await apiClient.patch('/users/updatePassword', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};