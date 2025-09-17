import styles from "./currentWeatherLoading.module.css";

import { Dropdown } from "../Dropdown/dropdown";

export const CurrentWeatherLoading = () => {
  return (
    <section className={styles.weatherWrapper}>
      <div className={styles.currentWeatherGrid}>
        <div className={styles.currentWeatherContainer}></div>
        <div className={styles.weatherDetailsContainer}>
          <div>
            <p>Feels like</p>
            <p className={styles.highlightNumber}>-</p>
          </div>
          <div>
            <p>Humidity</p>
            <p className={styles.highlightNumber}>-</p>
          </div>
          <div>
            <p>Wind</p>
            <p className={styles.highlightNumber}>-</p>
          </div>
          <div>
            <p>Precipitation</p>
            <p className={styles.highlightNumber}>-</p>
          </div>
        </div>
        <div className={styles.weekForcast}>
          <h2>Daily forecast</h2>
          <div className={styles.weekContainer}>
            {Array.from({ length: 5 }).map( index => {
              return (
                <div key={index} class={styles.dayCard}>
                  <p></p>
                  <div className={styles.temperatures}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.hourForcastContainer}>
        <div className={styles.dayForcastDropdown}>
          <h3>Hourly Forecast</h3>
          <Dropdown lightColor={true} isUnits={false} buttonText="-"></Dropdown>
        </div>
        <div className={styles.hourForcastGrid}>
          {Array.from({ length: 5 }).map(index => {
            return (
              <div key={index} className={styles.hourCard}>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
