import { createContext, useState } from "react";


export const WeatherContext = createContext();

const defaults = {
    metric: {
        temperature: 'celsius',
        windSpeed: 'km/h',
        precipitation: 'mm',
        
    },
    imperial: {
        temperature: 'fahrenheit',
        windSpeed: 'mph',
        precipitation: 'in'
    }
}
export const WeatherProvider = ({ children }) => {
    const [weatherSettings, setWeatherSettings] = useState({
        units:'metric',
        temperature: 'celsius',
        windSpeed: 'km/h',
        precipitation: 'mm'
    });
    
        function handleWeatherSettings(unit) {
            setWeatherSettings(prev => ({
                ...prev,
                units: unit,
                temperature: defaults[unit].temperature,
                windSpeed: defaults[unit].windSpeed,
                precipitation: defaults[unit].precipitation
            }))
    
        }
        function setTemperature(temp){
            setWeatherSettings(prev => ({
                ...prev,
                temperature: temp

            }))
        }
        function setWindSpeed(speed){
            setWeatherSettings(prev => ({
                ...prev,
                windSpeed: speed})) 
        }
        function setPrecipitation(precip){
            setWeatherSettings(prev => ({
                ...prev,
                precipitation: precip})) 

        }

    return (
        <WeatherContext.Provider value={{weatherSettings, handleWeatherSettings, setTemperature,setWindSpeed,setPrecipitation}}>
            {children}
        </WeatherContext.Provider>
    )
}
