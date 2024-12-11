import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item_Tabla from '../interface/Item';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

interface TableWeatherProps {
  itemsIn: Item_Tabla[];
} 

export default function BasicTable( props: TableWeatherProps ) {

  const [rows_item, setRows_item] = useState<Item_Tabla[]>([]);

  // Función para formatear las fechas a solo horas y minutos
  const formatFechas = (fechaInicio: String, fechaFin: String) => {
    // Crear un nuevo objeto Date a partir de las cadenas de fecha
    const startDate = new Date(fechaInicio.toString());
    const endDate = new Date(fechaFin.toString());

    // Extraer las horas y minutos, luego formatearlas en "HH:mm"
    const startHour = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endHour = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

    // Retornar el rango de horas
    return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
  };

  // Función para convertir Kelvin a Celsius
  const kelvinToCelsius = (kelvin: String) => {
    const tempK = parseFloat(kelvin.toString()); // Asegura que la temperatura sea un número
    const celsius = tempK - 273.15;  // Realiza la conversión
    return parseFloat(celsius.toFixed(2)); // Redondea a 2 decimales
  };

  useEffect( () => {
    setRows_item(props.itemsIn);
  }, [props])

  return (
    <>
      <Box
        sx={{
          display: 'inline-block',
          backgroundColor: '#003748',
          color: 'white',
          borderRadius: '20px',
          border: '1px solid #ffffff',
          padding: '10px 20px',
          margin: '25px 0 0 0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            letterSpacing: '.05rem',
          }}
        >
          Reporte Detallado
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={ { margin: '50px 0' } }>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#0C59CF' }}>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Rango de Horas (Día Actual)
            </TableCell>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Clima
            </TableCell>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Temperatura (°C)
            </TableCell>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Precipitacion
            </TableCell>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Velocidad del Viento (m/s)
            </TableCell>
            <TableCell align="center" sx={{ border: '1px solid #0C59CF', color: 'white' }}>
              Humedad
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows_item.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{formatFechas(row.dateStart, row.dateEnd)}</TableCell>
              <TableCell align="center">{row.clouds}</TableCell>
              <TableCell align="center">{kelvinToCelsius(row.temperature)}</TableCell>
              <TableCell align="center">{row.precipitation}%</TableCell>
              <TableCell align="center">{row.windSpeed}</TableCell>
              <TableCell align="center">{row.humidity}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}