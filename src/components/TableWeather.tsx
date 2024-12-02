import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item_Tabla from '../interface/Item';
import { useEffect, useState } from 'react';

interface TableWeatherProps {
  itemsIn: Item_Tabla[];
}

export default function BasicTable( props: TableWeatherProps ) {

  const [rows_item, setRows_item] = useState<Item_Tabla[]>([]);

  useEffect( () => {
    setRows_item(props.itemsIn);
  }, [props])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell>Rango de Horas</TableCell>
              <TableCell align="right">Clima</TableCell>
              <TableCell align="right">Temperatura</TableCell>
              <TableCell align="right">Precipitacion</TableCell>
              <TableCell align="right">Velocidad del Viento</TableCell>
              <TableCell align="right">Humedad</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows_item.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dateStart} - {row.dateEnd}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.clouds}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.temperature}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.precipitation}%
              </TableCell>
              <TableCell component="th" scope="row">
                {row.windSpeed}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.humidity}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}