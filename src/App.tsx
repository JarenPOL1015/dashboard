// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Grid2' 
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';

{/* Hooks */ }
import { useEffect, useState } from 'react';
import Header from './components/Header';
import DatosGenerales from './components/DatosGenerales';
import PuestaSol from './components/PuestaSol';
import Pronostico from './components/Pronostico';

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

interface forecastClima {
  temperatura: string,
  precipitacion: string,
  desde: string,
  hasta: string,
  nubes: string
}

function App() {
  // const [count, setCount] = useState(0)

  {/* Variable de estado y función de actualización */}
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [datosVarios, setDatosVarios] = useState<Indicator[]>([]);
  let [climas_dias, setClimas_dias] = useState<forecastClima[]>([]);

  {/* Hook: useEffect */}
  useEffect( () => {

    let request = async () => {
      {/* Request */}
      let API_KEY = "14938b9ae9f20310270b123d6217ec59";
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
      let savedTextXML = await response.text();

      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Obtener datos para mañana, tarde y noche */}

      const forecastTimes = xml.getElementsByTagName("time");

      let forecastList : forecastClima[] = []

      let horas = ["06:00:00", "12:00:00", "21:00:00"]

      for (let i = 0; i < forecastTimes.length; i++) {
        const elemento_time = forecastTimes[i];
        const hora_desde = elemento_time.getAttribute("from") || "";
        const hora_hasta = elemento_time.getAttribute("to") || "";
      
        let hora_comparar = hora_desde?.split("T")[1].toString().trim() || "";

        // Filtrar solo los pronósticos que corresponden al día actual
        if (horas.includes(hora_comparar)) { 
          
          const temperature = elemento_time.getElementsByTagName("temperature")[0]?.getAttribute("value");
          const precipitacion = elemento_time.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
          const nubes = elemento_time.getElementsByTagName("clouds")[0]?.getAttribute("value");
          
          forecastList.push({
            "desde": hora_desde || "",
            "hasta": hora_hasta || "",
            "temperatura": temperature || "",
            "precipitacion": precipitacion || "",
            "nubes": nubes || ""
          });
          // Eliminar la hora de la lista para que no se vuelva a agregar
          horas = horas.filter(hora => hora !== hora_comparar);
        }
      }
       {/* Arreglo para agregar los resultados */}

       let dataToIndicators : Indicator[] = new Array<Indicator>();
       let datosVariosObtenidos: Indicator[] = new Array<Indicator>();

       {/* 
           Análisis, extracción y almacenamiento del contenido del XML 
           en el arreglo de resultados
       */}

       let sol = xml.getElementsByTagName("sun")[0];

       let rise = sol.getAttribute("rise") || "";
       let set = sol.getAttribute("set") || "";

       datosVariosObtenidos.push( {"title": "Sun_rise", "value": rise} )
       datosVariosObtenidos.push( {"title": "Sun_set", "value": set} )

       // let name = xml.getElementsByTagName("name")[0].innerHTML || ""
       // dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

       let location = xml.getElementsByTagName("location")[1]

       let latitude = location.getAttribute("latitude") || ""
       dataToIndicators.push({ "title": "Latitud", "value": latitude })

       let longitude = location.getAttribute("longitude") || ""
       dataToIndicators.push({ "title": "Longitud", "value": longitude })

      // console.log( dataToIndicators )
      {/* Modificación de la variable de estado mediante la función de actualización */}
      setIndicators( dataToIndicators );
      setDatosVarios( datosVariosObtenidos );
      setClimas_dias( forecastList );
    }

    request();

  }, [])

  console.log(climas_dias);

  return (
    <>
    <Header></Header>
    <DatosGenerales indicators={indicators} />
    <PuestaSol indicators={datosVarios}></PuestaSol>
    <Pronostico lista={climas_dias}></Pronostico>
    <Grid container spacing={5}>
        {/* Tabla */}
        <Grid size={{ xs: 12, xl: 8 }}>
          {/* Grid Anidado */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, xl: 3 }}>
                <ControlWeather/>
            </Grid>
            <Grid size={{ xs: 12, xl: 9 }}>
                <TableWeather/>
            </Grid>
          </Grid>
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, xl: 4 }}>
          <LineChartWeather></LineChartWeather>
        </Grid>
    
    </Grid>
    </>
    
  );

}

export default App
