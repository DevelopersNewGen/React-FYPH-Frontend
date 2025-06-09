export const validateEventCost = (cost) =>
  cost === "" || (!isNaN(cost) && Number(cost) >= 0);

export const validateEventCostMessage = "El costo debe ser un número positivo.";