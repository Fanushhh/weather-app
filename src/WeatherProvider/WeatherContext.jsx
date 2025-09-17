import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import getCityFromCoords, { fetchWeatherData } from "../utils/utils";
export const WeatherContext = createContext();

const defaults = {
  metric: {
    temperature: "celsius",
    windSpeed: "km/h",
    precipitation: "mm",
  },
  imperial: {
    temperature: "fahrenheit",
    windSpeed: "mph",
    precipitation: "inch",
  },
};
export const WeatherProvider = ({ children }) => {
  const [weatherSettings, setWeatherSettings] = useState(defaults["metric"]);
  console.log(weatherSettings)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "44.43225",
    longitude: "26.10626",
  });
  const [cityName, setCityName] = useState("Bucharest");

  const { data, isPending, error } = useQuery({
    queryKey: [
      "weather",
      currentLocation.latitude,
      currentLocation.longitude,
      weatherSettings.units,
      weatherSettings.temperature,
      weatherSettings.windSpeed,
      weatherSettings.precipitation,
    ],
    queryFn: async () =>
      fetchWeatherData(
        currentLocation.latitude,
        currentLocation.longitude,
         weatherSettings.units,
         weatherSettings.temperature,
         weatherSettings.windSpeed,
         weatherSettings.precipitation,
         
      ),
  });
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.log("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position.coords) {
        return;
      }
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    async function getCityName() {
      const cityName = await getCityFromCoords(
        currentLocation.latitude,
        currentLocation.longitude
      );

      if (cityName) {
        setCityName(`${cityName.city}, ${cityName.country}`);
      }
    }
    getCityName();
  }, [currentLocation]);
  function handleWeatherSettings(unit) {
    setWeatherSettings((prev) => ({
      ...prev,
      units: unit,
      temperature: defaults[unit].temperature,
      windSpeed: defaults[unit].windSpeed,
      precipitation: defaults[unit].precipitation,
    }));
  }
  function setTemperature(temp) {
    setWeatherSettings((prev) => ({
      ...prev,
      temperature: temp,
    }));
  }
  function setWindSpeed(speed) {
    setWeatherSettings((prev) => ({
      ...prev,
      windSpeed: speed,
    }));
  }
  function setPrecipitation(precip) {
    setWeatherSettings((prev) => ({
      ...prev,
      precipitation: precip,
    }));
  }
  return (
    <WeatherContext.Provider
      value={{
        data,
        cityName,
        isPending,
        error,
        weatherSettings,
        handleWeatherSettings,
        setTemperature,
        setWindSpeed,
        setPrecipitation,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
