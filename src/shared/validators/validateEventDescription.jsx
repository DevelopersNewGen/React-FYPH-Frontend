export const validateEventDescription = (desc) =>
  typeof desc === "string" && desc.trim().length >= 10 && desc.trim().length <= 200;

export const validateEventDescriptionMessage = "La descripción debe tener entre 10 y 200 caracteres.";