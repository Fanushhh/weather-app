import styles from "./currentWeather.module.css";
import { useState, useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherContext";

import { Dropdown } from "../Dropdown/dropdown";
import { getCurrentWeatherIcon,getWeekArray,getDaily24HourForecast } from "../../utils/utils";

export const CurrentWeather = () => {
  const { data, cityName, isPending, error } = useContext(WeatherContext);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  const weekSorted = getWeekArray(true);
  const currentDay = new Date(data.current.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  console.log(data)
  const currentHourIndex = new Date(data.current.time).getHours();
  
  const day24HourForcast = getDaily24HourForecast(data, currentDayIndex, currentHourIndex);
  const updatedTime = day24HourForcast.time.map((timeObject, index) => {
    return {
      time: new Date(timeObject).toLocaleTimeString("en-US", {hour: '2-digit',}),
      temperature: Math.round(day24HourForcast.temperature[index]),
      weatherCode: day24HourForcast.weatherCode[index],
    }
  });
  console.log(weekSorted);
  
  return (
    <section className={styles.weatherWrapper}>
      <div className={styles.currentWeatherGrid}>
        <div className={styles.currentWeatherContainer}>
          <div>
            <h2>{cityName}</h2>
            <p>{currentDay}</p>
          </div>
          <div className={styles.temperatureContainer}>
            <img src={getCurrentWeatherIcon(data.current.weather_code)} width={120} height={120} />
            <p>
              {Math.round(data.current.temperature_2m)}°
            </p>
          </div>
        </div>
        <div className={styles.weatherDetailsContainer}>
          <div>
            <p>Feels like</p>
            <p className={styles.highlightNumber}>
              {Math.round(data.current.apparent_temperature)}{" "}
              {data.current_units.apparent_temperature}
            </p>
          </div>
          <div>
            <p>Humidity</p>
            <p className={styles.highlightNumber}>
              {Math.round(data.current.relative_humidity_2m)}{" "}
              {data.current_units.relative_humidity_2m}
            </p>
          </div>
          <div>
            <p>Wind</p>
            <p className={styles.highlightNumber}>
              {Math.round(data.current.wind_speed_10m)}{" "}
              {data.current_units.wind_speed_10m}
            </p>
          </div>
          <div>
            <p>Precipitation</p>
            <p className={styles.highlightNumber}>
              {Math.round(data.current.precipitation)}{" "}
              {data.current_units.precipitation}
            </p>
          </div>
        </div>
        <div className={styles.weekForcast}>
            <h2>Daily forecast</h2>
            <div className={styles.weekContainer}>
                {
                    weekSorted.map((day, index) => {
                        
                        return(
                            <div key={index} class={styles.dayCard}>
                                <p>{day.substring(0,3)}</p>
                                <img src={getCurrentWeatherIcon(data.daily.weather_code[index])} />
                                <div className={styles.temperatures}>
                                    <p>{Math.round(data.daily.temperature_2m_max[index])}°</p>
                                    <p>{Math.round(data.daily.temperature_2m_min[index])}°</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
      </div>
      <div className={styles.hourForcastContainer}>
        <div className={styles.dayForcastDropdown}>
          <h3>Hourly Forecast</h3>
          <Dropdown lightColor={true} isUnits={false} buttonText={weekSorted[currentDayIndex]}>
            {weekSorted.map((day, index) => (
              <button style={{display:'flex', justifyContent:'space-between'}} key={index} onClick={() => setCurrentDayIndex(index)}>{day} {weekSorted[currentDayIndex] == day ? <img width={15} height={15} src='assets/images/icon-checkmark.svg' /> : ''}</button>
            ))}
          </Dropdown>
        </div>
        <div className={styles.hourForcastGrid}>
          {updatedTime.map((hourData, index) => {
            return (
              <div key={index} className={styles.hourCard}>
                <div>
                  <img width={40} height={40} src={getCurrentWeatherIcon(day24HourForcast.weatherCode[index])} />
                  <p>{hourData.time}</p>
                </div>
                <p>{Math.round(day24HourForcast.temperature[index])}°</p>
                
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};
