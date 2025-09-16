import styles from "./currentWeather.module.css";
import { useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherContext";
import { getWeekArray } from "../../utils/utils";
import { Dropdown } from "../Dropdown/dropdown";
import { getCurrentWeatherIcon } from "../../utils/utils";

export const CurrentWeather = () => {
  const { data, cityName, isPending, error } = useContext(WeatherContext);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  const week = getWeekArray();
  const weekSorted = getWeekArray(true);
  const currentDay = new Date(data.current.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  console.log(data)
  const currentDayIndex = new Date(data.current.time).getDay();
  return (
    <section className={styles.weatherWrapper}>
      <div className={styles.currentWeatherGrid}>
        <div className={styles.currentWeatherContainer}>
          <div>
            <h2>{cityName}</h2>
            <p>{currentDay}</p>
          </div>
          <div className={styles.temperatureContainer}>
            <img src="assets/images/icon-sunny.webp" width={120} height={120} />
            <p>
              {Math.round(data.current.temperature_2m)}{" "}
              {data.current_units.apparent_temperature}
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
                        console.log(day, index)
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
          <Dropdown lightColor={true} isUnits={false} buttonText={week[currentDayIndex]}>
            {week.map((day, index) => (
              <button key={index}>{day}</button>
            ))}
          </Dropdown>
        </div>
      </div>
    </section>
  );
};
