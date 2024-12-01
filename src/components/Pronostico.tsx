import { Typography, Box } from '@mui/material';

export default function Pronostico() {
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
                    Fecha: 01/12/2024
                </Typography>
            </Box>
        </>
    );
}