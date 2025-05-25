export function validateCommentAndRating({ rating, comment }) {
  if (!rating) {
    return { valid: false, error: "La calificación es obligatoria" };
  }
  return { valid: true, error: "" };
}

export function canEditOrDeleteHotel({ role, user, hotel }) {
  if (!role || !user || !hotel) return false;
  const hotelHostId =
    typeof hotel.host === "string"
      ? hotel.host
      : hotel.host?._id || hotel.host?.id;
  if (role === "ADMIN_ROLE") return true;
  if (
    role === "HOST_ROLE" &&
    hotelHostId &&
    (user?._id === hotelHostId || user?.id === hotelHostId)
  ) {
    return true;
  }
  return false;
}
