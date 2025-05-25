export function validateAddHotelFields({ name, description, address, telephone, host, images, services }) {
  if (!name || !description || !address || !telephone) {
    return { valid: false, error: "Todos los campos son obligatorios." };
  }
  if (!host) {
    return { valid: false, error: "Selecciona un Host." };
  }
  if (!images || images.length === 0) {
    return { valid: false, error: "Debes subir al menos una imagen." };
  }
  if (!/^[0-9]{8}$/.test(telephone)) {
    return { valid: false, error: "El teléfono debe tener 8 dígitos numéricos." };
  }
  const validServices = services.filter(s => s.type && s.description && s.price);
  if (validServices.length === 0) {
    return { valid: false, error: "Debes ingresar al menos un servicio." };
  }
  for (const s of validServices) {
    if (isNaN(Number(s.price)) || Number(s.price) <= 0) {
      return { valid: false, error: "El precio de cada servicio debe ser un número mayor a 0." };
    }
  }
  return { valid: true, error: "" };
}

export function validateImageTypes(files) {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  const filteredFiles = files.filter(file => allowedTypes.includes(file.type));
  if (filteredFiles.length !== files.length) {
    return { valid: false, error: "Solo se permiten imágenes PNG, JPG o JPEG" };
  }
  return { valid: true, files: filteredFiles };
}
