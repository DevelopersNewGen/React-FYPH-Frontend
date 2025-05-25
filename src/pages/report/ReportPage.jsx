import React, { useEffect, useState } from "react";
import useReport from "../../shared/hooks/useReport";
import { HotelsGroupedBarChart, groupReservations } from "../../components/report/reportGraph";

export default function ReportPage() {
  const { topHotels, hotelReservations, fetchTopHotels, fetchHotelReservations, loading } = useReport();
  const [selectedHotelId, setSelectedHotelId] = useState("");

  useEffect(() => {
    fetchTopHotels();
  }, [fetchTopHotels]);

  useEffect(() => {
    if (topHotels.length > 0 && !selectedHotelId) {
      setSelectedHotelId(topHotels[0]._id); // usar ID real
    }
  }, [topHotels, selectedHotelId]);

  useEffect(() => {
    if (selectedHotelId) {
      fetchHotelReservations(selectedHotelId);
    }
  }, [selectedHotelId, fetchHotelReservations]);

  const groupedData = groupReservations(hotelReservations);
  console.log("Grouped Data:", groupedData);

  return (
    <div>
      <h2>Reservaciones por tipo y hotel</h2>
      {loading ? <p>Cargando...</p> : <HotelsGroupedBarChart data={groupedData} />}

      <div style={{ margin: "2rem 0" }}>
        <h3>Ver reservaciones por hotel</h3>
        <select
          value={selectedHotelId}
          onChange={e => setSelectedHotelId(e.target.value)}
        >
          <option value="">Seleccione un hotel</option>
          {topHotels.map((h) => (
            <option key={h._id} value={h._id}>
              {h.hotel}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
