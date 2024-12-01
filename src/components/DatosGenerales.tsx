import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid'; // Importar Grid correctamente
import 'leaflet/dist/leaflet.css';
import { ReactNode } from 'react';

interface Indicator {
    title?: String;
    value?: String | ReactNode;
}

interface DatosGeneralesProps {
    indicators: Indicator[];  // Asegúrate de recibir los indicadores como prop
  }

// Cards Data
const cards = [
    {
        title: 'Ubicación',
        content: (
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255168.19789702145!2d-79.9801008!3d-2.15250125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13cbe855805f%3A0x8015a492f4fca473!2sGuayaquil!5e0!3m2!1ses!2sec!4v1733040691296!5m2!1ses!2sec"
                width="100%"
                height="200"
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
            ></iframe>
        ),
    },
    {
        title: 'País',
        content: (
            <CardMedia
                component="img"
                height="200"
                image='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_Ecuador_%281900%E2%80%932009%29.svg/300px-Flag_of_Ecuador_%281900%E2%80%932009%29.svg.png'
                alt="Bandera de Ecuador"
            />
        ),
    },
];

// Componente principal
export default function DatosGenerales({ indicators }: DatosGeneralesProps) {
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
                Clima en la Ciudad de{' '}
                <span style={{ textDecoration: 'underline' }}>
                    GUAYAQUIL
                </span>
            </Typography>

            <Grid container spacing={2} sx={{ padding: '20px' }}>
                {/* Renderizar las tarjetas fijas de información (cards) */}
                {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: "#232323" }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="white"
                        style={{ fontWeight: 'bold' }}
                        >
                        {card.title}
                        </Typography>
                        {card.content}
                    </CardContent>
                    </Card>
                </Grid>
                ))}

                {/* Renderizar las tarjetas de indicadores (indicators) */}
                {indicators.map((indicator, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: "#232323" }}>
                    <CardContent
                        sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Centrado vertical
                        alignItems: 'center', // Centrado horizontal
                        textAlign: 'center', // Asegura que el texto sea centrado horizontalmente
                        }}
                    >
                        <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="white"
                        style={{ fontWeight: 'bold'}}
                        >
                            {indicator.title}
                        </Typography>
                        <Typography
                        component="p"
                        variant="h6"
                        sx={{
                            color: '#E0E0E0',
                            marginBottom: '5px',
                        }}
                        >
                            Última Referencia:
                        </Typography>
                        <Typography
                            component="p"
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#42BE65', // Color oscuro para el valor
                                borderRadius: '5px', // Bordes redondeados
                                padding: '10px',
                                fontSize: '60px',
                                textAlign: 'center', // Asegura que el valor esté centrado
                            }}
                        >
                            {indicator.value}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </>
    );
}
