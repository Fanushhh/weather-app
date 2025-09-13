
import styles from "./search.module.css";
import React from "react";
import { useDebouce } from "../../hooks/useDebouce";

const fetchLocation = async (query) => {
  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4&language=en&format=json`
  );
  const res = await data.json();
  return res;
};

const fetchWeather = async (lat, lon, isFahrenheit) => {
  
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,rain,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,wind_speed_10m&temperature_unit=${isFahrenheit ? 'fahrenheit' : 'celsius'}`);
  const weather = res.json();
  return weather;

}
export const SearchBar = () => {
  const [query, setQuery] = React.useState("");
  const  currentLocation = useDebouce(query, fetchLocation, 500);
  
  async function handleSelect(lat, lon){
    console.log(lat, lon)
    const weather = await fetchWeather(lat, lon, false);
    console.log(weather)
  }
  return (
    <form onSubmit={(e) => e.preventDefault()} action="GET" className={styles.searchContainer}>
      <fieldset className={styles.queryContainer}>
        <img
          className={styles.searchIcon}
          src="assets/images/icon-search.svg"
        />
        <input
          onChange={() => setQuery(event.target.value)}
          className={styles.searchBar}
          type="search"
          autoComplete="off"
          placeholder="Search for a place..."
          name="query"
          id="query"
          value={query}
        />
        <div className={`${styles.resultsContainer} ${currentLocation ? styles.smallPadding : ''}`}>
        {currentLocation && currentLocation.map(location => {
          return (
            <div key={location.id} className={styles.result}>
              <button onClick={() => handleSelect(location.latitude, location.longitude)} type="button>">{location.name}{location.admin1 ? `, ${location.admin1}`: ''}</button>
            </div>
          )
        })}
      </div>
      </fieldset>
      <button className={styles.searchButton}>Search</button>
      
    </form>
  );
};
