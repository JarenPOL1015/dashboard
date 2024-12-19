import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

interface Indicator {
    title?: String;
    value?: String;
}

interface PuestaSolProps {
    indicators: Indicator[];  // Asegúrate de recibir los indicadores como prop
}

// Función para obtener la fecha actual en formato dd/mm/yyyy
const formatCurrentDate = () => {
    const date = new Date();  // Obtener la fecha actual
    const day = String(date.getDate()).padStart(2, '0');  // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mes con 2 dígitos (getMonth() empieza en 0)
    const year = date.getFullYear();  // Año completo

    return { day, month, year };  // Retornar cada parte de la fecha
};

export default function PuestaSol( { indicators } : PuestaSolProps ) {

    const { day, month, year } = formatCurrentDate();
  
    const formatHour = (dateString: string) => {
      const date = new Date(dateString);
      date.setHours(date.getHours() - 5);  // Restar 5 horas para ajustar a UTC-5
      const hours = date.getHours();  // Obtén las horas ajustadas
      const minutes = date.getMinutes();  // Obtén los minutos
      const seconds = date.getSeconds();  // Obtén los segundos
      // Formato hh:mm:ss (Aseguramos que los minutos y segundos tengan dos dígitos)
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div id="puestadelsol">
        <Box
        sx={{
          display: 'flex',            // Usa Flexbox para alinear los elementos
          flexDirection: 'row',       // Alineación en fila
          justifyContent: 'space-evenly', // Espacio entre los elementos
          alignItems: 'center',       // Alineación vertical centrada
          padding: '20px',            // Añadir padding
          gap: '20px'
        }}
      >
        {/* GIF del Sol */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img 
            src="https://media1.tenor.com/m/OJ7WlTChrfoAAAAd/doge-dogecoin.gif"
            alt="Sol Poniente"
            style={{ width: '100%', height: 'auto' }} // Ajusta tamaño
          />
        </Box>

        {/* Rectángulos con bordes redondeados */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',  // Alineación en columna para los rectángulos
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flex: 1,                  // Ocupa el mismo espacio que el GIF
          }}
        >
          {
              indicators.map((indicator, idx) => {
              // Realiza un casting explícito de 'indicator.value' de 'String' a 'string'
              const hour = indicator.value ? formatHour(String(indicator.value)) : '';  // Formatear la hora                
                  if (indicator.title === "Sun_rise") {
                      
                    return (
                      <Box
                        key={idx}
                        sx={{
                          width: '100%',
                          height: '100px',
                          backgroundColor: '#00A4D3',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            fontFamily: 'Arial, sans-serif',
                          }}
                        >
                          Salida de Sol: <br /> {hour}
                        </Typography>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          width: '100%',
                          height: '100px',
                          backgroundColor: '#1C0C4F',
                          borderRadius: '10px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            fontFamily: 'Arial, sans-serif',
                          }}
                        >
                          Puesta de Sol: <br /> {hour}
                        </Typography>
                      </Box>
                    );
                  }
                })
          }
          
          
        
        </Box>

        {/* Mini tabla o calendario */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              {/* Título */}
              <Typography variant="h6" align="center" sx={{ backgroundColor: '#CBE8BA', padding: '8px', borderRadius: '5px' }} gutterBottom>
                Fecha Actual
              </Typography>

              {/* Tabla con fecha */}
              <TableContainer>
                <Table sx={{ width: '100%' }}>
                  <TableBody>
                    {/* Fila con día y mes */}
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center' }}><Typography variant="h5">{day}</Typography></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><Typography variant="h5">{month}</Typography></TableCell>
                    </TableRow>
                    {/* Fila con año */}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{year}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
    
  );
}
