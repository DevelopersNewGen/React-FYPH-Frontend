import { useState } from "react";
import { createHotel } from "../../services/index.js"; // o la ruta donde tengas api.jsx

export const useHotelAdd = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const addHotel = async (hotelData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", hotelData.name);
      formData.append("description", hotelData.description);
      formData.append("address", hotelData.address);
      formData.append("telephone", hotelData.telephone);
      formData.append("host", hotelData.host); 

      if (hotelData.images && hotelData.images.length > 0) {
        Array.from(hotelData.images).forEach((img) =>
          formData.append("pictures", img)
        );
      }

      formData.append("services", JSON.stringify(hotelData.services));

      const result = await createHotel(formData);

      if (result.success) {
        setSuccess(result.msg || "Hotel creado correctamente");
      } else {
        setError(result.msg || "Error al crear el hotel");
      }
    } catch (err) {
      setError(
        err?.response?.data?.msg ||
          err?.message ||
          "Error inesperado al crear hotel"
      );
    } finally {
      setLoading(false);
    }
  };

  return { addHotel, loading, success, error };
};
