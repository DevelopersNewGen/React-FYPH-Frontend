import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/FYPH/v1",
    timeout: 3000,
    httpsAgent: false
})

/*apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user")

        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)
*/

export const getHotels = async () => {
  try {
    const response = await apiClient.get("/hotels/")
    return response.data
  } catch (error) {
    throw error
  }
}