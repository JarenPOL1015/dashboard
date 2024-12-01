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

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  // const [count, setCount] = useState(0)

  {/* Variable de estado y función de actualización */}
  let [indicators, setIndicators] = useState<Indicator[]>([])

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

       {/* Arreglo para agregar los resultados */}

       let dataToIndicators : Indicator[] = new Array<Indicator>();

       {/* 
           Análisis, extracción y almacenamiento del contenido del XML 
           en el arreglo de resultados
       */}

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
    }

    request();

  }, [])

  return (
    <>
    <Header></Header>
    <DatosGenerales indicators={indicators} />
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
