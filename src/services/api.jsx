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

export const getHosts = async () => {
  try {
    const response = await apiClient.get("/users");
    console.log('Respuesta de /users:', response.data);
    const allUsers = response.data.users || [];
    return allUsers.filter(user => user.role === "HOST_ROLE");
  } catch (error) {
    return [];
  }
};


export const getHotels = async () => {
  try {
    const response = await apiClient.get("/hotels/")
    return response.data
  } catch (error) {
    throw error
  }
}

export const getHotelById = async (hotelId) => {
  try {
    const response = await apiClient.get(`/hotels/findHotel/${hotelId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createHotel = async (formData) => {
  try {
    const response = await apiClient.post("/hotels/createHotel", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
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