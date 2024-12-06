import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Item_Tabla from '../interface/Item';

interface PrecipitacionGraphProps {
    itemsIn: Item_Tabla[];
}

const PrecipitacionGraph = (props: PrecipitacionGraphProps) => {

    // Función para filtrar las últimas 7 horas
    const filterLastSevenHours = (data: Item_Tabla[]) => {
        const filteredData = data
            .map(item => ({
                ...item,
                hour: new Date(item.dateStart.toString()).getHours() + ":00" // Convertimos a formato "HH:00"
            }))
            .slice(-7); // Tomamos solo las últimas 7 horas
        return filteredData;
    };

    // Filtramos las 7 horas más recientes y extraemos la información para el gráfico
    const filteredData = filterLastSevenHours(props.itemsIn);

    const chartData = filteredData.map(item => ({
        hour: item.hour,
        precipitation: parseFloat(item.precipitation.toString()) || 0, // Asegúrate de convertir correctamente a número
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="precipitation" stroke="#0C59CF" /> {/* Cambiar a precipitation */}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PrecipitacionGraph;
