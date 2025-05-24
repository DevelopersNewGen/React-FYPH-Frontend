import * as React from 'react';
import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useReservationByHotel } from '../../shared/hooks/useReservationByHotel.jsx';

export default function ReservationByHotelChart({ limit = 5 }) {
  const { labels, values, loading } = useReservationByHotel(limit);

  if (loading) {
    return <div>Cargando datos de reservaciones…</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Título centrado arriba de la gráfica */}
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: 'center',
          mb: 2,
          fontWeight: 'bold'
        }}
      >
        Hoteles más solicitados
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Etiqueta vertical junto al gráfico */}
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom 0',
            whiteSpace: 'nowrap',
            mr: -23,
            ml: 1,
            fontWeight: 'bold',
            mt: 29,
            alignSelf: 'flex-start'
          }}
        >
          Cantidad de solicitudes
        </Typography>

        <ChartContainer
          xAxis={[{ scaleType: 'band', data: labels }]}
          series={[
            {
              type: 'bar',
              id: 'reservas',
              data: values,
            },
          ]}
          width={300}
          height={400}
        >
          <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
          <ChartsXAxis />
          <ChartsYAxis />
        </ChartContainer>
      </Box>
    </Box>
  );
}

const Text = styled('text')(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: 'none',
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  pointerEvents: 'none',
}));

function BarLabel(props) {
  const { xOrigin, yOrigin, x, y, width, skipAnimation, color, ...other } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: (y ?? 0) - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: p => p,
      applyProps: (el, p) => {
        el.setAttribute('x', p.x.toString());
        el.setAttribute('y', p.y.toString());
      },
      skip: skipAnimation,
    }
  );

  return <Text {...other} fill={color} {...animatedProps} />;
}