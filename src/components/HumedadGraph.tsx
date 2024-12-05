import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Item_Tabla from '../interface/Item';

interface HumedadGraphProps {
    itemsIn: Item_Tabla[];
}

const HumedadGraph = ( props: HumedadGraphProps ) => {

    const filterLastSevenHours = (data: Item_Tabla[]) => {
        // Convertir las horas de "dateStart" en formato Date para poder hacer comparaciones
        const filteredData = data
            .map(item => ({
                ...item,
                hour: new Date(item.dateStart.toString()).getHours() + ":00" // Formateamos la hora
            }))
            .slice(-7); // Tomamos solo las últimas 7 horas
        return filteredData;
    };

    // Filtramos las 7 horas más recientes y extraemos la información relevante para el gráfico
    const filteredData = filterLastSevenHours(props.itemsIn);
    const chartData = filteredData.map(item => ({
        hour: item.hour,
        humidity: parseFloat(item.humidity.toString()), // Convertir la humedad a número
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#0C59CF" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HumedadGraph;
