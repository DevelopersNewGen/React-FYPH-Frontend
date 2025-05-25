import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function CreateCommentForm({
  rating,
  setRating,
  comment,
  setComment,
  errorComment,
  successComment,
  loadingComment,
  handleSubmitComment,
}) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmitComment}
      sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2, maxWidth: 400 }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>Califica este hotel</Typography>
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
        sx={{ my: 2 }}
      />
      {errorComment && <Typography color="error">{errorComment}</Typography>}
      {successComment && <Typography color="success.main">{successComment}</Typography>}
      <Button type="submit" variant="contained" disabled={loadingComment}>
        {loadingComment ? "Enviando..." : "Enviar"}
      </Button>
    </Box>
  );
}
