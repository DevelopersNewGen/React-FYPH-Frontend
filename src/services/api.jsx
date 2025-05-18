import axios from "axios";

const API_URL = "http://127.0.0.1:3000/FYPH/v1"; 


export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};