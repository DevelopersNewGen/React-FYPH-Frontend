import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

/**
 * Espera un array de objetos así:
 * [
 *   { hotel: "Hotel A", type: "Sencilla", count: 10 },
 *   { hotel: "Hotel A", type: "Doble", count: 5 },
 *   { hotel: "Hotel B", type: "Sencilla", count: 7 },
 *   ...
 * ]
 */
export function HotelsGroupedBarChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No hay datos</div>;
  }


  // Obtener hoteles y tipos únicos
  const hoteles = [...new Set(data.map(d => d.hotel))];
  const tipos = [...new Set(data.map(d => d.type))];

  // Construir series para cada tipo de habitación
  const series = tipos.map(tipo => ({
    label: tipo,
    data: hoteles.map(hotel => {
      const found = data.find(d => d.hotel === hotel && d.type === tipo);
      return found ? found.count : 0;
    })
  }));

  return (
    <BarChart
      series={series}
      height={300}
      xAxis={[{ data: hoteles, label: "Hoteles" }]}
    />
  );
}

// Utilidad para agrupar reservaciones por hotel y tipo
export function groupReservations(reservations) {
  const counts = {};
  reservations.forEach(r => {
    const key = `${r.hotel}|${r.type}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).map(([key, count]) => {
    const [hotel, type] = key.split('|');
    return { hotel, type, count };
  });
}