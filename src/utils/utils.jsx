export const fetchWeatherData = async (
  lat,
  lon,
  isFahrenheit,
  windSpeed,
  precipitation
) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weather_code&current=precipitation,relative_humidity_2m,apparent_temperature,wind_speed_10m,temperature_2m,weather_code${isFahrenheit === "imperial" ? "&temperature_unit=fahrenheit" : ""}${windSpeed === "mph" ? "&wind_speed_unit=mph" : ""}${precipitation === "inch" ? "&precipitation_unit=inch" : ""}`
  );
  const weather = await res.json();
  return weather;
};

export default async function getCityFromCoords(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    return {
      city: data.city,
      state: data.principalSubdivision,
      country: data.countryName.split(" ").slice(0, 2).join(" "),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export function getWeekArray(sorted) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (sorted) {
    const currentDayIndex = new Date().getDay();
    return [
      ...weekDays.slice(currentDayIndex),
      ...weekDays.slice(0, currentDayIndex),
    ];
  }
  return weekDays;
}

export function getCurrentWeatherIcon(weatherCode = 0) {
  switch (weatherCode) {
    case 0:
      return "assets/images/icon-sunny.webp";
    case 1:
    case 2:
    case 3:
      return "assets/images/icon-partly-cloudy.webp";
    case 45:
    case 48:
      return "assets/images/icon-fog.webp";
    case 51:
    case 53:
    case 55:
      return "assets/images/icon-drizzle.webp";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "assets/images/icon-rain.webp";
    case 71:
    case 73:
    case 75:
    case 77: // I assume 7785 was a typo for 77
    case 85:
    case 86:
      return "assets/images/icon-snow.webp";
    default:
      return "assets/images/icon-sunny.webp";
  }
}

export function getDaily24HourForecast(
  data,
  currentDayIndex = 0,
  currentHourIndex = 13
) {
  const hourlyForecast = {};
  const startIndex =
    currentDayIndex === 0 ? currentHourIndex : currentDayIndex * 24;
  const endIndex = currentDayIndex === 0 ? 24 : currentDayIndex * 24 + 24;
  hourlyForecast.time = data.hourly.time.slice(startIndex, endIndex);
  hourlyForecast.temperature = data.hourly.temperature_2m.slice(
    startIndex,
    endIndex
  );
  hourlyForecast.weatherCode = data.hourly.weather_code.slice(
    startIndex,
    endIndex
  );

  return hourlyForecast;
}
