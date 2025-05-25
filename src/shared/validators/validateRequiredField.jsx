export const validateRequiredField = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== '';
};

export const validateRequiredFieldMessage = 'Este campo es obligatorio.';