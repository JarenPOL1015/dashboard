interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <>
            {config.title ?? "Titulo N/A"}<br/>
            {config.value ?? "Valor N/A"}<br/>
            {config.subtitle ?? "Subtítulo N/A"}
        </> 
    )
}