import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NubosidadGraph = () => {
    const data = [
        { hour: '00:00', humidity: 80 },
        { hour: '01:00', humidity: 78 },
        { hour: '02:00', humidity: 75 },
        { hour: '03:00', humidity: 72 },
        { hour: '04:00', humidity: 70 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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

export default NubosidadGraph;
