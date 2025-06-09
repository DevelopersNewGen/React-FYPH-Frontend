export const validateEventLocation = (loc) =>
  typeof loc === "string" && loc.trim().length >= 3 && loc.trim().length <= 100;

export const validateEventLocationMessage = "La ubicación debe tener entre 3 y 100 caracteres.";