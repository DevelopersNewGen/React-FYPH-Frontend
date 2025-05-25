export const validateEventName = (name) =>
  typeof name === "string" && name.trim().length >= 3 && name.trim().length <= 50;

export const validateEventNameMessage = "El nombre debe tener entre 3 y 50 caracteres.";