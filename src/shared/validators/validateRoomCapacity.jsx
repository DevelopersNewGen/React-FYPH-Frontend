export const validateRoomCapacity = (capacity) => {
  const num = Number(capacity);
  return Number.isInteger(num) && num >= 1 && num <= 10;
};

export const validateRoomCapacityMessage = 'La capacidad no debe ser mayor a 10 ';