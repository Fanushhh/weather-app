import styles from "./navbar.module.css";
import { useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherContext";
import { Dropdown } from "../Dropdown/dropdown";
export const Navbar = () => {
  const {
    weatherSettings,
    handleWeatherSettings,
    setTemperature,
    setWindSpeed,
    setPrecipitation,
  } = useContext(WeatherContext);

  return (
    <nav className={`container ${styles.navbar} `}>
      <div className={styles.logoContainer}>
        <img src="assets/images/logo.svg" alt="" />
      </div>
      <Dropdown isUnits={true} buttonText="Units">
        <button
                    onClick={() =>
                      handleWeatherSettings(
                        weatherSettings.units === "metric" ? "imperial" : "metric"
                      )
                    }
                  >
                    Switch to{" "}
                    {weatherSettings.units === "metric" ? "imperial" : "metric"}
                  </button>
                  <div>
                    <p>Temperature</p>
                    <button
                      onClick={() => setTemperature("celsius")}
                      className={`${styles.settingBtn} ${
                        weatherSettings.temperature === "celsius"
                          ? styles.btnSelected
                          : ""
                      }`}
                    >
                      Celsius (°C){" "}
                      {weatherSettings.temperature === "celsius" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                    <button
                      onClick={() => setTemperature("fahrenheit")}
                      className={`${styles.settingBtn} ${
                        weatherSettings.temperature === "fahrenheit"
                          ? styles.btnSelected
                          : ""
                      }`}
                    >
                      Fahrenheit (°F){" "}
                      {weatherSettings.temperature === "fahrenheit" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                  </div>
                  <hr />
                  <div>
                    <p>Wind speed</p>
                    <button
                      onClick={() => setWindSpeed("km/h")}
                      className={`${styles.settingBtn} ${
                        weatherSettings.windSpeed === "km/h" ? styles.btnSelected : ""
                      }`}
                    >
                      km/h{" "}
                      {weatherSettings.windSpeed === "km/h" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                    <button
                      onClick={() => setWindSpeed("mph")}
                      className={`${styles.settingBtn} ${
                        weatherSettings.windSpeed === "mph" ? styles.btnSelected : ""
                      }`}
                    >
                      mph{" "}
                      {weatherSettings.windSpeed === "mph" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                  </div>
                  <hr />
                  <div>
                    <p>Precipitation</p>
                    <button
                      onClick={() => setPrecipitation("mm")}
                      className={`${styles.settingBtn} ${weatherSettings.precipitation === 'mm' ? styles.btnSelected : ''}`}
                    >
                      Millimeters (mm){" "}
                      {weatherSettings.precipitation === "mm" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                    <button
                      onClick={() => setPrecipitation("inch")}
                      className={`${styles.settingBtn} ${weatherSettings.precipitation === 'in' ? styles.btnSelected : ''}`}
                    >
                      Inches (in){" "}
                      {weatherSettings.precipitation === "inch" ? (
                        <img src="assets/images/icon-checkmark.svg" />
                      ) : null}
                    </button>
                  </div>
      </Dropdown>
    </nav>
  );
};
