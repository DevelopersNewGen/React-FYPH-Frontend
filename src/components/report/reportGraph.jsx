import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const colores = [
  '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0',
  '#9966ff', '#f67019', '#00a950', '#d84315',
  '#5c6bc0', '#c2185b', '#8bc34a', '#009688'
];

export function HotelsGroupedBarChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-no-data">No hay datos</div>;
  }

  const hoteles = [...new Set(data.map(d => d.hotel))];
  const tipos = [...new Set(data.map(d => d.type))];

  const series = tipos.map((tipo, index) => ({
    label: tipo,
    data: hoteles.map(hotel => {
      const found = data.find(d => d.hotel === hotel && d.type === tipo);
      return found ? found.count : 0;
    }),
    color: colores[index % colores.length]
  }));

  return (
    <div className="chart-container">
      <BarChart
        series={series}
        height={350}
        width={600}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        xAxis={[{ data: hoteles, label: "Hoteles" }]}
      />
    </div>
  );
}

export function TopHotelsBarChart({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return <div className="chart-no-data">No hay datos</div>;
  }

  const series = [{
    label: "Reservaciones",
    data: hotels.map(hotel => hotel.numReservaciones),
    color: colores[0]
  }];

  return (
    <div className="chart-container">
      <BarChart
        series={series}
        height={350}
        width={600}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        xAxis={[{ data: hotels.map(h => h.hotel), label: 'Hoteles' }]}
        layout="vertical"
      />
    </div>
  );
}

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