import { Typography, Box, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';

interface forecastClima {
    temperatura: string,
    precipitacion: string,
    desde: string,
    hasta: string,
    nubes: string
}

interface PronosticoProp {
    lista: forecastClima[]
}

export default function Pronostico({lista}: PronosticoProp) {
    
    // Función para formatear la fecha en formato DD-MM-YYYY
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Los meses empiezan desde 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Función para extraer solo la hora en formato HH:MM:SS
    const formatTime = (dateString: string) => {
        const time = dateString.split("T")[1];  // Obtiene la parte de la hora
        return time;
    };

    // Función para obtener la imagen del clima según el estado de las nubes
    const getWeatherImage = (nubes: string) => {
        let imagePath = "/media/default.png"; // Ruta predeterminada
    
        switch (nubes.toLowerCase()) {
            case "broken clouds":
                imagePath = "https://cdn-icons-png.flaticon.com/512/6566/6566392.png";
                break;
            case "few clouds":
                imagePath = "https://cdn-icons-png.freepik.com/512/17453/17453315.png";
                break;
            default:
                imagePath = "https://cdn-icons-png.freepik.com/512/648/648198.png";
        }
        return imagePath;
    };
    
    // Función para convertir Kelvin a Celsius
    const kelvinToCelsius = (kelvin: string) => {
        const tempK = parseFloat(kelvin); // Asegura que la temperatura sea un número
        const celsius = tempK - 273.15;  // Realiza la conversión
        return parseFloat(celsius.toFixed(2)); // Redondea a 2 decimales
    };

    // Clasificación de los pronósticos en 3 categorías: mañana, tarde, noche
    const morningData = lista.filter(item => {
        const hour = parseInt(item.desde.split("T")[1].split(":")[0]);
        return hour >= 6 && hour < 12;  // Filtra para horas de la mañana (06:00 - 11:59)
    });

    const afternoonData = lista.filter(item => {
        const hour = parseInt(item.desde.split("T")[1].split(":")[0]);
        return hour >= 12 && hour < 18;  // Filtra para horas de la tarde (12:00 - 17:59)
    });

    const nightData = lista.filter(item => {
        const hour = parseInt(item.desde.split("T")[1].split(":")[0]);
        return hour >= 18 || hour < 6;  // Filtra para horas de la noche (18:00 - 05:59)
    });


    return (
        <>
            <Typography
                variant="h3"
                sx={{
                    fontFamily: 'Arial',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    textAlign: 'center',
                    color: 'white',
                    padding: '10px',
                    backgroundColor: '#1C0C4F',
                    margin: '10px 0',
                }}
            >
                Pronóstico
            </Typography>
            <Box
                sx={{
                    display: 'inline-block', // Ajustar al contenido
                    backgroundColor: '#003748',
                    color: 'white',
                    borderRadius: '20px', // Borde circular
                    border: '1px solid #ffffff',
                    padding: '10px 20px', // Espaciado interno
                    marginTop: '20px', // Separación con el texto anterior
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        letterSpacing: '.05rem',
                    }}
                >
                    Mañana, tarde y noche entre el día actual y/o siguiente
                </Typography>
            </Box>
            {/* Contenedor para las tarjetas */}
            {/* Contenedor para las tarjetas */}
            <Grid container spacing={2} sx={{ marginTop: '20px' }}>

                {/* Mañana */}
                {morningData.length > 0 && (
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                backgroundColor: '#4CAF50',
                                padding: '10px',
                                borderRadius: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                                Mañana
                            </Typography>
                        </Box>
                        {morningData.map((item, index) => (
                            <Card key={index} sx={{ marginTop: '10px' }}>
                                <CardContent>
                                    <img src={getWeatherImage(item.nubes)} alt="weather" width="60" height="60" />
                                    <Typography variant="h6">{item.nubes}</Typography>
                                    <List>
                                        <ListItem>
                                        <ListItemText primary={`Temperatura: ${kelvinToCelsius(item.temperatura).toFixed(1)}°C`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Precipitación: ${item.precipitacion}%`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Fecha: ${formatDate(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Desde: ${formatTime(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Hasta: ${formatTime(item.hasta)}`} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}

                {/* Tarde */}
                {afternoonData.length > 0 && (
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                backgroundColor: '#FF9800',
                                padding: '10px',
                                borderRadius: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                                Tarde
                            </Typography>
                        </Box>
                        {afternoonData.map((item, index) => (
                            <Card key={index} sx={{ marginTop: '10px' }}>
                                <CardContent>
                                    <img src={getWeatherImage(item.nubes)} alt="weather" width="60" height="60" />
                                    <Typography variant="h6">{item.nubes}</Typography>
                                    <List>
                                        <ListItem>
                                        <ListItemText primary={`Temperatura: ${kelvinToCelsius(item.temperatura).toFixed(1)}°C`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Precipitación: ${item.precipitacion}%`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Fecha: ${formatDate(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Desde: ${formatTime(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Hasta: ${formatTime(item.hasta)}`} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}

                {/* Noche */}
                {nightData.length > 0 && (
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                backgroundColor: '#3F51B5',
                                padding: '10px',
                                borderRadius: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                                Noche
                            </Typography>
                        </Box>
                        {nightData.map((item, index) => (
                            <Card key={index} sx={{ marginTop: '10px' }}>
                                <CardContent>
                                    <img src={getWeatherImage(item.nubes)} alt="weather" width="60" height="60" />
                                    <Typography variant="h6">{item.nubes}</Typography>
                                    <List>
                                        <ListItem>
                                        <ListItemText primary={`Temperatura: ${kelvinToCelsius(item.temperatura).toFixed(1)}°C`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Precipitación: ${item.precipitacion}%`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Fecha: ${formatDate(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Desde: ${formatTime(item.desde)}`} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Hasta: ${formatTime(item.hasta)}`} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}
            </Grid>
        </>
    );
}