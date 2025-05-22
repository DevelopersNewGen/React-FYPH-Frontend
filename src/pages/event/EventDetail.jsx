import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEventDetail } from "../../shared/hooks/useEventDetail.jsx";
import { EventDetailContent } from "../../components/event/EventDetailContent.jsx";
import EventActions from "../../components/event/EventActions.jsx";
import "./eventDetail.css";

export default function EventDetail() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const { evento, loading, mainImage, setMainImage, getPreviewImages } =
    useEventDetail(eid);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || null;

  const handleEventUpdated = () => window.location.reload();
  const handleEventDeleted = () => navigate("/eventos");

  return (
    <>
      <ResponsiveAppBar />
      <div className="event-page-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          {evento && (
            <EventActions
              event={evento}
              onEventUpdated={handleEventUpdated}
              onEventDeleted={handleEventDeleted}
              role={role}
            />
          )}
        </div>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : evento ? (
          <EventDetailContent
            evento={evento}
            mainImage={mainImage}
            setMainImage={setMainImage}
            getPreviewImages={getPreviewImages}
            onBack={() => navigate(-1)}
          />
        ) : (
          <p style={{ color: "red" }}>Evento no encontrado.</p>
        )}
      </div>
    </>
  );
}
