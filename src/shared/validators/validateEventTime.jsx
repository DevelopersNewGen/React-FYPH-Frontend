export const validateEventTime = (time) =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

export const validateEventTimeMessage = "El formato de hora debe ser HH:mm.";