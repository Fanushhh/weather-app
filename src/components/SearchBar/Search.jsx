
import styles from "./search.module.css";
import React from "react";
import { useDebouce } from "../../hooks/useDebouce";
import { useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherContext";
const fetchLocation = async (query) => {
  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4&language=en&format=json`
  );
  const res = await data.json();
  return res;
};


export const SearchBar = () => {
  const { setCurrentLocation } = useContext(WeatherContext);
  const [query, setQuery] = React.useState("");
  const  currentLocation = useDebouce(query, fetchLocation, 500);
  const [showResults, setShowResults] = React.useState(false);
  async function handleSelect(lat, lon){
    
    setCurrentLocation(prev => ({
      latitude: lat,
      longitude: lon,
   }))
    setShowResults(false);
    
  }

  function handleChange(e){
   
    setQuery(e.target.value);
    
  }
  React.useEffect(() => {
    if(currentLocation && currentLocation.length > 0){
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [currentLocation])

  return (
    <form onSubmit={(e) => e.preventDefault()} action="GET" className={styles.searchContainer}>
      <fieldset className={styles.queryContainer}>
        <img
          className={styles.searchIcon}
          src="assets/images/icon-search.svg"
        />
        <input
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchBar}
          type="search"
          autoComplete="off"
          placeholder="Search for a place..."
          name="query"
          id="query"
          value={query}
        />
        <div className={`${styles.resultsContainer} ${showResults ? styles.showResults : ''}`}>
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
