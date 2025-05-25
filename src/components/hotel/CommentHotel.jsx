import React, { useState } from "react";
import { Button, Box, Typography, TextField, Stack } from "@mui/material";
import Rating from "@mui/material/Rating"; 
import { useHotelComment } from "../../shared/hooks/useHotelComment";

export default function HotelCommentForm({ hotelId, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { commentHotel, loading, error, success, setError, setSuccess } = useHotelComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!rating) {
      setError("La calificación es obligatoria");
      return;
    }
    const res = await commentHotel(hotelId, { rating, comment });
    if (res.success && onSuccess) onSuccess();
    setComment("");
    setRating(0);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Califica este hotel</Typography>
      <Stack spacing={2}>
        <Rating
          name="hotel-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={1}
        />
        <TextField
          label="Comentario"
          multiline
          minRows={2}
          value={comment}
          onChange={e => setComment(e.target.value)}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Stack>
    </Box>
  );
}
