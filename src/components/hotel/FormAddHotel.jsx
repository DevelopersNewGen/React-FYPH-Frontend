import React, { useRef } from "react";
import { useHotelAdd } from "../../shared/hooks/useHotelAdd";
import { useNavigate } from "react-router-dom";
import { validateAddHotelFields } from "../../shared/validators/validateAddHotels";
import useFormAddHotelLogic from "../../shared/hooks/useFormAddHotel";
import "../../assets/style.css"

export const FormAddHotel = () => {
  const { addHotel, loading, success, error } = useHotelAdd();
  const {
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
  } = useFormAddHotelLogic();
  const formRef = useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchHosts();
  }, [fetchHosts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = selectedFiles;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const address = e.target.address.value;
    const telephone = e.target.telephone.value;
    const host = hostValue;
    const servicesFiltered = services
      .filter((s) => s.type && s.description && s.price)
      .map((s) => ({
        type: s.type,
        description: s.description,
        price: Number(s.price)
      }));

    const validation = validateAddHotelFields({
      name,
      description,
      address,
      telephone,
      host,
      images,
      services: servicesFiltered
    });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    addHotel({
      name,
      description,
      address,
      telephone,
      host,
      images,
      services: servicesFiltered,
    });

    formRef.current.reset();
    setImagesPreview([]);
    setSelectedFiles([]);
    setServices([createService()]);
    setHostValue("");
  };

  return (
    <div className="formaddhotel-bg">
      <video className="section-bg" autoPlay loop muted>
        <source src="https://res.cloudinary.com/daherc5uz/video/upload/v1748216098/ywxwfilf1ajkt1eiiiw7.mp4" type="video/mp4" />
      </video>
      <div className="formaddhotel-container">
        <button
          onClick={() => navigate("/dashboard")}
          className="section-button"
        >
          {"Regresar"}
        </button>
        <h2 className="section-title">
          Registrar Hotel
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
  <div className="formaddhotel-fields">
    <input
      name="name"
      placeholder="Nombre"
      maxLength={50}
      required
      className="formaddhotel-input"
    />
    <textarea
      name="description"
      placeholder="Descripción"
      maxLength={500}
      rows={4}
      required
      className="formaddhotel-input"
    />
    <input
      name="address"
      placeholder="Dirección"
      maxLength={100}
      required
      className="formaddhotel-input"
    />
    <input
      name="telephone"
      placeholder="Teléfono"
      maxLength={8}
      pattern="[0-9]{8}"
      required
      className="formaddhotel-input"
    />

    <div className="formaddhotel-fields">
      <select
        name="host"
        required
        value={hostValue}
        onChange={e => setHostValue(e.target.value)}
        className="formaddhotel-input"

      >
        <option  value="">Selecciona un Host</option>
        {hosts.map((h) => (
          <option key={h.uid} value={h.uid}>
            {h.name} ({h.email})
          </option>
        ))}
      </select>
      <div className="section-title">Selecciona un Host</div>
    </div>
    <input
      id="images"
      type="file"
      name="pictures"
      accept="image/png, image/jpg, image/jpeg"
      multiple
      style={{ display: "none" }}
      onChange={handleImageChange}
    />
    <label htmlFor="images" className="formaddhotel-upload-label">
      <span className="formaddhotel-upload-btn">
        Subir Imágenes
      </span>
    </label>
    <div className="formaddhotel-img-preview-list">
      {imagesPreview.map((src, i) => (
        <div key={i} className="formaddhotel-img-preview-item">
          <img src={src} alt="Preview" height={60} className="formaddhotel-img-preview" />
          <button
            type="button"
            onClick={() => handleRemoveImage(i)}
            className="formaddhotel-img-remove"
            title="Eliminar imagen"
          >
            ×
          </button>
        </div>
      ))}
    </div>
    <hr className="formaddhotel-divider" />
    <div >
      <label className="formaddhotel-services-label">Servicios</label>
      {services.map((service) => (
        <div key={service.id} className="formaddhotel-service-row">
          <select
            value={service.type || ""}
            onChange={e => handleServiceChange(service.id, "type", e.target.value)}
            required
            className="formaddhotel-input"
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
            type="text"
            placeholder="Descripción"
            value={service.description || ""}
            maxLength={100}
            required
            onChange={e => handleServiceChange(service.id, "description", e.target.value)}
            className="formaddhotel-input"
          />
          <input
            type="text"
            placeholder="Precio"
            value={service.price || ""}
            maxLength={10}
            required
            onChange={e => handleServiceChange(service.id, "price", e.target.value)}
            className="formaddhotel-input"
          />
          <button
            type="button"
            onClick={() => removeService(service.id)}
            disabled={services.length === 1}
            className="section-button"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addService}
        className="section-button"
      >
        + Agregar Servicio
      </button>
    </div>
    {error && <div className="formaddhotel-error">{error}</div>}
    {success && <div className="formaddhotel-success">{success}</div>}
    <button
      type="submit"
      disabled={loading}
      className="section-button "
    >
      {loading ? "Guardando..." : "Registrar Hotel"}
    </button>
  </div>
</form>
      </div>
    </div>
  );
};
