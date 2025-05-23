import React, { useRef, useState } from "react";
import { useHotelAdd } from "../../shared/hooks/useHotelAdd";
import "../../pages/hotelPage/Hotel.css";

export const FormAddHotel = () => {
  const { addHotel, loading, success, error } = useHotelAdd();
  const [services, setServices] = useState([
    { type: "", description: "", price: "" },
  ]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const formRef = useRef();

  // Host: solo admins pueden asignar, normalmente es el id del usuario HOST
  const user = JSON.parse(localStorage.getItem("user"));
  const hostId = user?.role === "HOST_ROLE" ? user?._id || user?.id : "";

  // Manejadores para servicios
  const handleServiceChange = (idx, field, value) => {
    const newServices = [...services];
    newServices[idx][field] = value;
    setServices(newServices);
  };

  const addService = () =>
    setServices([...services, { type: "", description: "", price: "" }]);
  const removeService = (idx) =>
    setServices(services.length > 1 ? services.filter((_, i) => i !== idx) : services);

  // Preview imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const images = form.images.files;

    // Host: Admin debe seleccionar host de un listado
    let hostValue = form.host.value;
    if (!hostValue && hostId) hostValue = hostId;

    // Validación rápida
    if (!hostValue) return alert("Selecciona un Host.");
    if (!images.length) return alert("Debes subir al menos una imagen.");

    const servicesFiltered = services.filter(
      (s) => s.type && s.description && s.price
    );
    if (servicesFiltered.length === 0)
      return alert("Debes ingresar al menos un servicio.");

    addHotel({
      name: form.name.value,
      description: form.description.value,
      address: form.address.value,
      telephone: form.telephone.value,
      host: hostValue,
      images: images,
      services: servicesFiltered,
    });
    formRef.current.reset();
    setImagesPreview([]);
    setServices([{ type: "", description: "", price: "" }]);
  };

  // --- JSX ---
  return (
    <div className="card-details" style={{ margin: "2rem auto", maxWidth: 500 }}>
      <h1>Registrar Hotel</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="name" required maxLength={50} className="input-hotel" />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="description" required maxLength={500} className="input-hotel" />
        </div>
        <div>
          <label>Dirección:</label>
          <input name="address" required maxLength={100} className="input-hotel" />
        </div>
        <div>
          <label>Teléfono:</label>
          <input name="telephone" required maxLength={8} className="input-hotel" pattern="[0-9]{8}" />
        </div>
        {/* Host */}
        <div>
          <label>Host:</label>
          {user?.role === "ADMIN_ROLE" ? (
            <input name="host" required className="input-hotel" placeholder="ID del host" />
            // Mejor opción: Un select con todos los hosts (fetch de usuarios HOST_ROLE)
          ) : (
            <input name="host" type="hidden" value={hostId} />
          )}
        </div>
        {/* Imágenes */}
        <div>
          <label>Imágenes:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            className="input-hotel"
            onChange={handleImageChange}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {imagesPreview.map((src, i) => (
              <img key={i} src={src} alt="Preview" height={60} style={{ borderRadius: 8 }} />
            ))}
          </div>
        </div>
        {/* Servicios dinámicos */}
        <div style={{ margin: "1.5rem 0" }}>
          <label>Servicios:</label>
          {services.map((service, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <select
                value={service.type}
                required
                onChange={e => handleServiceChange(idx, "type", e.target.value)}
                className="input-hotel"
                style={{ minWidth: 130 }}
              >
                <option value="">Tipo</option>
                <option value="Hotel">Hotel</option>
                <option value="Singleroom">Simple</option>
                <option value="Doubleroom">Doble</option>
                <option value="Suite">Suite</option>
                <option value="Deluxeroom">Deluxe</option>
                <option value="Event">Evento</option>
              </select>
              <input
                placeholder="Descripción"
                value={service.description}
                required
                maxLength={100}
                className="input-hotel"
                onChange={e => handleServiceChange(idx, "description", e.target.value)}
              />
              <input
                type="number"
                min={0}
                placeholder="Precio"
                value={service.price}
                required
                className="input-hotel"
                style={{ width: 80 }}
                onChange={e => handleServiceChange(idx, "price", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeService(idx)}
                className="carousel-button"
                style={{ padding: "2px 10px" }}
                disabled={services.length === 1}
              >
                x
              </button>
            </div>
          ))}
          <button type="button" onClick={addService} className="carousel-button">
            + Servicio
          </button>
        </div>
        {/* Feedback */}
        {error && <p style={{ color: "red", fontWeight: 600 }}>{error}</p>}
        {success && <p style={{ color: "green", fontWeight: 600 }}>{success}</p>}
        {/* Botón de submit */}
        <button
          type="submit"
          className="carousel-button"
          style={{
            width: "100%",
            marginTop: "1rem",
            fontWeight: "700",
            fontSize: 18,
            background: "#0078d4",
            color: "#fff"
          }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Registrar hotel"}
        </button>
      </form>
    </div>
  );
};
