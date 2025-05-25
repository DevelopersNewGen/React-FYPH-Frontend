import React, { useEffect, useState } from "react";
import useReport from "../../shared/hooks/useReport";
import { HotelsGroupedBarChart, groupReservations } from "../../components/report/reportGraph";

export default function ReportPage() {
  const { topHotels, hotelReservations, fetchTopHotels, fetchHotelReservations, loading } = useReport();
  const [selectedHotel, setSelectedHotel] = useState("");

  // Al cargar, trae el top de hoteles
  useEffect(() => {
    fetchTopHotels();
  }, [fetchTopHotels]);

  // Cuando cambia el topHotels, selecciona el primero automáticamente
  useEffect(() => {
    if (topHotels.length > 0 && !selectedHotel) {
      setSelectedHotel(topHotels[0].hotel);
    }
  }, [topHotels, selectedHotel]);

  // Cuando cambia el hotel seleccionado, trae sus reservaciones
  useEffect(() => {
    if (selectedHotel) {
      fetchHotelReservations(selectedHotel);
    }
  }, [selectedHotel, fetchHotelReservations]);

  // Agrupa las reservaciones del hotel seleccionado
  const groupedData = groupReservations(hotelReservations);

  return (
    <div>
      <h2>Reservaciones por tipo y hotel</h2>
      {loading ? <p>Cargando...</p> : <HotelsGroupedBarChart data={groupedData} />}

      <div style={{ margin: "2rem 0" }}>
        <h3>Ver reservaciones por hotel</h3>
        <select
          value={selectedHotel}
          onChange={e => setSelectedHotel(e.target.value)}
        >
          <option value="">Seleccione un hotel</option>
          {topHotels.map(h => (
            <option key={h.hotel} value={h.hotel}>{h.hotel}</option>
          ))}
        </select>
      </div>
    </div>
  );
}