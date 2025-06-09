import React, { useEffect, useState } from "react";
import useReport from "../../shared/hooks/useReport";
import { HotelsGroupedBarChart, TopHotelsBarChart, groupReservations } from "../../components/report/reportGraph";
import { ResponsiveAppBar } from '../../components/Navbar.jsx';
import { useUser } from '../../shared/hooks';
import './reportPage.css'; // importa el CSS externo

export default function ReportPage() {
  const { topHotels, hotelReservations, fetchTopHotels, fetchHotelReservations, loading } = useReport();
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const { role } = useUser();

  useEffect(() => {
    fetchTopHotels();
  }, [fetchTopHotels]);

  useEffect(() => {
    if (topHotels.length > 0 && !selectedHotelId) {
      setSelectedHotelId(topHotels[0]._id);
    }
  }, [topHotels, selectedHotelId]);

  useEffect(() => {
    if (selectedHotelId) {
      fetchHotelReservations(selectedHotelId);
    }
  }, [selectedHotelId, fetchHotelReservations]);

  const groupedData = groupReservations(hotelReservations);

  return (
    <div className="report-container">
      <ResponsiveAppBar role={role} />
      <h2 className="report-title">Top hoteles por número de reservaciones</h2>
      {loading ? <p>Cargando...</p> : <TopHotelsBarChart hotels={topHotels} />}

      <h3 className="report-title">Reservaciones por tipo de habitación</h3>
      <select
        className="report-select"
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
      <HotelsGroupedBarChart data={groupedData} />
    </div>
  );
}
