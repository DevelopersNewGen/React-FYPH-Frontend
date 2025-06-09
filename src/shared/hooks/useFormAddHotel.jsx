import { useState, useCallback } from "react";
import { getHosts } from "../../services/api";
import { validateImageTypes } from "../validators/validateAddHotels";

let serviceId = 0;
const createService = () => ({
  id: serviceId++,
  type: "",
  description: "",
  price: ""
});

export default function useFormAddHotelLogic() {
  const [services, setServices] = useState([createService()]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [hostValue, setHostValue] = useState("");

  const handleServiceChange = (id, field, value) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const addService = () => setServices([...services, createService()]);
  const removeService = (id) =>
    setServices(services.length > 1 ? services.filter((s) => s.id !== id) : services);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validation = validateImageTypes(files);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }
    setImagesPreview(prev => [
      ...prev,
      ...validation.files.map((file) => URL.createObjectURL(file))
    ]);
    setSelectedFiles(prev => [...prev, ...validation.files]);
  };

  const handleRemoveImage = (idx) => {
    setImagesPreview(prev => prev.filter((_, i) => i !== idx));
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const fetchHosts = useCallback(() => {
    getHosts().then((res) => {
      setHosts(Array.isArray(res) ? res : res?.users || []);
    });
  }, []);

  return {
    services,
    setServices,
    imagesPreview,
    setImagesPreview,
    selectedFiles,
    setSelectedFiles,
    hosts,
    hostValue,
    setHostValue,
    handleServiceChange,
    addService,
    removeService,
    handleImageChange,
    handleRemoveImage,
    fetchHosts,
    createService
  };
}