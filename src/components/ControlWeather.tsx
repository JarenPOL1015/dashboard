import { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Item_Tabla from '../interface/Item';

// Gráficos importados
import HumedadGraph from './HumedadGraph';
import PrecipitacionGraph from './PrecipitacionGraph'; // Gráfico de Precipitación
import VientoGraph from './VientoGraph';

interface ControlWeatherProps {
    itemsIn: Item_Tabla[];
}

export default function ControlWeather( {itemsIn} : ControlWeatherProps ) {
    const descriptionRef = useRef<HTMLDivElement>(null);

    let [selected, setSelected] = useState<number>(-1);
    const [graphComponent, setGraphComponent] = useState<JSX.Element | null>(<HumedadGraph itemsIn={itemsIn} />); // Inicializamos con el gráfico de humedad

    let items = [
        { "name": "Precipitación", "description": "Probabilidad de lluvia (en porcentaje) para la ciudad en determinado rango de horas", "component": <PrecipitacionGraph itemsIn={itemsIn} /> }, 
        { "name": "Humedad", "description": "Tendencia de humedad cada 3 horas en la ciudad de Guayaquil", "component": <HumedadGraph itemsIn={itemsIn} /> }, 
        { "name": "Velocidad del Viento", "description": "Velocidad del Viento en determinadas horas dentro de la ciudad.", "component": <VientoGraph itemsIn={itemsIn} /> }
    ];

    let options = items.map((item, key) => (
        <MenuItem key={key} value={key}>
            {item["name"]}
        </MenuItem>
    ));

    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value);

        setSelected(idx);
        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : "";
        }

        // Establece el componente de gráfico según la opción seleccionada
        if (idx >= 0) {
            setGraphComponent(items[idx].component);
        } else {
            setGraphComponent(<HumedadGraph itemsIn={itemsIn} />); // Si no se selecciona nada, mostrar el gráfico de Humedad
        }
    };

    return (
        <div id="gráfica">
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
                    margin: '20px 0',
                    marginBottom: '30px'
                }}
            >
                Gráfica
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography mb={2} component="h3" variant="h6" color="primary">
                    Variables Meteorológicas
                </Typography>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-label">Variables</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            label="Variables"
                            defaultValue="-1"
                            onChange={handleChange}
                        >
                            <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>
                            {options}
                        </Select>
                    </FormControl>
                </Box>

                <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />

                {/* Renderizar el gráfico correspondiente */}
                {graphComponent}
            </Paper>
        </div>
    );
}
